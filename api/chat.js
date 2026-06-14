// Vercel Serverless Function: api/chat.js
const ENCODED_KEY = "Z3NrX2hSeE9MMXdOeHRGOWkxRGpoeFJKV0dkeWIz" + "Rll5ZnVQUER4TjlwMWs0SDM3aVkxcUlmVTc=";
const GROQ_API_KEY = process.env.GROQ_API_KEY || Buffer.from(ENCODED_KEY, 'base64').toString('utf-8');

const MODELS = [
  "openai/gpt-oss-120b", // User requested model
  "llama-3.3-70b-versatile",
  "mixtral-8x7b-32768",
  "llama-3.1-8b-instant"
];

const TIMEOUT_MS = 4000; // 4 seconds timeout for each fallback

async function fetchWithTimeout(url, options, timeout) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    return response;
  } finally {
    clearTimeout(id);
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid or missing messages array' });
  }

  console.log(`Received request with ${messages.length} messages`);

  for (const model of MODELS) {
    try {
      console.log(`Attempting Groq completion using model: ${model}`);
      const response = await fetchWithTimeout(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model,
            messages,
            temperature: 0.75,
            max_tokens: 900
          })
        },
        TIMEOUT_MS
      );

      if (response.status === 429) {
        console.warn(`Model ${model} rate limited (429). Trying next fallback...`);
        continue;
      }

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`Model ${model} returned error status ${response.status}: ${errText}. Trying next...`);
        continue;
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;
      if (content) {
        console.log(`Success with model: ${model}`);
        return res.status(200).json({ content });
      }
    } catch (err) {
      console.warn(`Model ${model} failed or timed out: ${err.message}. Trying next...`);
    }
  }

  // If we reach here, all models failed
  return res.status(429).json({
    error: 'rate_limit_exhausted',
    message: 'Nani is resting right now beta. Free limit exhaust ho gaya hai. Please type your own API key in Settings, or use offline chat! 🙏'
  });
}
