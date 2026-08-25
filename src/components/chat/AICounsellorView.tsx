import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  Trash2, 
  Copy, 
  Check, 
  RotateCcw, 
  ShieldCheck, 
  AlertCircle, 
  User as UserIcon,
  Bot
} from 'lucide-react';
import { 
  UserProfile, 
  AssessmentResult, 
  Recommendation, 
  ChatMessage, 
  SupportedLanguage 
} from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { askAICounsellor } from '../../services/aiCounsellor';

interface AICounsellorViewProps {
  profile: UserProfile;
  result: AssessmentResult;
  recommendations: Recommendation[];
  savedCareerTitles: string[];
  chatHistory: ChatMessage[];
  onSaveChatHistory: (messages: ChatMessage[]) => void;
  language: SupportedLanguage;
  initialQuery?: string;
}

export const AICounsellorView: React.FC<AICounsellorViewProps> = ({
  profile,
  result,
  recommendations,
  savedCareerTitles,
  chatHistory,
  onSaveChatHistory,
  language,
  initialQuery,
}) => {
  const t = TRANSLATIONS[language];
  const [messages, setMessages] = useState<ChatMessage[]>(chatHistory);
  const [inputQuery, setInputQuery] = useState(initialQuery || '');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const topRec = recommendations[0];
  const latentDim = result.highestLatentDimension;

  // Suggested prompt chips
  const starterChips = [
    `How should I discuss this report with my parents?`,
    `What are the realistic trade-offs of switching into ${topRec?.career.title || 'my top career'}?`,
    latentDim ? `Why do I have a Latent Gap in ${latentDim} and how do I test it?` : `How do I prepare for entrance exams without burning out?`,
    `What part-time certifications or degrees give the strongest credential for my profile?`,
  ];

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Initial welcome message if chat is empty
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMsg: ChatMessage = {
        id: 'msg_welcome',
        sender: 'ai',
        content: `Hello ${profile.name.split(' ')[0]}. I am your evidence-oriented career counsellor.

I have full visibility into your ${result.hollandCode} Holland profile (${result.topDimensions.map((d) => `${d}: ${result.scores[d].interestScore}%`).join(', ')}), your measured gap in ${result.highestLatentDimension || 'your dimensions'}, and your recommended directions starting with ${topRec?.career.title}.

What specific question or decision would you like to examine?`,
        timestamp: new Date().toISOString(),
      };
      const initialMsgs = [welcomeMsg];
      setMessages(initialMsgs);
      onSaveChatHistory(initialMsgs);
    }
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      content: query,
      timestamp: new Date().toISOString(),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInputQuery('');
    setIsLoading(true);

    try {
      const reply = await askAICounsellor(query, updated, {
        profile,
        result,
        recommendations,
        savedCareerTitles,
      });

      const aiMsg: ChatMessage = {
        id: 'msg_' + (Date.now() + 1),
        sender: 'ai',
        content: reply,
        timestamp: new Date().toISOString(),
      };

      const finalMessages = [...updated, aiMsg];
      setMessages(finalMessages);
      onSaveChatHistory(finalMessages);
    } catch {
      // Fallback
      const fallbackMsg: ChatMessage = {
        id: 'msg_' + (Date.now() + 1),
        sender: 'ai',
        content: `Based on your ${result.hollandCode} profile, we recommend focusing on structured institutional pathways. Explore your 30-Day action plan on the Report tab to conduct low-risk informational interviews.`,
        timestamp: new Date().toISOString(),
      };
      const finalMessages = [...updated, fallbackMsg];
      setMessages(finalMessages);
      onSaveChatHistory(finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    const freshWelcome: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'ai',
      content: `Chat history cleared. How can I assist you with your ${result.hollandCode} profile today?`,
      timestamp: new Date().toISOString(),
    };
    setMessages([freshWelcome]);
    onSaveChatHistory([freshWelcome]);
  };

  const handleCopyMessage = (content: string, idx: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen pb-16 flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      
      {/* Top Bar */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md sticky top-16 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-sm font-bold text-zinc-100">
                  {t.ai_title}
                </h1>
                <span className="px-2 py-0.2 rounded-full bg-emerald-950 border border-emerald-800 text-[10px] font-mono text-emerald-400">
                  Evidence-Grounded
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 truncate max-w-sm sm:max-w-md">
                Grounded in your {result.hollandCode} scores and Indian higher education routes.
              </p>
            </div>
          </div>

          <button
            onClick={handleClearHistory}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors text-xs font-mono flex items-center gap-1"
            title="Clear Chat History"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6 overflow-y-auto">
        
        {/* Candidate Context Pill */}
        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2 truncate">
            <span className="text-zinc-200">{profile.name}</span>
            <span>·</span>
            <span className="uppercase">{profile.segment.replace('_', ' ')}</span>
            <span>·</span>
            <span className="text-blue-400">{result.hollandCode}</span>
          </div>
          <span className="text-[10px] text-zinc-400 hidden sm:inline">
            Active Context Loaded
          </span>
        </div>

        {/* Message Stream */}
        <div className="space-y-4">
          {messages.map((msg, idx) => {
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'} group`}
              >
                {isAI && (
                  <div className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 relative ${
                  isAI
                    ? 'bg-zinc-900 border border-zinc-800 text-zinc-200'
                    : 'bg-blue-600 text-white rounded-br-none shadow-md'
                }`}>
                  <div className="whitespace-pre-wrap">
                    {msg.content}
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[10px] font-mono opacity-60">
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>

                    {isAI && (
                      <button
                        onClick={() => handleCopyMessage(msg.content, idx)}
                        className="opacity-0 group-hover:opacity-100 hover:text-white transition-opacity flex items-center gap-1"
                        title="Copy text"
                      >
                        {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {!isAI && (
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center shrink-0 animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-2 text-xs text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                <span>Analyzing Holland scores and Indian pathway options...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

      </div>

      {/* Bottom Fixed Input & Starter Chips */}
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 pt-2 sticky bottom-4 z-20">
        
        {/* Starter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {starterChips.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(chip)}
              className="px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-300 hover:text-white transition-colors whitespace-nowrap shadow-sm"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center mt-1"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={t.ai_placeholder}
            disabled={isLoading}
            className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 shadow-2xl backdrop-blur-md"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className={`absolute right-2 p-2 rounded-xl transition-all ${
              inputQuery.trim() && !isLoading
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
