import React, { useState } from 'react';
import { 
  MessageSquare, 
  Star, 
  Send, 
  CheckCircle2
} from 'lucide-react';
import { FeedbackSubmission } from '../../types';

interface FeedbackViewProps {
  onSubmitFeedback: (feedback: FeedbackSubmission) => void;
  onBack: () => void;
  userEmail?: string;
}

export const FeedbackView: React.FC<FeedbackViewProps> = ({
  onSubmitFeedback,
  onBack,
  userEmail,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [category, setCategory] = useState<FeedbackSubmission['category']>('recommendations');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState(userEmail || '');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const submission: FeedbackSubmission = {
      id: 'fb_' + Date.now(),
      rating,
      category,
      message: message.trim(),
      email: email.trim() || undefined,
      timestamp: new Date().toISOString(),
    };

    onSubmitFeedback(submission);
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 min-h-screen pb-24 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-black dark:selection:text-white transition-colors duration-200">
      
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50/80 dark:bg-black/60 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <MessageSquare className="w-4 h-4" />
            <span>Continuous Product Calibration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Send Feedback
          </h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Help us calibrate psychometric scoring precision and Indian education pathway relevance.
          </p>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        {submitted ? (
          <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-6 animate-in fade-in duration-200 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                Thank You for Your Feedback
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Your observations directly assist our team in refining RIASEC dimension weighting and institutional recommendations.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onBack}
                className="px-6 py-2.5 rounded-full bg-black text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white text-xs font-semibold cursor-pointer shadow-sm"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-xl">
            
            {/* Star Rating */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Overall Assessment & Pathway Accuracy Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 text-zinc-400 dark:text-zinc-600 hover:text-amber-500 transition-colors cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        (hoverRating !== null ? star <= hoverRating : star <= rating)
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-zinc-300 dark:text-zinc-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 ml-2">
                  {rating}/5 Stars
                </span>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Feedback Focus Area
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'recommendations', label: 'Recommendations Quality' },
                  { id: 'questions', label: 'Question Clarity' },
                  { id: 'parent_report', label: 'Parent Report' },
                  { id: 'counsellor', label: 'AI Counsellor' },
                  { id: 'other', label: 'Other Suggestions' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id as FeedbackSubmission['category'])}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                      category === item.id
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-sm'
                        : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Textarea */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Detailed Feedback & Observations *
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe any pathways that felt especially accurate or inaccurate, or specific entrance exam realities we should refine..."
                required
                className="w-full p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-zinc-500 leading-relaxed"
              />
            </div>

            {/* Optional Email */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Contact Email (Optional for follow-up)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-200 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!message.trim()}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-tight transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                  message.trim()
                    ? 'bg-black text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Feedback</span>
              </button>
            </div>

          </form>
        )}
      </main>
    </div>
  );
};
