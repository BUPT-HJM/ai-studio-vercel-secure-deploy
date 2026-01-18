import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

// Initialize with server-side env variable (never exposed to client)
const getClient = () => new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });
  }

  const openai = getClient();
  const { action, messages, prompt, model = 'gpt-4o' } = req.body;

  try {
    switch (action) {
      case 'chat': {
        const response = await openai.chat.completions.create({
          model,
          messages,
        });
        return res.status(200).json({
          message: response.choices[0].message,
          usage: response.usage,
        });
      }

      case 'completion': {
        const response = await openai.chat.completions.create({
          model,
          messages: [{ role: 'user', content: prompt }],
        });
        return res.status(200).json({
          text: response.choices[0].message.content,
        });
      }

      case 'image': {
        const { size = '1024x1024', quality = 'standard' } = req.body;
        const response = await openai.images.generate({
          model: 'dall-e-3',
          prompt,
          n: 1,
          size,
          quality,
        });
        return res.status(200).json({
          url: response.data[0].url,
          revisedPrompt: response.data[0].revised_prompt,
        });
      }

      case 'embedding': {
        const { input } = req.body;
        const response = await openai.embeddings.create({
          model: 'text-embedding-3-small',
          input,
        });
        return res.status(200).json({
          embedding: response.data[0].embedding,
        });
      }

      case 'transcription': {
        const { audioUrl } = req.body;
        // Note: For file uploads, you'll need to handle multipart form data
        return res.status(400).json({
          error: 'Audio transcription requires file upload handling'
        });
      }

      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to process request'
    });
  }
}
