/**
 * 🍛 HomeChef AI v4 - Multi-Provider BYOK Engine
 *
 * CALL ORDER (zero login popups, always):
 * ──────────────────────────────────────────────────────────────────────
 * Layer 0: 24h localStorage cache (instant)
 * Layer 1: BYOK — user's saved provider key:
 *            • Cerebras  → gpt-oss-120b → gpt-oss-20b → qwen-3-32b → llama-4-scout (auto-fallback)
 *            • Groq      → llama-3.3-70b-versatile → llama-4-scout → llama3-70b → llama-3.1-8b (auto-fallback)
 *            • OpenAI    → gpt-4o-mini
 *            • Gemini    → auto-detects free model: gemini-2.0-flash → 1.5-flash → 1.5-flash-8b
 * Layer 2: Puter REST guest (keyless, no popup)
 * Layer 3: Rich Offline RAG / Knowledge Base
 *
 * BYOK stored at: localStorage('homechef_byok')
 * Format: { provider: 'cerebras'|'groq'|'openai'|'gemini', key: '...' }
 */

import { getLocalFallbackRecipe, getLocalFallbackChat } from './offlineKnowledgeBase';

const AI_CACHE_KEY    = 'homechef_ai_cache_v2';
const BYOK_KEY        = 'homechef_byok';
const MAX_CACHE_AGE   = 24 * 60 * 60 * 1000; // 24h
const TIMEOUT_MS      = 14000;
const PUTER_RETRIES   = 2;

// ─── Provider Model Chains ────────────────────────────────────────────────────
// Each chain is tried left-to-right. If a model returns an error the next is tried.

const CEREBRAS_MODELS = [
  'gpt-oss-120b',
  'gpt-oss-20b',
  'qwen-3-32b',
  'llama-4-scout-17b-16e-instruct',
  'llama3.3-70b',   // standard-name fallback
];

const GROQ_MODELS = [
  'llama-3.3-70b-versatile',
  'llama-4-scout-17b-16e-instruct',
  'meta-llama/llama-4-scout-17b-16e-instruct',
  'llama3-70b-8192',
  'llama-3.1-8b-instant',
];

const GEMINI_FREE_MODELS = [
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite',
  'gemini-3.1-pro',
  'gemini-1.5-flash-latest',
];

const PUTER_FALLBACK_MODELS = [
  'gpt-5-nano',
  'gpt-5-mini',
  'gpt-4o-mini',
  'claude-sonnet-4-5',
  'claude-haiku-4-5',
  'google/gemini-2.5-flash',
  'google/gemini-2.0-flash',
  'x-ai/grok-4',
  'meta-llama/llama-3.3-70b-instruct',
  'mistral-large-latest',
];

// ─── Queue & Status ───────────────────────────────────────────────────────────
let isProcessingQueue = false;
const requestQueue = [];

let lastAIStatus = { status: 'unknown', lastMessage: 'Initializing...', timestamp: null };

const updateAIStatus = (patch) => {
  lastAIStatus = { ...lastAIStatus, ...patch, timestamp: Date.now() };
  console.log('📡 AI:', lastAIStatus.status, '—', lastAIStatus.lastMessage);
};

export const getAIStatus = () => ({ ...lastAIStatus });

export const clearAICache = () => {
  try {
    localStorage.removeItem(AI_CACHE_KEY);
    updateAIStatus({ status: 'cleared', lastMessage: 'Cache cleared.' });
    return true;
  } catch { return false; }
};

// ─── BYOK Helpers ─────────────────────────────────────────────────────────────
export const getBYOK = () => {
  try {
    const raw = localStorage.getItem(BYOK_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    return (p && p.key && p.key.length > 8) ? p : null;
  } catch { return null; }
};

export const saveBYOK = (provider, key) => {
  try {
    localStorage.setItem(BYOK_KEY, JSON.stringify({ provider, key: key.trim() }));
    updateAIStatus({ status: 'byok', lastMessage: `BYOK set: ${provider}` });
    return true;
  } catch { return false; }
};

export const clearBYOK = () => {
  try {
    localStorage.removeItem(BYOK_KEY);
    updateAIStatus({ status: 'unknown', lastMessage: 'BYOK removed — Puter guest active.' });
    return true;
  } catch { return false; }
};

// ─── Cache ────────────────────────────────────────────────────────────────────
const hashKey = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = Math.imul(31, h) + s.charCodeAt(i) | 0; }
  return `k_${Math.abs(h)}`;
};

const getCached = (key) => {
  try {
    const raw = localStorage.getItem(AI_CACHE_KEY);
    if (!raw) return null;
    const cache = JSON.parse(raw);
    const item = cache[key];
    if (item && Date.now() - item.ts < MAX_CACHE_AGE) {
      updateAIStatus({ status: 'cached', lastMessage: '24h cache hit' });
      return item.val;
    }
    if (item) { delete cache[key]; localStorage.setItem(AI_CACHE_KEY, JSON.stringify(cache)); }
  } catch { /* ignore */ }
  return null;
};

const setCache = (key, val) => {
  try {
    const raw = localStorage.getItem(AI_CACHE_KEY);
    const cache = raw ? JSON.parse(raw) : {};
    cache[key] = { val, ts: Date.now() };
    localStorage.setItem(AI_CACHE_KEY, JSON.stringify(cache));
  } catch { /* ignore */ }
};

const delay = (ms) => new Promise(r => setTimeout(r, ms));

// ─── Shared: OpenAI-compatible POST ──────────────────────────────────────────
// Used by: Cerebras, Groq, OpenAI (all share same wire format)
const callOpenAICompatible = async (url, apiKey, model, messages) => {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'POST',
      signal: ctrl.signal,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages, temperature: 0.75, max_tokens: 900 }),
    });
    clearTimeout(tid);
    if (res.status === 401) throw new Error('invalid_api_key');
    if (res.status === 429) throw new Error('rate_limited');
    if (res.status === 404) throw new Error('model_not_found');
    if (!res.ok) { const t = await res.text(); throw new Error(`http_${res.status}: ${t.slice(0, 120)}`); }
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('empty_response');
    return content;
  } finally {
    clearTimeout(tid);
  }
};

// ─── Shared: Gemini POST (different wire format) ──────────────────────────────
const callGemini = async (apiKey, model, messages) => {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const systemMsg = messages.find(m => m.role === 'system');
  const contents = messages
    .filter(m => m.role !== 'system')
    .map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
  try {
    const res = await fetch(url, {
      method: 'POST',
      signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        ...(systemMsg && { systemInstruction: { parts: [{ text: systemMsg.content }] } }),
        generationConfig: { temperature: 0.75, maxOutputTokens: 900 },
      }),
    });
    clearTimeout(tid);
    if (res.status === 401 || res.status === 403) throw new Error('invalid_api_key');
    if (res.status === 429) throw new Error('rate_limited');
    if (res.status === 404) throw new Error('model_not_found');
    if (!res.ok) { const t = await res.text(); throw new Error(`http_${res.status}: ${t.slice(0, 120)}`); }
    const data = await res.json();
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) throw new Error('empty_response');
    return content;
  } finally {
    clearTimeout(tid);
  }
};

// ─── BYOK Provider Router ─────────────────────────────────────────────────────
const callBYOK = async (messages, byok) => {
  const { provider, key } = byok;

  // ── Cerebras ──────────────────────────────────────────────────────────────
  if (provider === 'cerebras') {
    const url = 'https://api.cerebras.ai/v1/chat/completions';
    for (const model of CEREBRAS_MODELS) {
      try {
        console.log(`🧠 Cerebras trying: ${model}`);
        const result = await callOpenAICompatible(url, key, model, messages);
        updateAIStatus({ status: 'byok', lastMessage: `Cerebras ${model} ✓` });
        return result;
      } catch (err) {
        if (err.message === 'invalid_api_key') throw err; // don't retry on bad key
        console.warn(`Cerebras ${model} failed:`, err.message, '— trying next model');
      }
    }
    throw new Error('All Cerebras models exhausted');
  }

  // ── Groq ──────────────────────────────────────────────────────────────────
  if (provider === 'groq') {
    const url = 'https://api.groq.com/openai/v1/chat/completions';
    for (const model of GROQ_MODELS) {
      try {
        console.log(`⚡ Groq trying: ${model}`);
        const result = await callOpenAICompatible(url, key, model, messages);
        updateAIStatus({ status: 'byok', lastMessage: `Groq ${model} ✓` });
        return result;
      } catch (err) {
        if (err.message === 'invalid_api_key') throw err;
        console.warn(`Groq ${model} failed:`, err.message, '— trying next model');
      }
    }
    throw new Error('All Groq models exhausted');
  }

  // ── OpenAI ────────────────────────────────────────────────────────────────
  if (provider === 'openai') {
    const result = await callOpenAICompatible(
      'https://api.openai.com/v1/chat/completions',
      key, 'gpt-4o-mini', messages
    );
    updateAIStatus({ status: 'byok', lastMessage: 'OpenAI gpt-4o-mini ✓' });
    return result;
  }

  // ── Gemini (auto-detect free model) ───────────────────────────────────────
  if (provider === 'gemini') {
    for (const model of GEMINI_FREE_MODELS) {
      try {
        console.log(`🌟 Gemini trying: ${model}`);
        const result = await callGemini(key, model, messages);
        updateAIStatus({ status: 'byok', lastMessage: `Gemini ${model} ✓` });
        return result;
      } catch (err) {
        if (err.message === 'invalid_api_key') throw err;
        console.warn(`Gemini ${model} failed:`, err.message, '— trying next model');
      }
    }
    throw new Error('All Gemini free models exhausted');
  }

  throw new Error(`Unknown provider: ${provider}`);
};

// ─── Puter REST Guest (No popup, no login) ────────────────────────────────────
const callPuterREST = async () => {
  let token = null;
  try {
    token = localStorage.getItem('puter.auth.token') ||
            localStorage.getItem('puter.auth.token.v2') ||
            (window.puter && (window.puter.authToken || window.puter.token)) || null;
  } catch { /* ignore */ }

  const headers = { 'Content-Type': 'application/json' };
  if (token && token !== 'null' && token !== 'undefined') {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Puter REST is called with the messages passed in; we call it in retry wrapper below
  return headers; // return headers for use in the retry fn
};

const callPuterWithMessages = async (messages) => {
  if (!window.puter || !window.puter.ai) {
    throw new Error('Puter SDK not loaded yet');
  }
  let lastErr = null;

  for (let i = 0; i < PUTER_FALLBACK_MODELS.length; i++) {
    const model = PUTER_FALLBACK_MODELS[i];
    try {
      console.log(`🤖 Puter SDK trying: ${model}${i > 0 ? ` (fallback ${i})` : ''}...`);
      const r = await window.puter.ai.chat(messages, { model });
      const content = typeof r === 'string' ? r : (r?.message?.content?.[0]?.text || r?.message?.content || r?.text || JSON.stringify(r));
      if (!content) throw new Error('empty_response');
      updateAIStatus({ status: 'connected', lastMessage: `Puter guest (${model}) ✓` });
      return content;
    } catch (err) {
      lastErr = err;
      console.warn(`Puter SDK: Model ${model} failed:`, err.message || err);
    }
  }
  throw lastErr || new Error('All Puter fallback models exhausted');
};

// ─── Archetype extractor ──────────────────────────────────────────────────────
const getArchetype = (sys = '') => {
  const s = sys.toLowerCase();
  if (s.includes('biohacker') || s.includes('bio-hacker')) return 'biohacker';
  if (s.includes('cognitive')) return 'cognitive';
  return 'standard';
};

// ─── Queue Processor ──────────────────────────────────────────────────────────
const processQueue = async () => {
  if (isProcessingQueue || requestQueue.length === 0) return;
  isProcessingQueue = true;
  const { resolve, reject, messages, prompt, systemInstruction } = requestQueue.shift();

  try {
    // LAYER 1 — BYOK
    const byok = getBYOK();
    if (byok) {
      try {
        const result = await callBYOK(messages, byok);
        resolve(result);
        return;
      } catch (err) {
        console.warn(`BYOK (${byok.provider}) failed, falling to Puter:`, err.message);
      }
    }

    // LAYER 2 — Puter REST guest
    try {
      const result = await callPuterWithMessages(messages);
      resolve(result);
    } catch (puterErr) {
      console.warn('Puter REST failed, using Offline RAG:', puterErr.message);
      // LAYER 3 — Offline RAG
      const arch = getArchetype(systemInstruction);
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
    await delay(250);
    processQueue();
  }
};

// ─── Public queryAI ───────────────────────────────────────────────────────────
export const queryAI = (prompt, systemInstruction = '', model = 'gpt-4o-mini') => {
  return new Promise(async (resolve) => {
    const isArray = Array.isArray(prompt);
    const userPromptText = isArray ? prompt[prompt.length - 1]?.content || '' : prompt;
    const cKey = hashKey(`${isArray ? JSON.stringify(prompt) : prompt}|${systemInstruction}|${model}`);
    const cached = getCached(cKey);
    if (cached) return resolve(cached);

    let messages = [];
    if (isArray) {
      messages = [...prompt];
      if (systemInstruction && !messages.some(m => m.role === 'system')) {
        messages.unshift({ role: 'system', content: systemInstruction });
      }
    } else {
      if (systemInstruction) messages.push({ role: 'system', content: systemInstruction });
      messages.push({ role: 'user', content: prompt });
    }

    requestQueue.push({
      resolve: (val) => { setCache(cKey, val); resolve(val); },
      reject: () => resolve('Beta, abhi thoda technical issue hai. Ek baar phir try karo! 🙏'),
      messages, prompt: userPromptText, systemInstruction, model,
    });

    processQueue();
  });
};

// ─── Opt-in Puter Guest Boost (explicit button only, never auto) ──────────────
export async function triggerPuterGuestOnce() {
  // Headless: We never call Puter's interactive login popup.
  // Anonymous guest mode is supported natively by our REST handler.
  updateAIStatus({ status: 'connected', lastMessage: 'Puter guest direct REST active' });
  return true;
}
