import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  ArrowRight, 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  X
} from 'lucide-react';
import { SavedCareerItem, SupportedLanguage, Recommendation } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';

interface SavedCareersViewProps {
  savedCareers: SavedCareerItem[];
  onRemoveCareer: (careerId: string) => void;
  onNavigateToReport: () => void;
  onOpenAICounsellor: (careerTitle?: string) => void;
  language: SupportedLanguage;
}

export const SavedCareersView: React.FC<SavedCareersViewProps> = ({
  savedCareers,
  onRemoveCareer,
  onNavigateToReport,
  onOpenAICounsellor,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleCompareSelect = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter((i) => i !== id));
    } else {
      if (selectedForCompare.length < 2) {
        setSelectedForCompare([...selectedForCompare, id]);
      } else {
        setSelectedForCompare([selectedForCompare[1], id]);
      }
    }
  };

  const compareCareers = savedCareers
    .filter((sc) => selectedForCompare.includes(sc.careerId))
    .map((sc) => sc.recommendation);

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen pb-24 selection:bg-blue-600/30 selection:text-blue-200">
      
      {/* Header */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
              <span>Pathways Tracked</span>
              <span>·</span>
              <span>{savedCareers.length} directions shortlisted</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              {t.nav_saved_careers}
            </h1>
          </div>

          {savedCareers.length >= 2 && (
            <button
              onClick={() => {
                if (selectedForCompare.length === 2) {
                  setShowCompareModal(true);
                } else {
                  setSelectedForCompare(savedCareers.slice(0, 2).map((s) => s.careerId));
                  setShowCompareModal(true);
                }
              }}
              className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-medium tracking-tight transition-all flex items-center gap-2"
            >
              <Scale className="w-3.5 h-3.5 text-blue-400" />
              <span>Compare Pathways ({selectedForCompare.length}/2 Selected)</span>
            </button>
          )}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Empty State */}
        {savedCareers.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mx-auto">
              <Bookmark className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading text-xl font-bold text-zinc-100">
                {t.saved_empty}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {t.saved_empty_sub}
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onNavigateToReport}
                className="px-6 py-2.5 rounded-full bg-zinc-100 text-zinc-950 hover:bg-white text-xs font-semibold tracking-tight transition-all inline-flex items-center gap-1.5"
              >
                <span>View My Recommendations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedCareers.map((item) => {
                const rec = item.recommendation;
                const isSelectedForCompare = selectedForCompare.includes(item.careerId);

                return (
                  <div
                    key={item.id}
                    className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-6 ${
                      isSelectedForCompare
                        ? 'bg-zinc-900 border-blue-500 shadow-lg'
                        : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="space-y-4">
                      
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-900 text-xs font-mono font-bold">
                            {rec.fitScore}% FIT
                          </span>
                          {rec.transitionLabel && (
                            <span className="text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                              {rec.transitionLabel}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleCompareSelect(item.careerId)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-colors ${
                              isSelectedForCompare
                                ? 'bg-blue-600 text-white font-semibold'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            {isSelectedForCompare ? 'Selected' : 'Compare'}
                          </button>

                          <button
                            type="button"
                            onClick={() => onRemoveCareer(item.careerId)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 transition-colors"
                            title="Remove from saved"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Title & Chain */}
                      <div>
                        <h3 className="font-heading text-xl font-bold text-zinc-100">
                          {rec.career.title}
                        </h3>
                        <p className="text-xs font-mono text-zinc-400 mt-1">
                          {rec.reasoningChain}
                        </p>
                      </div>

                      {/* Why this */}
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {rec.whyThis}
                      </p>

                      {/* Key Pathway Details */}
                      <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs">
                        <div className="flex items-center justify-between text-zinc-400 font-mono text-[11px]">
                          <span>Indian Entrance Route:</span>
                          <span className="text-zinc-200">{rec.indianExams.join(', ') || 'Direct Merit'}</span>
                        </div>
                        <div className="flex items-center justify-between text-zinc-400 font-mono text-[11px]">
                          <span>Time to Entry:</span>
                          <span className="text-zinc-200">{rec.estimatedDuration}</span>
                        </div>
                        <div className="flex items-center justify-between text-zinc-400 font-mono text-[11px]">
                          <span>Est. Income Range:</span>
                          <span className="text-emerald-400">{rec.career.incomeRange}</span>
                        </div>
                      </div>

                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-400">
                        Saved on {new Date(item.savedAt).toLocaleDateString()}
                      </span>

                      <button
                        onClick={() => onOpenAICounsellor(rec.career.title)}
                        className="px-3.5 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3 h-3 text-blue-400" />
                        <span>Discuss with AI</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* SIDE-BY-SIDE COMPARISON MODAL                                             */}
      {/* ========================================================================= */}
      {showCompareModal && compareCareers.length === 2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-400" />
                <h3 className="font-heading text-lg font-bold text-zinc-100">
                  Side-by-Side Pathway Comparison
                </h3>
              </div>

              <button
                onClick={() => setShowCompareModal(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {compareCareers.map((c, i) => (
                <div key={c.career.id} className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-blue-400 font-semibold">
                        Option {i + 1}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 text-xs font-mono font-bold">
                        {c.fitScore}% FIT
                      </span>
                    </div>
                    <h4 className="font-heading text-lg font-bold text-zinc-100 mt-1">
                      {c.career.title}
                    </h4>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="font-mono text-[10px] text-zinc-400 uppercase">Degree & Route</span>
                      <p className="text-zinc-200 mt-0.5">{c.howYouGetThere}</p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] text-zinc-400 uppercase">Entrance Exams</span>
                      <p className="text-zinc-200 mt-0.5">{c.indianExams.join(', ') || 'Direct Merit / Portfolio'}</p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] text-zinc-400 uppercase">Estimated Duration</span>
                      <p className="text-zinc-200 mt-0.5">{c.estimatedDuration}</p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] text-zinc-400 uppercase">Estimated Compensation</span>
                      <p className="text-emerald-400 font-mono mt-0.5">{c.career.incomeRange}</p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] text-zinc-400 uppercase">Day-to-Day Reality</span>
                      <p className="text-zinc-300 italic text-[11px] mt-0.5 leading-relaxed bg-zinc-900 p-2.5 rounded-lg border border-zinc-800">
                        “{c.whatItIsActuallyLike}”
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-6 py-2 rounded-full bg-zinc-100 text-zinc-950 hover:bg-white text-xs font-semibold"
              >
                Close Comparison
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
