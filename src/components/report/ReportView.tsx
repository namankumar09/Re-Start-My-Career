import React, { useState } from 'react';
import { 
  FileText, 
  Users, 
  Bookmark, 
  BookmarkCheck, 
  Printer, 
  Copy, 
  Check, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ExternalLink,
  Shield,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { 
  AssessmentResult, 
  UserProfile, 
  Recommendation, 
  RIASECDimension 
} from '../../types';
import { HexagonSVG } from '../common/HexagonSVG';
import { SCHOLARSHIPS_DATA } from '../../data/scholarships';

interface ReportViewProps {
  result: AssessmentResult;
  profile: UserProfile;
  recommendations: Recommendation[];
  savedCareerIds: string[];
  onToggleSaveCareer: (career: Recommendation) => void;
  onOpenAICounsellor: () => void;
  onRetakeAssessment: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  result,
  profile,
  recommendations,
  savedCareerIds,
  onToggleSaveCareer,
  onOpenAICounsellor,
  onRetakeAssessment,
}) => {
  const [audienceMode, setAudienceMode] = useState<'for_you' | 'for_parents'>('for_you');
  const [expandedRecId, setExpandedRecId] = useState<string | null>(recommendations[0]?.career.id || null);
  const [copiedParentReport, setCopiedParentReport] = useState(false);
  const [selectedHexDimension, setSelectedHexDimension] = useState<RIASECDimension | null>(null);

  // Highest latent or top primary dimension
  const primaryDim = result?.topDimensions?.[0] || 'Investigative';
  const primaryScore = result?.scores?.[primaryDim] || { interestScore: 75, confidenceScore: 70, gap: 5, classification: 'Aligned' as const };
  const latentDim = result?.highestLatentDimension;
  const latentScore = latentDim && result?.scores ? result.scores[latentDim] : null;

  // Filter scholarships based on user optional category/income
  const matchedOpportunities = SCHOLARSHIPS_DATA.filter((opp) => {
    if (profile.reservationCategory && opp.categoryMatch.includes(profile.reservationCategory)) {
      return true;
    }
    if (profile.annualFamilyIncome && opp.incomeEligibility.includes(profile.annualFamilyIncome)) {
      return true;
    }
    return opp.categoryMatch.includes('General');
  }).slice(0, 3);

  // Watch-outs tailored to profile
  const watchouts = generateWatchouts(result, profile);

  // 30 Days Action Plan
  const actionPlan = generate30DaysPlan(result, profile, recommendations[0]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyParentReport = () => {
    const text = generateParentReportText(result, profile, recommendations);
    navigator.clipboard.writeText(text);
    setCopiedParentReport(true);
    setTimeout(() => setCopiedParentReport(false), 2500);
  };

  return (
    <div className="w-full bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 min-h-screen pb-24 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-black dark:selection:text-white transition-colors duration-200">
      
      {/* Top Header & Audience Toggle */}
      <div className="border-b border-zinc-200 dark:border-zinc-900 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-16 z-30 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <span>{profile.name}</span>
              <span>·</span>
              <span className="uppercase">{profile.segment.replace('_', ' ')}</span>
              <span>·</span>
              <span>Code: <strong className="text-zinc-900 dark:text-white font-mono">{result.hollandCode}</strong></span>
            </div>
            <h1 className="text-lg font-bold text-zinc-950 dark:text-white tracking-tight">
              {audienceMode === 'for_you' ? 'Candidate Psychometric Intelligence Report' : 'Family Summary Report'}
            </h1>
          </div>

          {/* Audience Toggle (For you vs For your parents) */}
          <div className="inline-flex p-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-inner">
            <button
              onClick={() => setAudienceMode('for_you')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all flex items-center gap-1.5 cursor-pointer ${
                audienceMode === 'for_you'
                  ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>For You</span>
            </button>

            <button
              onClick={() => setAudienceMode('for_parents')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all flex items-center gap-1.5 cursor-pointer ${
                audienceMode === 'for_parents'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>For Your Parents</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. CANDIDATE REPORT (FOR YOU)                                             */}
        {/* ========================================================================= */}
        {audienceMode === 'for_you' && (
          <div className="space-y-16 animate-in fade-in duration-200">
            
            {/* 1. HEADLINE */}
            <div className="space-y-3 pt-4">
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                01 · Core Directional Signal
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">
                “{result.headline}”
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed">
                Derived from your 24 response signals across 6 RIASEC archetypes. Primary alignment: <strong className="text-zinc-900 dark:text-zinc-200">{result.topDimensions.join(' · ')}</strong>.
              </p>
            </div>

            {/* 2. FULL-WIDTH GAP PANEL */}
            <div className="rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Gap Analysis (Interest vs Confidence)
                  </span>
                  <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                    {latentScore && latentScore.gap > 20
                      ? `Latent Signal in ${latentDim}`
                      : `Calibrated Harmony across ${primaryDim}`}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-medium ${
                    latentScore && latentScore.gap > 20
                      ? 'bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/80 text-amber-800 dark:text-amber-300'
                      : 'bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300'
                  }`}>
                    {latentScore && latentScore.gap > 20 ? 'Latent Interest Detected' : 'Interest & Confidence Aligned'}
                  </span>
                </div>
              </div>

              {/* Numerical Metrics Triple Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">Interest (Pull)</span>
                  <div className="text-3xl font-mono font-bold text-zinc-950 dark:text-white mt-1">
                    {latentScore ? latentScore.interestScore : primaryScore?.interestScore || 85}%
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Intrinsic curiosity and focus</p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">Confidence (Self-Belief)</span>
                  <div className="text-3xl font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    {latentScore ? latentScore.confidenceScore : primaryScore?.confidenceScore || 80}%
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Current perceived execution readiness</p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">Measured Gap</span>
                  <div className={`text-3xl font-mono font-bold mt-1 ${
                    (latentScore?.gap || 0) > 20 ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-700 dark:text-zinc-200'
                  }`}>
                    {(latentScore?.gap || 0) > 0 ? `+${latentScore?.gap}` : latentScore?.gap || '+5'}
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Interest score minus confidence score</p>
                </div>
              </div>

              {/* Calibrated Interpretation Narrative */}
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/90 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {latentScore && latentScore.gap > 20 ? (
                  <p>
                    You are pulled toward <strong className="text-amber-700 dark:text-amber-300 font-semibold">{latentDim}</strong> work far harder than you believe you are capable of it (Interest: {latentScore.interestScore} vs Confidence: {latentScore.confidenceScore}, Gap: +{latentScore.gap}). That gap is almost never about natural cognitive ability — it is about never having been encouraged in that direction. This is the direction most likely to be quietly abandoned, and the one worth testing first with low-risk micro-experiments.
                  </p>
                ) : (
                  <p>
                    Your interest and confidence are closely aligned across your primary dimensions (Interest: {primaryScore?.interestScore}% vs Confidence: {primaryScore?.confidenceScore}%). You are not fighting yourself in this direction — what attracts you is broadly consistent with what you believe you can do. Your main objective is disciplined execution on established Indian degree and entrance routes.
                  </p>
                )}
              </div>
            </div>

            {/* 3. HOLLAND RIASEC PROFILE & HEXAGON */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80">
              <div className="lg:col-span-6 flex justify-center">
                <HexagonSVG 
                  scores={result.scores} 
                  size={360} 
                  interactive={true} 
                  onDimensionClick={(dim) => setSelectedHexDimension(dim)}
                  selectedDimension={selectedHexDimension}
                />
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                    03 · Holland Code {result.hollandCode}
                  </span>
                  <h3 className="text-2xl font-bold text-zinc-950 dark:text-white">
                    Dimensional Breakdown
                  </h3>
                </div>

                <div className="space-y-2 pt-2">
                  {result.topDimensions.map((dim, idx) => {
                    const score = result.scores[dim];
                    return (
                      <div 
                        key={dim}
                        onClick={() => setSelectedHexDimension(dim)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          selectedHexDimension === dim 
                            ? 'bg-zinc-200 dark:bg-zinc-800 border-black dark:border-white shadow-sm' 
                            : 'bg-white dark:bg-zinc-950/80 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                            {idx + 1}. {dim}
                          </span>
                          <span className="font-mono text-zinc-500 dark:text-zinc-400 text-[11px]">
                            Interest: <span className="text-zinc-900 dark:text-white font-semibold">{score.interestScore}%</span> · Confidence: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{score.confidenceScore}%</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1">
                          {getDimensionSummary(dim)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 pt-2 font-mono">
                  Tip: Click any dimension on the hexagon or list above to inspect specific alignment.
                </p>
              </div>
            </div>

            {/* 4. RANKED CAREER RECOMMENDATIONS */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                    04 · Pathways Mapped
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white mt-1">
                    Ranked Career Pathways
                  </h3>
                </div>
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  {recommendations.length} Verified Indian Routes
                </span>
              </div>

              <div className="space-y-4">
                {recommendations.map((rec) => {
                  const isExpanded = expandedRecId === rec.career.id;
                  const isSaved = savedCareerIds.includes(rec.career.id);

                  return (
                    <div
                      key={rec.career.id}
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isExpanded
                          ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-400 dark:border-zinc-700 shadow-xl'
                          : 'bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-700'
                      }`}
                    >
                      {/* Card Header */}
                      <div
                        onClick={() => setExpandedRecId(isExpanded ? null : rec.career.id)}
                        className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-mono font-bold">
                              {rec.fitScore}% FIT
                            </span>
                            {rec.transitionLabel && (
                              <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-mono border border-zinc-200 dark:border-zinc-700">
                                {rec.transitionLabel}
                              </span>
                            )}
                            {rec.career.isPcbMedical && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono">
                                Medical / PCB Track
                              </span>
                            )}
                          </div>
                          
                          <h4 className="text-xl font-bold text-zinc-950 dark:text-white">
                            {rec.career.title}
                          </h4>

                          <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                            <span>Reasoning Chain:</span>{' '}
                            <span className="text-zinc-900 dark:text-zinc-200 font-semibold">{rec.reasoningChain}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleSaveCareer(rec);
                            }}
                            className={`p-2.5 rounded-full border text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                              isSaved
                                ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                                : 'bg-zinc-100 dark:bg-zinc-800/80 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white'
                            }`}
                            title={isSaved ? 'Remove from saved' : 'Save career'}
                          >
                            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                            <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save Career'}</span>
                          </button>

                          <div className="text-zinc-500 dark:text-zinc-400 p-1">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </div>
                      </div>

                      {/* Expandable Body */}
                      {isExpanded && (
                        <div className="px-6 pb-6 pt-2 border-t border-zinc-200 dark:border-zinc-800/60 space-y-6 text-xs text-zinc-700 dark:text-zinc-300">
                          
                          {/* Why this */}
                          <div>
                            <h5 className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                              Why This Direction
                            </h5>
                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                              {rec.whyThis}
                            </p>
                          </div>

                          {/* How you get there */}
                          <div>
                            <h5 className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                              How You Get There (Indian Pathway)
                            </h5>
                            <p className="text-zinc-900 dark:text-zinc-200 font-mono text-[11px] bg-white dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 leading-relaxed">
                              {rec.howYouGetThere}
                            </p>
                          </div>

                          {/* What it is actually like */}
                          <div>
                            <h5 className="font-mono text-[11px] text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                              What It Is Actually Like (Day-to-Day Reality ~5 Years In)
                            </h5>
                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed italic bg-zinc-100/60 dark:bg-zinc-950/40 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800/60">
                              “{rec.whatItIsActuallyLike}”
                            </p>
                          </div>

                          {/* Details Grid: Exams, Institutions, Duration, Comp */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                            <div className="p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                              <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase">Key Indian Exams</span>
                              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 mt-1">
                                {rec.indianExams.join(', ') || 'Merit / Portfolio'}
                              </p>
                            </div>

                            <div className="p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                              <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase">Premier Institutions</span>
                              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 mt-1 line-clamp-2">
                                {rec.institutions.slice(0, 3).join(', ')}
                              </p>
                            </div>

                            <div className="p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                              <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase">Time to Entry</span>
                              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 mt-1">
                                {rec.estimatedDuration}
                              </p>
                            </div>

                            <div className="p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                              <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase">Est. Income Range</span>
                              <p className="text-xs font-semibold text-zinc-950 dark:text-zinc-100 mt-1">
                                {rec.career.incomeRange}
                              </p>
                            </div>
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. WATCH-OUTS & REALITIES */}
            <div className="space-y-4 pt-4">
              <div>
                <span className="text-xs font-mono text-red-600 dark:text-red-400 uppercase tracking-widest">
                  05 · Candid Realities
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mt-1">
                  Watch-Outs & Trade-Offs
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {watchouts.map((w, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-red-600 dark:text-red-300">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500 dark:text-red-400 shrink-0" />
                      <span className="font-semibold">{w.title}</span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {w.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. NEXT 30 DAYS ACTION PLAN */}
            <div className="space-y-6 pt-4">
              <div>
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                  06 · Actionable Execution
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mt-1">
                  Next 30 Days Action Plan
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {actionPlan.map((step) => (
                  <div key={step.week} className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-sm">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700">
                        {step.week}
                      </span>
                      <span className="text-zinc-500 dark:text-zinc-400">{step.title}</span>
                    </div>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed pt-1">
                      {step.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. MATCHED OPPORTUNITIES & SCHOLARSHIPS */}
            {matchedOpportunities.length > 0 && (
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                      07 · Financial Support
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mt-1">
                      Matched Scholarships & Schemes
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    Indian Central & State Schemes
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {matchedOpportunities.map((opp) => (
                    <div key={opp.id} className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-4 shadow-sm">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
                          {opp.provider}
                        </span>
                        <h4 className="text-xs font-bold text-zinc-950 dark:text-zinc-100">
                          {opp.title}
                        </h4>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {opp.description}
                        </p>
                        <p className="text-xs text-emerald-700 dark:text-emerald-300 font-mono font-medium pt-1">
                          {opp.coverage}
                        </p>
                      </div>

                      <a
                        href={opp.applicationLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-between text-xs font-mono text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white pt-3 border-t border-zinc-200 dark:border-zinc-800 cursor-pointer"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions Banner */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-lg font-bold text-zinc-950 dark:text-white">
                  Have specific questions about this roadmap?
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Consult the AI Career Counsellor referencing your exact scores and Indian pathway constraints.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onRetakeAssessment}
                  className="px-4 py-2.5 rounded-full bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-300 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>

                <button
                  onClick={onOpenAICounsellor}
                  className="px-6 py-2.5 rounded-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-xs font-semibold tracking-tight transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Open AI Counsellor</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. PARENT REPORT (FOR YOUR PARENTS)                                       */}
        {/* ========================================================================= */}
        {audienceMode === 'for_parents' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            
            {/* Parent Header */}
            <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-medium">
                  Parent & Family Briefing
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyParentReport}
                    className="px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedParentReport ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedParentReport ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3 h-3" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                Career Direction Summary for {profile.name}
              </h2>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-3xl">
                This document is specifically structured to support constructive family discussion. It translates {profile.name}’s core strengths into recognized professional competencies, outlines established educational institutions and degree pathways, and highlights career stability.
              </p>
            </div>

            {/* Core Competencies */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-6">
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                Observed Core Strengths & Work Style
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                  <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">Reliability & Discipline</span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    Demonstrates sustained intellectual stamina for structured problem-solving, attention to detail, and methodical execution.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                  <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">Analytical Capability</span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    High natural affinity for first-principles reasoning, empirical evidence, and diagnostic troubleshooting.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                  <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">Professional Adaptability</span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    Strong capability to master modern computational tools, regulatory frameworks, and specialized domain knowledge.
                  </p>
                </div>
              </div>
            </div>

            {/* Recommended Established Pathways */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                Established Educational Routes & Employability Outlook
              </h3>

              <div className="space-y-4">
                {recommendations.slice(0, 3).map((rec, idx) => (
                  <div key={rec.career.id} className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-zinc-950 dark:text-white">
                        {idx + 1}. {rec.career.title}
                      </h4>
                      <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-medium">
                        {rec.career.incomeRange}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-700 dark:text-zinc-300">
                      <div>
                        <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">Degree & Entrance Route:</span>
                        <p className="text-zinc-900 dark:text-zinc-200 mt-0.5">{rec.howYouGetThere}</p>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">Recognized Institutions:</span>
                        <p className="text-zinc-900 dark:text-zinc-200 mt-0.5">{rec.institutions.slice(0, 3).join(', ')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What was left out of this version, and why */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                  Why this parent briefing is structured differently
                </h3>
              </div>

              <div className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  • <strong className="text-zinc-900 dark:text-zinc-200">Raw Numerical Scores were removed:</strong> Numerical test scores frequently invite unproductive debates about whether the assessment is "100% scientifically absolute" rather than encouraging constructive family planning about real educational options.
                </p>
                <p>
                  • <strong className="text-zinc-900 dark:text-zinc-200">Watch-Outs were removed:</strong> Candid self-reflective cautions can easily be misinterpreted as personal weakness or incapacity, whereas their true purpose is self-awareness and tactical risk mitigation.
                </p>
                <p>
                  • <strong className="text-zinc-900 dark:text-zinc-200">Structured Around Accredited Routes:</strong> The pathways shown here focus on accredited Indian entrance examinations, state/central universities, and proven corporate/public sector employment routes.
                </p>
              </div>
            </div>

            {/* One Small Ask */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-emerald-300 dark:border-emerald-900/60 space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <HelpCircle className="w-4 h-4" />
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                  One Small Ask for Parents
                </h3>
              </div>

              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                “Give {profile.name} <strong className="text-emerald-700 dark:text-emerald-300">one month</strong> to research these specific pathways properly, talk to at least two professionals working in these fields, and prepare an evidence-based roadmap before deciding that any direction is unrealistic.”
              </p>
            </div>

          </div>
        )}

      </main>
    </div>
  );
};

function getDimensionSummary(dim: RIASECDimension): string {
  switch (dim) {
    case 'Investigative':
      return 'Scientific inquiry, empirical research, data diagnosis, and first-principles modeling.';
    case 'Realistic':
      return 'Physical systems, instrumentation, engineering deployment, and hands-on reality.';
    case 'Artistic':
      return 'Creative craftsmanship, interaction architecture, storytelling, and visual synthesis.';
    case 'Social':
      return 'Clinical empathy, patient care, human coaching, and pedagogical development.';
    case 'Enterprising':
      return 'Commercial strategy, leadership execution, negotiation, and venture P&L growth.';
    case 'Conventional':
      return 'Regulatory compliance, statutory audit, risk governance, and structural precision.';
  }
}

function generateWatchouts(result: AssessmentResult, profile: UserProfile) {
  const list = [
    {
      title: 'Qualification Timeline vs. Current Financial Reality',
      description: 'Certain research, medical, and senior specialist pathways require 5 to 7 years of post-school preparation before reaching senior compensation levels. Plan your educational financing accordingly.',
    },
    {
      title: 'Confidence Underestimation Bias',
      description: 'Your responses indicate you may underestimate your execution capabilities in unfamiliar fields due to lack of early school exposure rather than cognitive limit.',
    },
    {
      title: 'Day-to-Day Routine vs. Title Prestige',
      description: 'Never select a direction purely based on its societal prestige. Every field involves 60% standard procedural documentation and maintenance work.',
    },
  ];

  if (profile.segment === 'career_switch' && profile.incomeDependency === 'I am the primary earner') {
    list[0] = {
      title: 'Income-Preserving Transition Imperative',
      description: 'As a primary earner, avoid quitting full-time employment for multi-year full-time degrees. Execute a staged transition using online asynchronous certifications and internal bridge roles.',
    };
  }

  return list;
}

function generate30DaysPlan(result: AssessmentResult, profile: UserProfile, topRec?: Recommendation) {
  const careerTitle = topRec?.career.title || 'your top recommended direction';

  return [
    {
      week: 'Week 1',
      title: 'Pathway Mapping',
      action: `Research top 3 accredited Indian institutions and entrance eligibility for ${careerTitle}. Download their official syllabus and admission guidelines.`,
    },
    {
      week: 'Week 2',
      title: 'Informational Dialogue',
      action: `Reach out on LinkedIn or family network to talk to at least one person with 3–5 years of experience in this field. Ask about their daily routine realities.`,
    },
    {
      week: 'Week 3',
      title: 'Micro-Project Experiment',
      action: `Complete a 7-day tangible mini-project or open course module (e.g., Coursera, NPTEL, Kaggle) to test your genuine day-to-day engagement with the work.`,
    },
    {
      week: 'Week 4',
      title: 'Evidence Review',
      action: `Compare your real-world experiment evidence with family, review financial costs, and decide whether to formalize entrance exam coaching or portfolio development.`,
    },
  ];
}

function generateParentReportText(
  result: AssessmentResult,
  profile: UserProfile,
  recommendations: Recommendation[]
): string {
  return `PathFind — Family Career Direction Summary
Student: ${profile.name} (${profile.age} years old)
Stage: ${profile.segment.replace('_', ' ').toUpperCase()}
Holland RIASEC Profile: ${result.hollandCode} (${result.topDimensions.join(', ')})

Core Suitability Headline:
"${result.headline}"

Observed Strengths & Work Style:
1. Reliability & Structured Discipline: Sustained focus on methodical execution and structured problem-solving.
2. Analytical Diagnostics: Natural capability for first-principles reasoning and technical mastery.
3. Professional Adaptability: Strong capacity to master accredited curricula and modern tools.

Top Recommended Career Directions & Pathways:
${recommendations.slice(0, 3).map((r, i) => `${i + 1}. ${r.career.title}
   • Pathway: ${r.howYouGetThere}
   • Key Institutions: ${r.institutions.slice(0, 3).join(', ')}
   • Income Range: ${r.career.incomeRange}`).join('\n\n')}

One Small Request for Parents:
"Give ${profile.name} one month to investigate these pathways properly, speak with working professionals in these sectors, and review accredited admissions before deciding that any direction is unrealistic."
`;
}
