/**
 * Gemini API Route Template
 *
 * ⚠️ 重要提示：
 * 1. 这只是一个参考模板，不要直接使用！
 * 2. 必须从原项目的服务文件中提取正确的模型名称
 * 3. 必须根据原项目的 API 调用方式调整参数结构
 *
 * 常见模型名称示例：
 * - gemini-3-pro-image-preview (图片生成)
 * - gemini-2.0-flash-exp (实验性功能)
 * - gemini-1.5-pro (文本生成)
 * - gemini-1.5-flash (快速响应)
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";

// ⚠️ 必须替换为原项目使用的模型名称！
// 从原项目的服务文件中查找，例如：services/geminiService.ts
const MODEL_NAME = 'YOUR_MODEL_NAME_HERE';

const getAI = () => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

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

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
  }

  const ai = getAI();

  // ⚠️ 根据原项目的请求参数结构调整
  const { action, prompt, messages, imageConfig, inputImage } = req.body;

  try {
    // ⚠️ 以下是常见的 action 类型示例，根据原项目需求调整
    switch (action) {
      case 'generateText': {
        const response = await ai.models.generateContent({
          model: MODEL_NAME,
          contents: prompt,
        });
        return res.status(200).json({ text: response.text });
      }

      case 'generateContent': {
        // 支持文本和图片输入的通用生成
        const parts: any[] = [];

        if (inputImage) {
          parts.push({
            inlineData: {
              data: inputImage.data,
              mimeType: inputImage.mimeType
            }
          });
        }

        if (prompt) {
          parts.push({ text: prompt });
        }

        const response = await ai.models.generateContent({
          model: MODEL_NAME,
          contents: { parts },
          config: imageConfig ? {
            responseModalities: ["Text", "Image"],
            imageConfig: {
              aspectRatio: imageConfig.aspectRatio,
              imageSize: imageConfig.imageSize,
            },
          } : undefined,
        });

        const outputParts: any[] = [];
        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              outputParts.push({
                type: 'image',
                data: part.inlineData.data,
                mimeType: part.inlineData.mimeType || 'image/png',
              });
            } else if (part.text) {
              outputParts.push({
                type: 'text',
                text: part.text,
              });
            }
          }
        }
        return res.status(200).json({ parts: outputParts });
      }

      case 'chat': {
        const response = await ai.models.generateContent({
          model: MODEL_NAME,
          contents: messages,
        });
        return res.status(200).json({ text: response.text });
      }

      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to process request'
    });
  }
}
