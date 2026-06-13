/**
 * 🍛 HomeChef AI v2 - Robust Serverless Puter.js AI Wrapper
 * Implements:
 * 1. 5-Layer Fallback (Cache -> API -> Retry -> Queue -> Local KB)
 * 2. Strict Request Queuing & Rate Limit Protection
 * 3. Smart LocalStorage Caching (24h expiry)
 * 4. Model Selection Routing (gpt-4o-mini for speed, gpt-4o for complex thali plans)
 */

import { getLocalFallbackRecipe, getLocalFallbackChat } from './offlineKnowledgeBase';

const AI_CACHE_KEY = 'homechef_ai_cache_v2';
const MAX_CACHE_AGE_MS = 24 * 60 * 60 * 1000; // 24 Hours
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

// Request Queue to prevent concurrent spam rate limits
let isProcessingQueue = false;
const requestQueue = [];

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
  try {
    const selectedModel = model === 'gpt-4o' ? 'gpt-4o' : 'gpt-4o-mini';
    console.log(`🤖 PuterAI calling REST ${selectedModel} (Attempt ${attempt}/${MAX_RETRIES})...`);
    
    let token = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("puter.auth.token.v2") || 
              (window.puter && window.puter.authToken);
    }

    const headers = {
      "Content-Type": "application/json",
    };
    
    if (token && token !== "null" && token !== "undefined") {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch("https://api.puter.com/puterai/openai/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          { role: "system", content: systemInstruction || "You are a helpful assistant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.2,
      }),
    });

    if (response.status === 402 || response.status === 401) {
      throw new Error(`puter_auth_or_funds_error_status_${response.status}`);
    }

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Puter AI REST Error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    if (data && data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
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
        // Save to cache on successful resolution
        setCachedResponse(cacheKey, val);
        resolve(val);
      },
      reject: async (err) => {
        console.warn('❌ PuterAI request failed in queue. Falling back to local KB.', err);
        // 3. Layer 5: Offline/KnowledgeBase Fallback
        try {
          const fallback = prompt.toLowerCase().includes('plan') || prompt.toLowerCase().includes('menu')
            ? getLocalFallbackRecipe(prompt)
            : getLocalFallbackChat(prompt);
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
