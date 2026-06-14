import puter from '@heyputer/puter.js';

export default async function handler(req, res) {
  // 1. Serverless Backend Setup (Vercel): Restribute to POST and validate input
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { text } = req.body || {};

  if (!text || typeof text !== 'string' || text.trim().length <= 3) {
    return res.status(400).json({ error: 'Invalid input: Text must be greater than 3 characters.' });
  }

  // 2. Dynamic Puter Initialization: Check for process.env.PUTER_APP_TOKEN and initialize puter.js
  const appToken = process.env.PUTER_APP_TOKEN;
  if (!appToken) {
    console.error('Configuration Error: PUTER_APP_TOKEN environment variable is missing.');
    return res.status(500).json({ error: 'Server configuration error: PUTER_APP_TOKEN is not configured.' });
  }

  try {
    // Authenticate Puter using the developer app token (developer's quota is used)
    puter.init({ appToken });

    // 3. Prompt Construction & Execution: Build the proprietary prompt and strictly await the chat call
    const systemPrompt = `You are a professional corporate HR Compliance Auditor.
Analyze the user input below for violations of professional conduct, workplace inclusivity guidelines, harassment, bias, or toxic speech.
Categorize the compliance level (Compliant, Needs Attention, Non-Compliant), summarize specific issues found, and suggest a professional, compliant rewrite.`;

    const prompt = `System Instructions:
${systemPrompt}

User Input to Audit:
"${text.trim()}"`;

    console.log('Initiating server-side Puter AI completions call...');
    
    // STRICTLY await the call to keep the ephemeral Vercel lambda alive during the WebSocket handshake
    const response = await puter.ai.chat(prompt, { model: 'gpt-5-nano' });

    if (!response) {
      throw new Error('Empty response returned from Puter AI gateway');
    }

    const outputText = typeof response === 'string' ? response : (response.message?.content || JSON.stringify(response));

    return res.status(200).json({
      success: true,
      originalText: text,
      auditOutput: outputText
    });

  } catch (error) {
    console.error('Server-side Puter.js Error:', error);

    // 4. Server-Side Error Handling: Explicitly check for 402 or Account quota exhaustion
    const errorMessage = String(error.message || error || '').toLowerCase();
    const is402 = errorMessage.includes('402') || 
                  errorMessage.includes('quota') || 
                  errorMessage.includes('payment') || 
                  errorMessage.includes('allowance') || 
                  errorMessage.includes('usage');

    if (is402) {
      return res.status(402).json({ error: 'Developer AI quota exhausted' });
    }

    return res.status(500).json({ error: 'Failed to process HR audit: ' + (error.message || 'Unknown error') });
  }
}
