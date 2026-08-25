import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory data store for server-side persistence
  const serverStore = {
    profiles: new Map<string, any>(),
    results: new Map<string, any>(),
    feedback: [] as any[],
  };

  // Lazy GenAI Client Initializer
  let genAIClient: GoogleGenAI | null = null;
  function getGenAI(): GoogleGenAI | null {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return null;
    }
    if (!genAIClient) {
      try {
        genAIClient = new GoogleGenAI();
      } catch {
        return null;
      }
    }
    return genAIClient;
  }

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 're\\start my career intelligence engine',
      timestamp: new Date().toISOString(),
    });
  });

  // Profile sync API
  app.post('/api/profile', (req: Request, res: Response) => {
    const profile = req.body;
    if (profile && profile.id) {
      serverStore.profiles.set(profile.id, profile);
    }
    res.json({ success: true });
  });

  // Assessment results sync API
  app.post('/api/results', (req: Request, res: Response) => {
    const result = req.body;
    if (result && result.userId) {
      serverStore.results.set(result.userId, result);
    }
    res.json({ success: true });
  });

  // Feedback submission API
  app.post('/api/feedback', (req: Request, res: Response) => {
    const fb = req.body;
    if (fb) {
      serverStore.feedback.push(fb);
    }
    res.json({ success: true });
  });

  // AI Career Counsellor Proxy Route (Server-side Gemini API)
  app.post('/api/chat', async (req: Request, res: Response) => {
    const { message, history, context } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const ai = getGenAI();

    if (!ai) {
      // Return empty reply to allow client-side deterministic expert rule fallback
      res.json({ reply: '' });
      return;
    }

    try {
      const systemPrompt = `You are a direct, evidence-oriented Indian career counsellor for the "re\\start my career" platform.
Use the user’s actual assessment data provided in the context.
Do not flatter the user. Do not recommend careers based on prestige.
Explain trade-offs honestly. Cite actual RIASEC dimension names and numerical scores whenever discussing recommendations.
Mention specific Indian educational pathways and relevant entrance examinations (JEE, NEET, CUET, CLAT, NID, NIFT, CA, UPSC, etc.) where appropriate.
Never invent eligibility requirements.
Never claim that an assessment determines someone’s destiny.
Write in second person.

Current User Context:
• Name: ${context?.name || 'Candidate'}
• Age: ${context?.age || 'N/A'}
• Life Stage: ${context?.segment || 'N/A'}
• Current Education/Degree: ${context?.currentEducation || 'N/A'}
• Income Dependency: ${context?.incomeDependency || 'N/A'}
• Switch Reason: ${context?.switchReason || 'N/A'}
• Current Field & Years of Experience: ${context?.currentField || 'N/A'}, ${context?.experienceYears || 0} years
• Holland RIASEC Code: ${context?.hollandCode || 'N/A'}
• Top Dimensions: ${(context?.topDimensions || []).join(', ')}
• Highest Latent Gap Dimension: ${context?.latentGapDimension || 'None'} (Gap: +${context?.latentGapValue || 0})
• Top Recommendations: ${(context?.recommendations || []).map((r: any) => `${r.title} (${r.fitScore}% Fit - ${r.path})`).join('; ')}
• Shortlisted Careers: ${(context?.savedCareers || []).join(', ') || 'None yet'}
`;

      const contents: any[] = [];

      // Prior history (up to last 6 messages)
      if (Array.isArray(history)) {
        for (const h of history) {
          contents.push({
            role: h.role === 'ai' || h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.content }],
          });
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      const replyText = response.text?.trim() || '';
      res.json({ reply: replyText });
    } catch (error: any) {
      // Silent recovery: Return empty reply so fallback generates the response seamlessly
      res.json({ reply: '' });
    }
  });

  // Vite middleware for development vs Production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`re\\start my career server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
