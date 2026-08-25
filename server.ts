import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import axios from 'axios';
import jwt from 'jsonwebtoken';

dotenv.config();

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

  // Google OAuth URL Generation
  app.get('/api/auth/google/url', (req: Request, res: Response) => {
    const origin = req.query.origin as string;
    if (!origin) {
      res.status(400).json({ error: 'Origin is required' });
      return;
    }
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      res.status(500).json({ error: 'OAuth not configured. Please add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to environment variables.' });
      return;
    }

    const redirectUri = `${origin}/api/auth/google/callback`;
    const state = Buffer.from(JSON.stringify({ origin })).toString('base64');
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email%20profile&prompt=select_account&state=${state}`;
    res.json({ url: authUrl });
  });

  // Google OAuth Callback
  app.get('/api/auth/google/callback', async (req: Request, res: Response) => {
    const { code, state } = req.query;
    
    if (!code || !state) {
      res.status(400).send('Invalid request');
      return;
    }

    let origin = '';
    try {
      const decodedState = JSON.parse(Buffer.from(state as string, 'base64').toString('ascii'));
      origin = decodedState.origin;
    } catch(e) {
      res.status(400).send('Invalid state');
      return;
    }

    const redirectUri = `${origin}/api/auth/google/callback`;
    
    try {
      const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri
      });

      const { id_token } = tokenRes.data;
      const decoded: any = jwt.decode(id_token);
      
      const user = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture
      };
      
      res.send(`
        <html><body><script>
          if (window.opener) {
            window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS', payload: ${JSON.stringify(user)} }, '*');
            window.close();
          } else {
            window.location.href = '/';
          }
        </script></body></html>
      `);
    } catch (error) {
      console.error('OAuth token exchange error:', error);
      res.send('<html><body>Authentication failed. Please close this window and try again.</body></html>');
    }
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

  // Gemini Structured Assessment Analysis Route
  app.post('/api/ai/analyze-assessment', async (req: Request, res: Response) => {
    const { profile, answers, result, recommendations } = req.body;

    const ai = getGenAI();
    if (!ai) {
      res.status(503).json({ error: 'AI engine not configured' });
      return;
    }

    const schema = {
      type: "OBJECT",
      properties: {
        profile_summary: { type: "STRING" },
        top_careers: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              career: { type: "STRING" },
              match_score: { type: "INTEGER" },
              why_match: { type: "ARRAY", items: { type: "STRING" } },
              strengths: { type: "ARRAY", items: { type: "STRING" } },
              existing_skills: { type: "ARRAY", items: { type: "STRING" } },
              skill_gaps: { type: "ARRAY", items: { type: "STRING" } },
              next_steps: { type: "ARRAY", items: { type: "STRING" } }
            }
          }
        },
        roadmap: {
          type: "OBJECT",
          properties: {
            now: { type: "ARRAY", items: { type: "STRING" } },
            three_months: { type: "ARRAY", items: { type: "STRING" } },
            six_months: { type: "ARRAY", items: { type: "STRING" } },
            twelve_months: { type: "ARRAY", items: { type: "STRING" } }
          }
        }
      }
    };

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: `Analyze this user's career assessment and generate personalized recommendations, skill gaps, and a roadmap.
CRITICAL INSTRUCTION: Do NOT invent your own careers. The underlying recommendation engine has matched this profile with the following careers based on strict algorithmic rules:
${JSON.stringify(recommendations?.map((r: any) => ({ career: r.career.title, fitScore: r.fitScore, why: r.whyThis })) || [])}

You MUST base your top_careers output EXACTLY on these provided recommendations. Explain *why* they fit this exact user, referring to their specific interest and confidence scores.

User Profile: ${JSON.stringify(profile)}
Assessment Answers (Holland RIASEC scale): ${JSON.stringify(answers)}
Assessment Results (Holland Code & Dimensions): ${JSON.stringify(result)}

Keep the roadmap realistic and tailored to the Indian education and employment context, acknowledging the user's age, stage, and financial situation if provided.` }]
          }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: schema as any,
          temperature: 0.2,
        },
      });
      
      const text = response.text || "{}";
      const data = JSON.parse(text);
      res.json(data);
    } catch (error: any) {
      console.error('Gemini analysis error:', error);
      res.status(500).json({ error: 'Failed to analyze assessment' });
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
