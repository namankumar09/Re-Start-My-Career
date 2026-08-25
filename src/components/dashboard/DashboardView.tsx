import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Bookmark, 
  RotateCcw, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  TrendingUp, 
  Compass, 
  Users,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { 
  UserProfile, 
  AssessmentResult, 
  Recommendation, 
  SavedCareerItem, 
  SupportedLanguage 
} from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { HexagonSVG } from '../common/HexagonSVG';

interface DashboardViewProps {
  profile: UserProfile;
  result: AssessmentResult;
  recommendations: Recommendation[];
  savedCareers: SavedCareerItem[];
  onNavigate: (tab: string) => void;
  onRetakeAssessment: () => void;
  language: SupportedLanguage;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  result,
  recommendations,
  savedCareers,
  onNavigate,
  onRetakeAssessment,
  language,
}) => {
  const t = TRANSLATIONS[language];

  // 30-day checklist interactive state
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({
    'week_1': true,
    'week_2': false,
    'week_3': false,
    'week_4': false,
  });

  const toggleAction = (key: string) => {
    setCompletedActions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const primaryDim = result.topDimensions[0];
  const primaryScore = result.scores[primaryDim];
  const latentDim = result.highestLatentDimension;
  const latentScore = latentDim ? result.scores[latentDim] : null;

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen pb-24 selection:bg-blue-600/30 selection:text-blue-200">
      
      {/* Header Banner */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 uppercase">
                {profile.segment.replace('_', ' ')}
              </span>
              <span>·</span>
              <span>Holland Code: <strong className="text-blue-400 font-mono">{result.hollandCode}</strong></span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              Welcome back, {profile.name}
            </h1>
            <p className="text-xs text-zinc-400 max-w-xl">
              {result.headline}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('counsellor')}
              className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold tracking-tight transition-all flex items-center gap-2 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Counsellor</span>
            </button>

            <button
              onClick={() => onNavigate('report')}
              className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-medium tracking-tight transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-400" />
              <span>Full Report</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Primary RIASEC Match */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">
                Primary Archetype
              </span>
              <h3 className="font-heading text-xl font-bold text-zinc-100 mt-1">
                {primaryDim} ({primaryScore?.interestScore}%)
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Your highest psychological interest pull is oriented toward {primaryDim.toLowerCase()} activities.
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Code: {result.hollandCode}</span>
              <button 
                onClick={() => onNavigate('report')} 
                className="text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>View Holland Hexagon</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 2: Latent Gap Status */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                Gap Signal
              </span>
              <h3 className="font-heading text-xl font-bold text-zinc-100 mt-1">
                {latentScore && latentScore.gap > 20
                  ? `Latent: ${latentDim} (+${latentScore.gap})`
                  : `Calibrated & Balanced`}
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {latentScore && latentScore.gap > 20
                  ? `Interest exceeds confidence significantly. This area merits low-risk testing before dismissal.`
                  : `Your confidence matches your intrinsic interest well across primary dimensions.`}
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Interest vs Confidence</span>
              <button 
                onClick={() => onNavigate('report')} 
                className="text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Inspect Gap Analysis</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 3: Saved Pathways */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                Saved Directions
              </span>
              <h3 className="font-heading text-xl font-bold text-zinc-100 mt-1">
                {savedCareers.length} Pathways Bookmarked
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Track your shortlisted entrance examinations, degree prerequisites, and institutional milestones.
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Shortlisted</span>
              <button 
                onClick={() => onNavigate('saved_careers')} 
                className="text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Open Saved List</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Central Two-Column Grid: Top Recommendations & 30-Day Execution Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Top Recommendations (7 Columns) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-zinc-100">
                Top Recommended Directions
              </h3>
              <button
                onClick={() => onNavigate('report')}
                className="text-xs text-blue-400 hover:underline font-mono"
              >
                View all ({recommendations.length})
              </button>
            </div>

            <div className="space-y-3">
              {recommendations.slice(0, 3).map((rec, idx) => (
                <div
                  key={rec.career.id}
                  onClick={() => onNavigate('report')}
                  className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-900">
                        {rec.fitScore}% FIT
                      </span>
                      <h4 className="text-sm font-bold text-zinc-100 group-hover:text-blue-300 transition-colors">
                        {rec.career.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {rec.estimatedDuration}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {rec.whyThis}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1">
                    <span>Exams: {rec.indianExams.slice(0, 2).join(', ') || 'Direct Merit'}</span>
                    <span className="text-emerald-400">{rec.career.incomeRange}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 30-Day Action Plan Checklist (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-zinc-100">
                Next 30 Days Action Tracker
              </h3>
              <span className="text-xs font-mono text-zinc-400">4-Week Sprints</span>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="space-y-3">
                
                {/* Step 1 */}
                <div
                  onClick={() => toggleAction('week_1')}
                  className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 cursor-pointer flex items-start gap-3 hover:border-zinc-700 transition-colors"
                >
                  {completedActions['week_1'] ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="text-[11px] font-mono text-blue-400 font-semibold">Week 1 · Pathway Mapping</span>
                    <p className="text-xs text-zinc-300 mt-0.5">
                      Review syllabus and eligibility for 3 accredited colleges.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div
                  onClick={() => toggleAction('week_2')}
                  className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 cursor-pointer flex items-start gap-3 hover:border-zinc-700 transition-colors"
                >
                  {completedActions['week_2'] ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="text-[11px] font-mono text-blue-400 font-semibold">Week 2 · Informational Dialogue</span>
                    <p className="text-xs text-zinc-300 mt-0.5">
                      Conduct one informal chat with someone working in this role.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div
                  onClick={() => toggleAction('week_3')}
                  className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 cursor-pointer flex items-start gap-3 hover:border-zinc-700 transition-colors"
                >
                  {completedActions['week_3'] ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="text-[11px] font-mono text-blue-400 font-semibold">Week 3 · 7-Day Micro Experiment</span>
                    <p className="text-xs text-zinc-300 mt-0.5">
                      Complete a 7-day mini-project to test day-to-day engagement.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div
                  onClick={() => toggleAction('week_4')}
                  className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 cursor-pointer flex items-start gap-3 hover:border-zinc-700 transition-colors"
                >
                  {completedActions['week_4'] ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="text-[11px] font-mono text-blue-400 font-semibold">Week 4 · Decision & Family Dialogue</span>
                    <p className="text-xs text-zinc-300 mt-0.5">
                      Review results and share the Parent Report with your family.
                    </p>
                  </div>
                </div>

              </div>

              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Progress: {Object.values(completedActions).filter(Boolean).length}/4 Done</span>
                <button
                  onClick={() => onNavigate('report')}
                  className="text-blue-400 hover:underline"
                >
                  View full plan
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Retake and Reset Banner */}
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <h4 className="text-xs font-semibold text-zinc-200">
              Evolving interests or change in life situation?
            </h4>
            <p className="text-[11px] text-zinc-400">
              You can retake the assessment anytime to recalculate your RIASEC codes and recommendations.
            </p>
          </div>

          <button
            onClick={onRetakeAssessment}
            className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>
        </div>

      </main>
    </div>
  );
};
