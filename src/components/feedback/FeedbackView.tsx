import React, { useState } from 'react';
import { 
  MessageSquare, 
  Star, 
  Send, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';
import { FeedbackSubmission, SupportedLanguage } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';

interface FeedbackViewProps {
  onSubmitFeedback: (feedback: FeedbackSubmission) => void;
  onBack: () => void;
  language: SupportedLanguage;
  userEmail?: string;
}

export const FeedbackView: React.FC<FeedbackViewProps> = ({
  onSubmitFeedback,
  onBack,
  language,
  userEmail,
}) => {
  const t = TRANSLATIONS[language];
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
    <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen pb-24 selection:bg-blue-600/30 selection:text-blue-200">
      
      {/* Header */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
            <MessageSquare className="w-4 h-4" />
            <span>Continuous Product Calibration</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            {t.nav_feedback}
          </h1>
          <p className="text-xs text-zinc-400">
            Help us calibrate psychometric scoring precision and Indian education pathway relevance.
          </p>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        {submitted ? (
          <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-center space-y-6 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading text-xl font-bold text-zinc-100">
                Thank You for Your Feedback
              </h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Your observations directly assist our team in refining RIASEC dimension weighting and institutional recommendations.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onBack}
                className="px-6 py-2.5 rounded-full bg-zinc-100 text-zinc-950 hover:bg-white text-xs font-semibold"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-xl">
            
            {/* Star Rating */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-300">
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
                    className="p-1 text-zinc-600 hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        (hoverRating !== null ? star <= hoverRating : star <= rating)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-zinc-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono text-zinc-400 ml-2">
                  {rating}/5 Stars
                </span>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-300">
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
                    className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                      category === item.id
                        ? 'bg-blue-950/60 border-blue-500 text-white'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Textarea */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-300">
                Detailed Feedback & Observations *
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe any pathways that felt especially accurate or inaccurate, or specific entrance exam realities we should refine..."
                required
                className="w-full p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>

            {/* Optional Email */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-300">
                Contact Email (Optional for follow-up)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-zinc-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!message.trim()}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-tight transition-all flex items-center gap-2 ${
                  message.trim()
                    ? 'bg-zinc-100 text-zinc-950 hover:bg-white'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
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
