/**
 * 🍛 HomeChef AI v3 - AI Engine with BYOK + Puter Guest + Offline RAG
 *
 * CALL ORDER (zero login popups at every layer):
 * ─────────────────────────────────────────────────────────────────────
 * Layer 0: 24h localStorage cache (instant, free)
 * Layer 1: BYOK — user's own OpenAI/Gemini key (from Settings → API Key)
 * Layer 2: Puter REST guest (keyless anonymous, no SDK popup)
 * Layer 3: Rich Offline RAG / Local Knowledge Base fallback
 *
 * BYOK keys stored at: localStorage key 'homechef_byok'
 * Format: { provider: 'openai'|'gemini', key: 'sk-...' }
 */

import { getLocalFallbackRecipe, getLocalFallbackChat } from './offlineKnowledgeBase';

const AI_CACHE_KEY = 'homechef_ai_cache_v2';
const BYOK_KEY = 'homechef_byok';
const MAX_CACHE_AGE_MS = 24 * 60 * 60 * 1000; // 24 Hours
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1500;
const REQUEST_TIMEOUT_MS = 12000;

let isProcessingQueue = false;
const requestQueue = [];

// ─── AI Health Status ────────────────────────────────────────────────────────
let lastAIStatus = {
  status: 'unknown',
  lastMessage: 'Initializing...',
  timestamp: null,
};

const updateAIStatus = (patch) => {
  lastAIStatus = { ...lastAIStatus, ...patch, timestamp: Date.now() };
  console.log('📡 AI Status:', lastAIStatus.status, '—', lastAIStatus.lastMessage);
};

export const getAIStatus = () => ({ ...lastAIStatus });

export const clearAICache = () => {
  try {
    localStorage.removeItem(AI_CACHE_KEY);
    updateAIStatus({ status: 'cleared', lastMessage: 'Cache cleared — next call goes live.' });
    return true;
  } catch (e) {
    console.warn('Cache clear failed:', e);
    return false;
  }
};

// ─── BYOK Helpers ────────────────────────────────────────────────────────────
export const getBYOK = () => {
  try {
    const raw = localStorage.getItem(BYOK_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.key && parsed.key.length > 10) return parsed;
    return null;
  } catch { return null; }
};

export const saveBYOK = (provider, key) => {
  try {
    localStorage.setItem(BYOK_KEY, JSON.stringify({ provider, key }));
    updateAIStatus({ status: 'byok', lastMessage: `BYOK active: ${provider}` });
    return true;
  } catch { return false; }
};

export const clearBYOK = () => {
  try {
    localStorage.removeItem(BYOK_KEY);
    updateAIStatus({ status: 'unknown', lastMessage: 'BYOK cleared — using Puter guest.' });
    return true;
  } catch { return false; }
};

// ─── Cache Helpers ───────────────────────────────────────────────────────────
const generateCacheKey = (prompt, systemInstruction, model) => {
  const rawString = `${prompt}|${systemInstruction}|${model}`;
  let hash = 0;
  for (let i = 0; i < rawString.length; i++) {
    const char = rawString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return `key_${Math.abs(hash)}`;
};

const getCachedResponse = (key) => {
  try {
    const cacheData = localStorage.getItem(AI_CACHE_KEY);
    if (!cacheData) return null;
    const cache = JSON.parse(cacheData);
    const item = cache[key];
    if (item && (Date.now() - item.timestamp < MAX_CACHE_AGE_MS)) {
      updateAIStatus({ status: 'cached', lastMessage: 'Served from 24h cache' });
      return item.response;
    }
    if (item) { delete cache[key]; localStorage.setItem(AI_CACHE_KEY, JSON.stringify(cache)); }
  } catch (e) { console.warn('Cache read error:', e); }
  return null;
};

const setCachedResponse = (key, response) => {
  try {
    const cacheData = localStorage.getItem(AI_CACHE_KEY);
    const cache = cacheData ? JSON.parse(cacheData) : {};
    cache[key] = { response, timestamp: Date.now() };
    localStorage.setItem(AI_CACHE_KEY, JSON.stringify(cache));
  } catch (e) { console.warn('Cache write error:', e); }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ─── LAYER 1: BYOK Call ──────────────────────────────────────────────────────
const callBYOK = async (messages, byok) => {
  const { provider, key } = byok;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    let url, headers, body;

    if (provider === 'openai') {
      url = 'https://api.openai.com/v1/chat/completions';
      headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` };
      body = JSON.stringify({ model: 'gpt-4o-mini', messages, temperature: 0.75, max_tokens: 900 });
    } else if (provider === 'gemini') {
      url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
      headers = { 'Content-Type': 'application/json' };
      // Convert OpenAI message format to Gemini format
      const geminiContents = messages
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
      const systemMsg = messages.find(m => m.role === 'system');
      body = JSON.stringify({
        contents: geminiContents,
        ...(systemMsg && { systemInstruction: { parts: [{ text: systemMsg.content }] } }),
        generationConfig: { temperature: 0.75, maxOutputTokens: 900 }
      });
    } else {
      throw new Error(`Unknown BYOK provider: ${provider}`);
    }

    const response = await fetch(url, { method: 'POST', headers, body, signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`BYOK ${provider} Error ${response.status}: ${errText}`);
    }

    const data = await response.json();

    if (provider === 'openai') {
      const content = data?.choices?.[0]?.message?.content;
      if (!content) throw new Error('Empty OpenAI BYOK response');
      updateAIStatus({ status: 'byok', lastMessage: `Live via your OpenAI key ✓` });
      return content;
    } else {
      const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!content) throw new Error('Empty Gemini BYOK response');
      updateAIStatus({ status: 'byok', lastMessage: `Live via your Gemini key ✓` });
      return content;
    }
  } finally {
    clearTimeout(timeoutId);
  }
};

// ─── LAYER 2: Puter REST Guest (Keyless, No Popup) ──────────────────────────
const callPuterREST = async (messages, attempt = 1) => {
  if (typeof window === 'undefined' || typeof fetch === 'undefined') {
    throw new Error('Browser environment required');
  }

  // Pick up any token from a prior voluntary sign-in (never forced)
  let token = null;
  try {
    token = localStorage.getItem('puter.auth.token') ||
            localStorage.getItem('puter.auth.token.v2') ||
            localStorage.getItem('puter-auth-token') ||
            (window.puter && (window.puter.authToken || window.puter.token)) ||
            null;
  } catch (e) { /* ignore */ }

  const headers = { 'Content-Type': 'application/json' };
  // CRITICAL: only inject token if it's a real non-null/undefined value
  if (token && token !== 'null' && token !== 'undefined') {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    console.log(`🤖 Puter REST guest (attempt ${attempt}/${MAX_RETRIES})...`);
    const response = await fetch('https://api.puter.com/puterai/openai/v1/chat/completions', {
      method: 'POST',
      headers,
      signal: controller.signal,
      body: JSON.stringify({ model: 'gpt-4o-mini', messages, temperature: 0.75, max_tokens: 900 }),
    });

    clearTimeout(timeoutId);

    if (response.status === 402 || response.status === 401) {
      throw new Error(`puter_quota_or_auth_error_${response.status}`);
    }
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Puter REST ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('Empty Puter REST response');

    updateAIStatus({ status: 'connected', lastMessage: 'Puter guest live ✓' });
    return content;
  } finally {
    clearTimeout(timeoutId);
  }
};

const callPuterWithRetry = async (messages, attempt = 1) => {
  try {
    return await callPuterREST(messages, attempt);
  } catch (err) {
    console.warn(`Puter attempt ${attempt} failed:`, err.message);
    if (attempt < MAX_RETRIES) {
      await delay(RETRY_DELAY_MS * attempt);
      return callPuterWithRetry(messages, attempt + 1);
    }
    throw err;
  }
};

// ─── Queue Processor ─────────────────────────────────────────────────────────
const getArchetypeFromSystem = (sys = '') => {
  if (!sys) return 'standard';
  const s = sys.toLowerCase();
  if (s.includes('biohacker') || s.includes('bio-hacker')) return 'biohacker';
  if (s.includes('cognitive')) return 'cognitive';
  return 'standard';
};

const processQueue = async () => {
  if (isProcessingQueue || requestQueue.length === 0) return;
  isProcessingQueue = true;
  const { resolve, reject, messages, prompt, systemInstruction, model } = requestQueue.shift();

  try {
    // LAYER 1: BYOK check first
    const byok = getBYOK();
    if (byok) {
      try {
        const result = await callBYOK(messages, byok);
        resolve(result);
        isProcessingQueue = false;
        await delay(300);
        processQueue();
        return;
      } catch (byokErr) {
        console.warn('BYOK failed, falling through to Puter:', byokErr.message);
      }
    }

    // LAYER 2: Puter REST guest
    try {
      const result = await callPuterWithRetry(messages);
      resolve(result);
    } catch (puterErr) {
      console.warn('Puter REST failed, falling to offline KB:', puterErr.message);
      // LAYER 3: Offline KB
      const arch = getArchetypeFromSystem(systemInstruction);
      updateAIStatus({ status: 'offline-kb', lastMessage: `Offline RAG (${arch})` });
      const fallback = (prompt.toLowerCase().includes('plan') || prompt.toLowerCase().includes('menu'))
        ? getLocalFallbackRecipe(prompt, arch)
        : getLocalFallbackChat(prompt, arch);
      resolve(fallback);
    }
  } catch (err) {
    reject(err);
  } finally {
    isProcessingQueue = false;
    await delay(300);
    processQueue();
  }
};

// ─── Public API ──────────────────────────────────────────────────────────────
export const queryAI = (prompt, systemInstruction = '', model = 'gpt-4o-mini') => {
  return new Promise(async (resolve) => {
    // Layer 0: Cache
    const cacheKey = generateCacheKey(prompt, systemInstruction, model);
    const cached = getCachedResponse(cacheKey);
    if (cached) return resolve(cached);

    const messages = [];
    if (systemInstruction) messages.push({ role: 'system', content: systemInstruction });
    messages.push({ role: 'user', content: prompt });

    requestQueue.push({
      resolve: (val) => { setCachedResponse(cacheKey, val); resolve(val); },
      reject: (err) => {
        console.error('All AI layers failed:', err);
        resolve('Beta, abhi thoda technical issue hai. Ek baar phir try karo! 🙏');
      },
      messages,
      prompt,
      systemInstruction,
      model
    });

    processQueue();
  });
};

// ─── Opt-in Puter Guest Boost (only via explicit button, never auto) ─────────
let hasTriggeredGuest = false;
export async function triggerPuterGuestOnce() {
  if (hasTriggeredGuest) return true;
  if (typeof window === 'undefined' || !window.puter?.auth) {
    console.log('[Puter Guest] SDK not available — REST fallback active.');
    return false;
  }
  try {
    if (!window.puter.auth.isSignedIn()) {
      await window.puter.auth.signIn({ attempt_temp_user_creation: true });
      updateAIStatus({ status: 'connected', lastMessage: 'Puter guest token active' });
    }
    hasTriggeredGuest = true;
    return true;
  } catch (err) {
    console.warn('[Puter Guest] One-time guest trigger failed:', err.message);
    return false;
  }
}
