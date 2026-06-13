/**
 * 🍛 HomeChef AI v2 - Robust Serverless Puter.js AI Wrapper
 * Implements:
 * 1. 5-Layer Fallback (Cache -> API -> Retry -> Queue -> Local KB)
 * 2. Strict Request Queuing & Rate Limit Protection
 * 3. Smart LocalStorage Caching (24h expiry)
 * 4. Model Selection Routing (gpt-4o-mini for speed, gpt-4o for complex thali plans)
 *
 * Login-free design (final fix):
 * - Default path: Direct REST to Puter (no token required) + immediate rich local RAG fallback.
 * - We deliberately do NOT auto-call signIn() from chat sends or queryAI.
 * - The only way to ever attempt a Puter guest session is via the explicit "Boost" button (opt-in).
 * - This guarantees zero login popups during normal use.
 * - Local RAG + archetype + KB is the reliable, always-on experience (the real strength).
 * - If you want live cloud responses, tap Boost once per session (may open a one-time guest creation popup).
 */

import { getLocalFallbackRecipe, getLocalFallbackChat } from './offlineKnowledgeBase';

const AI_CACHE_KEY = 'homechef_ai_cache_v2';
const MAX_CACHE_AGE_MS = 24 * 60 * 60 * 1000; // 24 Hours
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;
const REQUEST_TIMEOUT_MS = 14000; // Hard timeout for REST calls (harden vs hanging)

// Request Queue to prevent concurrent spam rate limits
let isProcessingQueue = false;
const requestQueue = [];

// --- Visible AI Health Status (for UI indicators + "no AI connected" transparency) ---
let lastAIStatus = {
  status: 'unknown', // 'connected' | 'cached' | 'offline-kb' | 'error' | 'cleared'
  lastMessage: 'Initializing...',
  timestamp: null,
  cacheClearedAt: null
};

const updateAIStatus = (patch) => {
  lastAIStatus = { ...lastAIStatus, ...patch, timestamp: Date.now() };
  console.log('📡 PuterAI Status update:', lastAIStatus.status, lastAIStatus.lastMessage);
};

export const getAIStatus = () => ({ ...lastAIStatus });

export const clearAICache = () => {
  try {
    localStorage.removeItem(AI_CACHE_KEY);
    updateAIStatus({ 
      status: 'cleared', 
      lastMessage: 'Cache cleared (homechef_ai_cache_v2) — next message forces fresh Puter REST attempt + retry.' 
    });
    console.log('🧹 PuterAI: homechef_ai_cache_v2 cleared. Will retry real AI on next queryAI call.');
    return true;
  } catch (e) {
    console.warn('PuterAI clear cache failed:', e);
    return false;
  }
};

// Helper to extract archetype from injected systemInstruction (so fallbacks can still be archetype-aware)
const getArchetypeFromSystem = (sys = '') => {
  if (!sys) return 'standard';
  const s = sys.toLowerCase();
  if (s.includes('biohacker') || s.includes('bio-hacker')) return 'biohacker';
  if (s.includes('cognitive') || s.includes('cognitive hustler')) return 'cognitive';
  return 'standard';
};

/**
 * Helper: Generate unique hash key for caching
 */
const generateCacheKey = (prompt, systemInstruction, model) => {
  const rawString = `${prompt}|${systemInstruction}|${model}`;
  let hash = 0;
  for (let i = 0; i < rawString.length; i++) {
    const char = rawString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return `key_${Math.abs(hash)}`;
};

/**
 * Helper: Retrieve item from localStorage cache if valid
 */
const getCachedResponse = (key) => {
  try {
    const cacheData = localStorage.getItem(AI_CACHE_KEY);
    if (!cacheData) return null;
    
    const cache = JSON.parse(cacheData);
    const cachedItem = cache[key];
    
    if (cachedItem && (Date.now() - cachedItem.timestamp < MAX_CACHE_AGE_MS)) {
      console.log('⚡ PuterAI Cache Hit:', key);
      updateAIStatus({ status: 'cached', lastMessage: 'Served from 24h local cache (no network)' });
      return cachedItem.response;
    }
    
    // Clean expired cache items if any
    if (cachedItem) {
      delete cache[key];
      localStorage.setItem(AI_CACHE_KEY, JSON.stringify(cache));
    }
  } catch (e) {
    console.warn('PuterAI Cache Read Error:', e);
  }
  return null;
};

/**
 * Helper: Save item to localStorage cache
 */
const setCachedResponse = (key, response) => {
  try {
    let cache = {};
    const cacheData = localStorage.getItem(AI_CACHE_KEY);
    if (cacheData) {
      cache = JSON.parse(cacheData);
    }
    
    cache[key] = {
      response,
      timestamp: Date.now()
    };
    
    localStorage.setItem(AI_CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn('PuterAI Cache Write Error:', e);
  }
};

/**
 * Core: Exponential backoff delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Puter API Caller with Retries
 */
const callPuterAPI = async (prompt, systemInstruction, model, attempt = 1) => {
  // Script / env guard (harden "no AI connected" silent fails — direct REST only works in browser with fetch)
  if (typeof window === 'undefined' || typeof fetch === 'undefined') {
    throw new Error('puter_rest_not_available_in_this_env (browser fetch required)');
  }

  try {
    const selectedModel = model === 'gpt-4o' ? 'gpt-4o' : 'gpt-4o-mini';
    console.log(`🤖 PuterAI calling REST ${selectedModel} (Attempt ${attempt}/${MAX_RETRIES})...`);
    
    let token = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("puter.auth.token") || 
              localStorage.getItem("puter.auth.token.v2") || 
              localStorage.getItem("puter-auth-token") ||
              localStorage.getItem("puter.authToken") ||
              localStorage.getItem("puter.token") ||
              localStorage.getItem("puterAuthToken") ||
              (window.puter && (window.puter.authToken || window.puter.token));
      // If SDK exposes getAuthToken after guest init, we could await it in an enhanced path
    }

    const headers = {
      "Content-Type": "application/json",
    };
    
    if (token && token !== "null" && token !== "undefined") {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Timeout guard + abort (prevents silent hangs, visible error -> rich KB)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const response = await fetch("https://api.puter.com/puterai/openai/v1/chat/completions", {
      method: "POST",
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          { role: "system", content: systemInstruction || "You are a helpful assistant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 900,
      }),
    });

    clearTimeout(timeoutId);

    if (response.status === 402 || response.status === 401) {
      throw new Error(`puter_auth_or_funds_error_status_${response.status}`);
    }

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Puter AI REST Error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    if (data && data.choices && data.choices[0] && data.choices[0].message) {
      const content = data.choices[0].message.content;
      updateAIStatus({ status: 'connected', lastMessage: `Live Puter REST success (${selectedModel})` });
      return content;
    }
    throw new Error("Invalid response format from Puter AI REST API");
  } catch (err) {
    console.error(`PuterAI attempt ${attempt} failed:`, err);
    
    if (attempt < MAX_RETRIES) {
      const backoffDelay = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
      console.log(`Retrying in ${backoffDelay}ms...`);
      await delay(backoffDelay);
      return callPuterAPI(prompt, systemInstruction, model, attempt + 1);
    }
    
    throw err;
  }
};

/**
 * Process the Request Queue sequentially
 */
const processQueue = async () => {
  if (isProcessingQueue || requestQueue.length === 0) return;
  
  isProcessingQueue = true;
  const { resolve, reject, prompt, systemInstruction, model } = requestQueue.shift();
  
  try {
    const response = await callPuterAPI(prompt, systemInstruction, model);
    resolve(response);
  } catch (err) {
    reject(err);
  } finally {
    isProcessingQueue = false;
    // Process next item in queue after a short cooling-off period (300ms)
    await delay(300);
    processQueue();
  }
};

/**
 * 🚀 Main Export: Safe, Caching, Queueing AI Request Interface
 */
export const queryAI = (prompt, systemInstruction = '', model = 'gpt-4o-mini') => {
  return new Promise(async (resolve, reject) => {
    // 1. Layer 1: Cache Check
    const cacheKey = generateCacheKey(prompt, systemInstruction, model);
    const cachedResponse = getCachedResponse(cacheKey);
    if (cachedResponse) {
      return resolve(cachedResponse);
    }

    // 2. Queue the request
    requestQueue.push({
      resolve: (val) => {
        // Save to cache on successful resolution (if not already from cache layer)
        setCachedResponse(cacheKey, val);
        // If we reached here via real path, ensure connected status (fallback paths already set their status)
        if (!lastAIStatus.status || lastAIStatus.status === 'unknown' || lastAIStatus.status === 'cleared') {
          updateAIStatus({ status: 'connected', lastMessage: 'Fresh AI response cached' });
        }
        resolve(val);
      },
      reject: async (err) => {
        console.warn('❌ PuterAI request failed in queue. Falling back to local KB.', err);
        // 3. Layer 5: Offline/KnowledgeBase Fallback — now archetype-aware even on total offline
        try {
          const arch = getArchetypeFromSystem(systemInstruction);
          updateAIStatus({ status: 'offline-kb', lastMessage: `Using rich local KB fallback (archetype: ${arch})` });
          const fallback = prompt.toLowerCase().includes('plan') || prompt.toLowerCase().includes('menu')
            ? getLocalFallbackRecipe(prompt, arch)
            : getLocalFallbackChat(prompt, arch);
          resolve(fallback);
        } catch (fallbackErr) {
          reject(fallbackErr);
        }
      },
      prompt,
      systemInstruction,
      model
    });

    // Start processing queue
    processQueue();
  });
};

/**
 * Opt-in only: random guest token trigger.
 * This is deliberately NOT called automatically from chat or queries.
 * Only the "Boost" button in the Nani UI calls it (user explicitly wants live Puter).
 * Uses attempt_temp_user_creation for a random temp guest session (no full account needed).
 */
let hasTriggeredGuest = false;

export async function triggerPuterGuestOnce() {
  if (hasTriggeredGuest) return true;
  if (typeof window === 'undefined' || !window.puter || !window.puter.auth) {
    console.log('[Puter Guest] SDK not ready — relying on direct REST + rich local RAG (no popup).');
    return false;
  }
  try {
    if (!window.puter.auth.isSignedIn()) {
      console.log('[Puter Guest] Triggering one-time random temp guest session (attempt_temp_user_creation)...');
      await window.puter.auth.signIn({ attempt_temp_user_creation: true });
      updateAIStatus({ status: 'connected', lastMessage: 'Puter random guest token active' });
      hasTriggeredGuest = true;
      return true;
    } else {
      hasTriggeredGuest = true;
      return true;
    }
  } catch (err) {
    console.warn('[Puter Guest] One-time guest trigger failed or was cancelled. Using local RAG (no repeated prompts).', err);
    return false;
  }
}
