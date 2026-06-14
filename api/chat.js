export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { messages, model } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Missing or invalid messages array' });
    }

    // Forward the client's Puter authorization header if present
    const authHeader = req.headers['authorization'];
    const headers = {
      'Content-Type': 'application/json',
    };

    // Forward Bearer token only if valid
    if (authHeader && authHeader !== 'Bearer null' && authHeader !== 'Bearer undefined' && authHeader.trim() !== '') {
      headers['Authorization'] = authHeader;
    }

    const puterModel = model || 'gpt-4o-mini';

    console.log(`[API Chat] Forwarding to Puter REST API. Model: ${puterModel}`);

    const response = await fetch('https://api.puter.com/puterai/openai/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: puterModel,
        messages,
        temperature: 0.75,
      }),
    });

    if (response.status === 402) {
      console.warn('[API Chat] Puter returned 402 - Insufficient funds / rate limit');
      return res.status(402).json({ error: 'insufficient_funds' });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API Chat] Puter API returned error ${response.status}: ${errorText}`);
      return res.status(response.status).json({ error: `Puter API error: ${errorText.slice(0, 150)}` });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('[API Chat] Internal server error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
