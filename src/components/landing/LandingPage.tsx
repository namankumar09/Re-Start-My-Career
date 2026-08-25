import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2, 
  TrendingUp, 
  Briefcase, 
  GraduationCap, 
  School,
  Layers
} from 'lucide-react';
import { Segment, SupportedLanguage } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { HexagonSVG } from '../common/HexagonSVG';
import { DEMO_PROFILES, DemoAccount } from '../../data/demoProfiles';

interface LandingPageProps {
  onStartAssessment: (segment?: Segment) => void;
  onSelectDemoProfile: (demo: DemoAccount) => void;
  onExploreHowItWorks: () => void;
  language: SupportedLanguage;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onSelectDemoProfile,
  onExploreHowItWorks,
  language,
}) => {
  const t = TRANSLATIONS[language];

  // Sample scores for landing demonstration
  const sampleScores = {
    Realistic: { dimension: 'Realistic' as const, interestScore: 78, confidenceScore: 72, gap: 6, classification: 'Aligned' as const },
    Investigative: { dimension: 'Investigative' as const, interestScore: 92, confidenceScore: 64, gap: 28, classification: 'Latent' as const },
    Artistic: { dimension: 'Artistic' as const, interestScore: 68, confidenceScore: 65, gap: 3, classification: 'Aligned' as const },
    Social: { dimension: 'Social' as const, interestScore: 54, confidenceScore: 58, gap: -4, classification: 'Aligned' as const },
    Enterprising: { dimension: 'Enterprising' as const, interestScore: 42, confidenceScore: 50, gap: -8, classification: 'Aligned' as const },
    Conventional: { dimension: 'Conventional' as const, interestScore: 35, confidenceScore: 40, gap: -5, classification: 'Aligned' as const },
  };

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 selection:bg-blue-600/30 selection:text-blue-200">
      
      {/* 1. CINEMATIC HERO (Apple-style spacing & typography) */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center flex flex-col items-center">
        
        {/* Minimal pill header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 font-mono tracking-tight mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span>Holland RIASEC · Interest vs. Confidence</span>
        </div>

        {/* Oversized editorial headline */}
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100 max-w-4xl leading-[1.08] mb-4">
          {t.hero_statement_1}
        </h1>
        <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-blue-400 max-w-4xl leading-[1.12] mb-8">
          {t.hero_statement_2}
        </h2>

        {/* Concise supporting copy */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed mb-12">
          {t.hero_supporting}
        </p>

        {/* Primary and secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => onStartAssessment()}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-100 text-zinc-950 hover:bg-white text-sm font-semibold tracking-tight transition-all shadow-lg hover:shadow-zinc-800/20 flex items-center justify-center gap-2 group"
          >
            <span>{t.cta_find_direction}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onExploreHowItWorks}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-sm font-medium tracking-tight transition-all flex items-center justify-center gap-2"
          >
            <span>{t.cta_see_how}</span>
          </button>
        </div>

        {/* Evaluation Personas Strip */}
        <div className="mt-16 pt-10 border-t border-zinc-900 w-full max-w-3xl flex flex-col items-center">
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
            Direct Demo Personas (One-Click Evaluation)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
            {DEMO_PROFILES.map((dp) => (
              <button
                key={dp.id}
                onClick={() => onSelectDemoProfile(dp)}
                className="p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/60 hover:border-zinc-700 text-left transition-all group"
              >
                <div className="text-[11px] font-semibold text-zinc-200 group-hover:text-blue-300 truncate">
                  {dp.name}
                </div>
                <div className="text-[10px] text-zinc-400 font-mono truncate">
                  {dp.badge}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM (Spacious contrast section) */}
      <section className="py-24 bg-zinc-900/40 border-y border-zinc-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            <div className="md:col-span-5 space-y-4">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">
                01 / {t.section_problem_title}
              </span>
              <h3 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
                Most career advice asks: “What are you good at?”
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {t.section_problem_p1}
              </p>
            </div>

            <div className="md:col-span-7 p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  We ask two distinct questions:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/30">
                    <p className="text-xs font-mono text-blue-400 mb-1">01 · Intrinsic Pull</p>
                    <p className="text-base font-semibold text-zinc-100">“What pulls you?”</p>
                    <p className="text-xs text-zinc-400 mt-2">What engages your curiosity before anyone tells you what is prestigious.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30">
                    <p className="text-xs font-mono text-emerald-400 mb-1">02 · Self-Efficacy</p>
                    <p className="text-base font-semibold text-zinc-100">“What do you believe you can do?”</p>
                    <p className="text-xs text-zinc-400 mt-2">Your current perceived capability and readiness to execute under pressure.</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-zinc-400 border-t border-zinc-800 pt-4 leading-relaxed">
                {t.section_problem_p2}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. THE SIGNAL: INTEREST VS. CONFIDENCE (Interactive Hexagon) */}
      <section id="how-it-works" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            02 / {t.section_signal_title}
          </span>
          <h3 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100">
            The Latent Gap is where careers get quietly abandoned.
          </h3>
          <p className="text-base text-zinc-400 leading-relaxed">
            When interest is high but confidence is low, students and professionals assume they aren’t "cut out" for it. It is almost always a lack of early exposure or encouragement — not a lack of talent.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-6 sm:p-12">
          
          <div className="lg:col-span-6 flex justify-center">
            <HexagonSVG scores={sampleScores} size={360} interactive={false} />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-900/40 border border-blue-500/50 flex items-center justify-center text-blue-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-100">24 Rigorous Questions Per Life Stage</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    18 interest questions identify your intrinsic psychological attraction. 6 confidence questions isolate your perceived execution readiness.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-amber-900/40 border border-amber-500/50 flex items-center justify-center text-amber-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-100">Deterministic Mathematical Scoring</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Scores are normalized to 0–100 per dimension. Gaps greater than +20 trigger Latent exploration; gaps below -20 highlight overbuilt routines.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-900/40 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-100">Authentic Indian Education Pathways</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Mapped directly against JEE, NEET, CUET, CLAT, NID, NIFT, CA, and UPSC entrance criteria, realistic timelines, and actual work environments.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <button
                onClick={() => onStartAssessment()}
                className="px-6 py-3 rounded-full bg-zinc-100 text-zinc-950 hover:bg-white text-xs font-semibold tracking-tight transition-all flex items-center gap-2"
              >
                <span>Take the Assessment</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. THREE TARGET MOMENTS (Career Switch first!) */}
      <section className="py-24 bg-zinc-900/20 border-t border-zinc-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">
              03 / Designed for Three Turning Points
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mt-2">
              Specific questions tailored to your exact life stage.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 01: Career Switch (MUST BE FIRST) */}
            <div className="p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-blue-400 font-semibold">{t.segment_01_title}</span>
                  <h4 className="font-heading text-xl font-bold text-zinc-100 mt-1">
                    Working Professionals
                  </h4>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.segment_01_desc}
                </p>
                <div className="text-[11px] font-mono text-zinc-400 bg-zinc-950 p-3 rounded-lg border border-zinc-800/80">
                  Factors in financial dependency: primary earner vs no dependants to recommend income-preserving vs higher-flexibility transitions.
                </div>
              </div>
              <button
                onClick={() => onStartAssessment('career_switch')}
                className="mt-6 w-full py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Select Career Switch</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Card 02: Class 12 */}
            <div className="p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">{t.segment_02_title}</span>
                  <h4 className="font-heading text-xl font-bold text-zinc-100 mt-1">
                    Higher Secondary
                  </h4>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.segment_02_desc}
                </p>
                <div className="text-[11px] font-mono text-zinc-400 bg-zinc-950 p-3 rounded-lg border border-zinc-800/80">
                  Evaluates undergraduate degree selection, entrance pressures (JEE, NEET, CUET, CLAT, NID), and allied career routes beyond mainstream defaults.
                </div>
              </div>
              <button
                onClick={() => onStartAssessment('class_12')}
                className="mt-6 w-full py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Select Class 12</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Card 03: Class 10 */}
            <div className="p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-purple-400 font-semibold">{t.segment_03_title}</span>
                  <h4 className="font-heading text-xl font-bold text-zinc-100 mt-1">
                    Secondary School
                  </h4>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.segment_03_desc}
                </p>
                <div className="text-[11px] font-mono text-zinc-400 bg-zinc-950 p-3 rounded-lg border border-zinc-800/80">
                  Grounds 11th-grade stream selection (PCM, PCB, Commerce with Math, Humanities) in psychological curiosity rather than peer momentum.
                </div>
              </div>
              <button
                onClick={() => onStartAssessment('class_10')}
                className="mt-6 w-full py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Select Class 10</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. DUAL REPORT PREVIEW (Student vs Parent Document) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
            04 / Dual Document Architecture
          </span>
          <h3 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
            One underlying assessment. Two genuinely different documents.
          </h3>
          <p className="text-sm text-zinc-400">
            Because a student needs to know what pulls them, while parents need to know about stability, accredited colleges, and practical risk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* For You Preview */}
          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-semibold text-blue-400 font-mono uppercase">For You (Candidate)</span>
              <span className="text-[10px] font-mono text-zinc-400">Deep Psychometrics</span>
            </div>
            <h4 className="font-heading text-lg font-semibold text-zinc-100">
              “You’re built for work where investigation turns into something practically useful.”
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Full Interest vs. Confidence numerical gap analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Interactive Holland Hexagon with Latent dimension tags</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Ranked recommendations with numerical reasoning chains</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Unfiltered watch-outs & Next 30 Days action plan</span>
              </li>
            </ul>
          </div>

          {/* For Parents Preview */}
          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-semibold text-emerald-400 font-mono uppercase">For Your Parents (Family)</span>
              <span className="text-[10px] font-mono text-zinc-400">Constructive Dialogue</span>
            </div>
            <h4 className="font-heading text-lg font-semibold text-zinc-100">
              “Demonstrated strengths in analytical problem-solving and structured reliability.”
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Addresses parental priorities: stability, employability & education cost</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Removes raw test numbers to avoid unproductive grading arguments</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Outlines established accredited Indian institutions and entrance routes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Ends with “One Small Ask” for supportive home dialogue</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 6. FINAL ACTION CTA */}
      <section className="py-24 bg-zinc-900/40 border-t border-zinc-900 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100">
            Find the direction you are drawn to.
          </h3>
          <p className="text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Take the 24-question assessment, isolate your interest vs confidence signals, and receive an authentic roadmap.
          </p>
          <div className="pt-4">
            <button
              onClick={() => onStartAssessment()}
              className="px-9 py-4 rounded-full bg-zinc-100 text-zinc-950 hover:bg-white text-sm font-semibold tracking-tight transition-all shadow-xl hover:shadow-zinc-800/30 inline-flex items-center gap-2"
            >
              <span>Begin Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
