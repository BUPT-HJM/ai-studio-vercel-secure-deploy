/**
 * Frontend API Service Template
 *
 * This template shows how to call backend API routes
 * instead of using AI SDKs directly in the frontend.
 */

const API_BASE = '/api';

// ============================================
// Gemini Service Functions
// ============================================

export const geminiGenerateText = async (prompt: string): Promise<string> => {
  const response = await fetch(`${API_BASE}/gemini`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'generateText', prompt }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate text');
  }

  const data = await response.json();
  return data.text;
};

export const geminiGenerateImage = async (prompt: string): Promise<string> => {
  const response = await fetch(`${API_BASE}/gemini`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'generateImage', prompt }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate image');
  }

  const data = await response.json();
  return data.imageData;
};

export const geminiChat = async (messages: Array<{ role: string; content: string }>): Promise<string> => {
  const response = await fetch(`${API_BASE}/gemini`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'chat', messages }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to chat');
  }

  const data = await response.json();
  return data.text;
};

export const geminiGenerateJSON = async <T>(prompt: string, schema: object): Promise<T> => {
  const response = await fetch(`${API_BASE}/gemini`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'generateJSON', prompt, schema }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate JSON');
  }

  return response.json();
};

// ============================================
// OpenAI Service Functions
// ============================================

export const openaiChat = async (
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  model = 'gpt-4o'
): Promise<{ content: string; role: string }> => {
  const response = await fetch(`${API_BASE}/openai`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'chat', messages, model }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to chat');
  }

  const data = await response.json();
  return data.message;
};

export const openaiCompletion = async (prompt: string, model = 'gpt-4o'): Promise<string> => {
  const response = await fetch(`${API_BASE}/openai`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'completion', prompt, model }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to complete');
  }

  const data = await response.json();
  return data.text;
};

export const openaiGenerateImage = async (
  prompt: string,
  options?: { size?: '1024x1024' | '1792x1024' | '1024x1792'; quality?: 'standard' | 'hd' }
): Promise<{ url: string; revisedPrompt?: string }> => {
  const response = await fetch(`${API_BASE}/openai`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'image', prompt, ...options }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate image');
  }

  return response.json();
};

export const openaiEmbedding = async (input: string | string[]): Promise<number[]> => {
  const response = await fetch(`${API_BASE}/openai`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'embedding', input }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create embedding');
  }

  const data = await response.json();
  return data.embedding;
};
