import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  RotateCcw, 
  User as UserIcon,
  Bot
} from 'lucide-react';
import { 
  UserProfile, 
  AssessmentResult, 
  Recommendation, 
  ChatMessage 
} from '../../types';
import { askAICounsellor } from '../../services/aiCounsellor';

interface AICounsellorViewProps {
  profile: UserProfile;
  result: AssessmentResult;
  recommendations: Recommendation[];
  savedCareerTitles: string[];
  chatHistory: ChatMessage[];
  onSaveChatHistory: (messages: ChatMessage[]) => void;
  initialQuery?: string;
}

export const AICounsellorView: React.FC<AICounsellorViewProps> = ({
  profile,
  result,
  recommendations,
  savedCareerTitles,
  chatHistory,
  onSaveChatHistory,
  initialQuery,
}) => {
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
      const firstName = profile?.name ? profile.name.split(' ')[0] : 'there';
      const dimensionsStr = (result?.topDimensions || []).map((d) => `${d}: ${result?.scores?.[d]?.interestScore ?? 50}%`).join(', ');
      const welcomeMsg: ChatMessage = {
        id: 'msg_welcome',
        sender: 'ai',
        content: `Hello ${firstName}. I am your evidence-oriented career counsellor.

I have full visibility into your ${result?.hollandCode || 'RIASEC'} Holland profile (${dimensionsStr}), your measured gap in ${result?.highestLatentDimension || 'your dimensions'}, and your recommended directions starting with ${topRec?.career.title || 'your top recommendations'}.

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
    <div className="w-full bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 min-h-screen pb-16 flex flex-col selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-black dark:selection:text-white transition-colors duration-200">
      
      {/* Top Bar */}
      <div className="border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50/80 dark:bg-black/70 backdrop-blur-md sticky top-16 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-white shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-zinc-950 dark:text-white">
                  AI Career Counsellor
                </h1>
                <span className="px-2 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-[10px] font-mono text-emerald-800 dark:text-emerald-400">
                  Evidence-Grounded
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-sm sm:max-w-md">
                Grounded in your {result.hollandCode} scores and Indian higher education routes.
              </p>
            </div>
          </div>

          <button
            onClick={handleClearHistory}
            className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-xs font-mono flex items-center gap-1 cursor-pointer"
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
        <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2 truncate">
            <span className="text-zinc-900 dark:text-zinc-200 font-semibold">{profile.name}</span>
            <span>·</span>
            <span>{profile.segment.replace('_', ' ').toUpperCase()}</span>
            <span>·</span>
            <span>Code: {result.hollandCode}</span>
          </div>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500">Private session</span>
        </div>

        {/* Messages List */}
        <div className="space-y-6">
          {messages.map((msg, index) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id || index}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isUser 
                    ? 'bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-semibold' 
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700'
                }`}>
                  {isUser ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`space-y-1.5 max-w-[85%] sm:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    isUser
                      ? 'bg-black text-white dark:bg-white dark:text-black rounded-tr-none shadow-sm font-medium'
                      : 'bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-none space-y-2 whitespace-pre-line shadow-sm'
                  }`}>
                    {msg.content}
                  </div>

                  <div className={`flex items-center gap-2 px-1 text-[10px] font-mono text-zinc-400 dark:text-zinc-500 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopyMessage(msg.content, index)}
                        className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors flex items-center gap-1 cursor-pointer"
                        title="Copy answer"
                      >
                        {copiedIndex === index ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedIndex === index ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-none bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-zinc-400 animate-pulse" />
                <span>Evaluating Indian education & industry datasets...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Starter Chips */}
        {messages.length <= 2 && !isLoading && (
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">Suggested Questions:</span>
            <div className="flex flex-wrap gap-2">
              {starterChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip)}
                  className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all text-left cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Input Box Fixed at Bottom */}
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 p-2 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 shadow-xl focus-within:border-zinc-500"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about entrance exams, salary realities, syllabus, or transition steps..."
            disabled={isLoading}
            className="flex-1 bg-transparent px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="p-2.5 rounded-xl bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 disabled:opacity-30 disabled:hover:bg-black dark:disabled:hover:bg-white transition-all flex items-center justify-center cursor-pointer shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center mt-2 font-mono">
          AI answers are grounded in the Holland RIASEC model & accredited Indian examination pathways.
        </p>
      </div>

    </div>
  );
};
