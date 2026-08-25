import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Bookmark, 
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
  SavedCareerItem 
} from '../../types';

interface DashboardViewProps {
  profile: UserProfile;
  result: AssessmentResult;
  recommendations: Recommendation[];
  savedCareers: SavedCareerItem[];
  onNavigate: (tab: string) => void;
  onRetakeAssessment: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  result,
  recommendations,
  savedCareers,
  onNavigate,
  onRetakeAssessment,
}) => {
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

  const primaryDim = result.topDimensions?.[0] || 'Investigative';
  const primaryScore = result.scores?.[primaryDim] || { interestScore: 75, confidenceScore: 70, gap: 5, classification: 'Aligned' };
  const latentDim = result.highestLatentDimension;
  const latentScore = latentDim && result.scores ? result.scores[latentDim] : null;

  const topRec = recommendations?.[0];
  const actionSteps = [
    {
      week: 'Week 1',
      title: 'Pathway Mapping',
      description: `Research top 3 accredited Indian institutions and entrance eligibility for ${topRec?.career.title || 'your top pathway'}.`,
      actionItem: 'Download official syllabus',
    },
    {
      week: 'Week 2',
      title: 'Informational Dialogue',
      description: 'Reach out to at least one working practitioner with 3–5 years experience to understand daily routine realities.',
      actionItem: 'Conduct 1 informational interview',
    },
    {
      week: 'Week 3',
      title: 'Micro-Project Experiment',
      description: 'Complete a 7-day mini-project or open course module to test your day-to-day engagement with the work.',
      actionItem: 'Complete 1 course module or project',
    },
    {
      week: 'Week 4',
      title: 'Evidence Review',
      description: 'Review practical learnings, consult family, and finalize entrance exam coaching or portfolio development schedule.',
      actionItem: 'Finalize admission or prep plan',
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 min-h-screen pb-24 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-black dark:selection:text-white transition-colors duration-200">
      
      {/* Header Banner */}
      <div className="border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50/80 dark:bg-black/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <span className="px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-800 uppercase text-[10px]">
                {profile.segment.replace('_', ' ')}
              </span>
              <span>·</span>
              <span>Holland Code: <strong className="text-zinc-900 dark:text-white font-mono">{result.hollandCode}</strong></span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Welcome back, {profile.name}
            </h1>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl">
              {result.headline}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('counsellor')}
              className="px-4 py-2 rounded-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-xs font-semibold tracking-tight transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Counsellor</span>
            </button>

            <button
              onClick={() => onNavigate('report')}
              className="px-4 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium tracking-tight transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              <span>Full Report</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Primary RIASEC Match */}
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 flex flex-col justify-between space-y-4 shadow-sm">
            <div>
              <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Primary Archetype
              </span>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white mt-1">
                {primaryDim} ({primaryScore?.interestScore}%)
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                Your highest psychological interest pull is oriented toward {primaryDim.toLowerCase()} activities.
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              <span>Code: {result.hollandCode}</span>
              <button 
                onClick={() => onNavigate('report')} 
                className="text-zinc-900 dark:text-white hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <span>View Hexagon</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 2: Latent Gap Status */}
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 flex flex-col justify-between space-y-4 shadow-sm">
            <div>
              <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Gap Signal
              </span>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white mt-1">
                {latentScore && latentScore.gap > 20
                  ? `Latent: ${latentDim} (+${latentScore.gap})`
                  : `Calibrated & Balanced`}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                {latentScore && latentScore.gap > 20
                  ? `Interest exceeds confidence significantly. This area merits low-risk testing before dismissal.`
                  : `Your confidence matches your intrinsic interest well across primary dimensions.`}
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              <span>Interest vs Confidence</span>
              <button 
                onClick={() => onNavigate('report')} 
                className="text-zinc-900 dark:text-white hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <span>Inspect Gaps</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 3: Saved Pathways */}
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 flex flex-col justify-between space-y-4 shadow-sm">
            <div>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Saved Directions
              </span>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white mt-1">
                {savedCareers.length} Pathways Bookmarked
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                Track your shortlisted entrance examinations, degree prerequisites, and institutional milestones.
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              <span>Shortlisted</span>
              <button 
                onClick={() => onNavigate('saved_careers')} 
                className="text-zinc-900 dark:text-white hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <span>View Saved</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Top 3 Career Pathways Preview */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
                Top Matched Career Pathways
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Grounded in your Holland RIASEC code ({result.hollandCode}) and {profile.segment.replace('_', ' ')} parameters
              </p>
            </div>

            <button
              onClick={() => onNavigate('report')}
              className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All Recommendations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.slice(0, 3).map((rec, idx) => (
              <div
                key={rec.career.id}
                className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                      Rank #{idx + 1} Match
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">
                      {rec.fitScore}%
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                    {rec.career.title}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                    {rec.whyThis}
                  </p>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">Entry Route:</span>
                      <span className="text-zinc-900 dark:text-zinc-200 font-medium truncate max-w-[140px]" title={rec.howYouGetThere}>
                        {rec.career.courses?.[0] || rec.howYouGetThere}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">Key Entrance:</span>
                      <span className="text-zinc-900 dark:text-zinc-200 font-mono truncate max-w-[140px]">
                        {rec.indianExams?.[0] || rec.career.exams?.[0] || 'Direct Admission / Merit'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-900 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('report')}
                    className="text-xs font-semibold text-zinc-900 dark:text-white hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Roadmap</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 30-Day Action Milestone Checklist */}
        <section className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-900 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h2 className="text-base font-bold text-zinc-950 dark:text-white">
                  30-Day Execution Roadmap
                </h2>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Break the analysis into immediate weekly tangible actions
              </p>
            </div>

            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              {Object.values(completedActions).filter(Boolean).length} of 4 Milestones Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {actionSteps.map((step, idx) => {
              const weekKey = `week_${idx + 1}`;
              const isChecked = completedActions[weekKey];
              return (
                <div
                  key={step.week}
                  onClick={() => toggleAction(weekKey)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isChecked
                      ? 'bg-white dark:bg-zinc-900 border-zinc-400 dark:border-zinc-700 shadow-sm'
                      : 'bg-white/50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-900 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {step.week}
                      </span>
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-zinc-400" />
                      )}
                    </div>
                    <h3 className="text-xs font-semibold text-zinc-950 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] text-zinc-500 font-mono">
                    Milestone: {step.actionItem}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
};
