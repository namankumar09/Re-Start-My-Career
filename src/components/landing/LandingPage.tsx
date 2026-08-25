import React from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  Check, 
  Briefcase, 
  GraduationCap, 
  School 
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
    <div className="w-full bg-black text-zinc-100 selection:bg-zinc-800 selection:text-white">
      
      {/* 1. HERO SECTION (Apple-level typography, restraint & whitespace) */}
      <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 md:pt-40 md:pb-36 px-6 sm:px-8 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Subtle typography eyebrow */}
        <p className="text-xs sm:text-sm font-medium tracking-wide text-zinc-400 mb-6 uppercase">
          Psychometric Signals · Indian Educational Pathways
        </p>

        {/* Large, bold display headlines */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl">
          You don&apos;t need more career advice.
        </h1>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-400 leading-[1.12] max-w-4xl mt-3 mb-8">
          You need a clearer signal.
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed mb-10">
          Re\Start My Career isolates what naturally pulls your curiosity from what you merely learned to tolerate — mapping your true psychometric profile to viable Indian educational and professional pathways.
        </p>

        {/* Apple-style Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          <button
            onClick={() => onStartAssessment()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black hover:bg-zinc-200 text-sm font-semibold tracking-tight transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
          >
            <span>Take the Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreHowItWorks}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-transparent hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-sm font-medium tracking-tight transition-all flex items-center justify-center gap-2"
          >
            <span>Learn How It Works</span>
          </button>
        </div>

        {/* Minimalist Demo Persona Strip */}
        <div className="mt-20 pt-10 border-t border-zinc-900 w-full max-w-3xl flex flex-col items-center">
          <p className="text-xs text-zinc-400 font-medium tracking-wider uppercase mb-4">
            Try a 1-Click Evaluation Demo
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">
            {DEMO_PROFILES.map((dp) => (
              <button
                key={dp.id}
                onClick={() => onSelectDemoProfile(dp)}
                className="p-3 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-700 text-left transition-all group"
              >
                <div className="text-xs font-semibold text-zinc-200 group-hover:text-white truncate">
                  {dp.name}
                </div>
                <div className="text-[11px] text-zinc-400 truncate mt-0.5">
                  {dp.badge}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE CORE PROBLEM (Editorial layout with large typography) */}
      <section className="py-24 sm:py-32 border-t border-zinc-900 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          <div className="md:col-span-5 space-y-4">
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">
              The Fundamental Flaw
            </p>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Most career tests only ask what you are already good at.
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed pt-2">
              That measures your past environment and test-taking coaching — not your intrinsic cognitive engine. When you confuse current skill with long-term interest, you end up excelling at careers that burn you out.
            </p>
          </div>

          <div className="md:col-span-7 space-y-4">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-6">
              <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                We measure two independent dimensions:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <p className="text-xs text-zinc-400 font-medium mb-1">01 · Intrinsic Pull</p>
                  <p className="text-base font-semibold text-white">“What pulls you?”</p>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    What captures your curiosity before parental expectations or peer prestige intervene.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <p className="text-xs text-zinc-400 font-medium mb-1">02 · Self-Efficacy</p>
                  <p className="text-base font-semibold text-white">“What do you believe you can do?”</p>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    Your current confidence and readiness to execute under actual exam or job conditions.
                  </p>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed border-t border-zinc-900 pt-4">
                When interest is high but confidence is low, that is a <strong>Latent Gap</strong> — a high-potential career path you may have prematurely dismissed simply because no one encouraged you early on.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. THE SIGNAL: INTEREST VS. CONFIDENCE (Interactive Hexagon) */}
      <section id="how-it-works" className="py-24 sm:py-32 border-t border-zinc-900 px-6 sm:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">
            Holland RIASEC Architecture
          </p>
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            The Latent Gap is where careers get quietly abandoned.
          </h3>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Our 24-question assessment maps Realistic, Investigative, Artistic, Social, Enterprising, and Conventional dimensions with mathematical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-900">
          
          <div className="lg:col-span-6 flex justify-center">
            <HexagonSVG scores={sampleScores} size={340} interactive={false} />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-semibold text-white shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">24 Targeted Questions</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    18 interest questions identify your raw intrinsic direction. 6 confidence questions isolate perceived execution readiness.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-semibold text-white shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Mathematical Gap Classification</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Normalized 0–100 scores cleanly flag Latent (high interest, low confidence) and Overbuilt (low interest, high training) fields.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-semibold text-white shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Ground Truth Indian Pathways</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Direct mapping to JEE, NEET, CUET, CLAT, NID, NIFT, CA, UPSC, and alternative professional degrees with realistic timelines.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-900">
              <button
                onClick={() => onStartAssessment()}
                className="px-6 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold tracking-tight transition-all inline-flex items-center gap-1.5"
              >
                <span>Take the Assessment</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. THREE TARGET LIFE STAGES (Career Switch first) */}
      <section className="py-24 sm:py-32 border-t border-zinc-900 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="max-w-2xl">
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">
              Three Crucial Junctures
            </p>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              Tailored questions for your exact stage of life.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 01: Career Switch (FIRST) */}
            <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-900 flex flex-col justify-between hover:border-zinc-700 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 font-semibold uppercase">{t.segment_01_title}</span>
                  <h4 className="text-xl font-bold text-white mt-1">
                    Working Professionals
                  </h4>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.segment_01_desc}
                </p>
                <div className="text-xs text-zinc-400 bg-black p-3.5 rounded-xl border border-zinc-900">
                  Factors in financial dependency: distinguishes income-preserving transitions from high-risk restarts.
                </div>
              </div>
              <button
                onClick={() => onStartAssessment('career_switch')}
                className="mt-6 w-full py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Select Career Switch</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 02: Class 12 */}
            <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-900 flex flex-col justify-between hover:border-zinc-700 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 font-semibold uppercase">{t.segment_02_title}</span>
                  <h4 className="text-xl font-bold text-white mt-1">
                    Higher Secondary
                  </h4>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.segment_02_desc}
                </p>
                <div className="text-xs text-zinc-400 bg-black p-3.5 rounded-xl border border-zinc-900">
                  Evaluates undergraduate degree options, entrance exams, and allied fields beyond default engineering/medical paths.
                </div>
              </div>
              <button
                onClick={() => onStartAssessment('class_12')}
                className="mt-6 w-full py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Select Class 12</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 03: Class 10 */}
            <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-900 flex flex-col justify-between hover:border-zinc-700 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 font-semibold uppercase">{t.segment_03_title}</span>
                  <h4 className="text-xl font-bold text-white mt-1">
                    Secondary School
                  </h4>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.segment_03_desc}
                </p>
                <div className="text-xs text-zinc-400 bg-black p-3.5 rounded-xl border border-zinc-900">
                  Grounds 11th-grade stream selection (PCM, PCB, Commerce, Humanities) in intrinsic interest rather than peer pressure.
                </div>
              </div>
              <button
                onClick={() => onStartAssessment('class_10')}
                className="mt-6 w-full py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Select Class 10</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. DUAL REPORT PREVIEW (Student vs Parent Document) */}
      <section className="py-24 sm:py-32 border-t border-zinc-900 px-6 sm:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">
            Dual Output Architecture
          </p>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            One underlying assessment. Two distinct documents.
          </h3>
          <p className="text-sm text-zinc-400">
            A candidate needs to know what pulls them; parents need clarity on long-term stability, accredited colleges, and practical risk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* For Candidate */}
          <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">For Candidate</span>
              <span className="text-xs text-zinc-400">Detailed Psychometrics</span>
            </div>
            <h4 className="text-base font-semibold text-white">
              “You’re built for work where investigation turns into something practically useful.”
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                <span>Full Interest vs. Confidence numerical gap analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                <span>Interactive Holland Hexagon with Latent dimension signals</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                <span>Ranked career recommendations with reasoning chains</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                <span>Transparent reality checks and 30-Day execution roadmap</span>
              </li>
            </ul>
          </div>

          {/* For Parents */}
          <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">For Family & Parents</span>
              <span className="text-xs text-zinc-400">Constructive Dialogue</span>
            </div>
            <h4 className="text-base font-semibold text-white">
              “Demonstrated strengths in analytical problem-solving and structured reliability.”
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                <span>Addresses parental priorities: stability, cost & employability</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                <span>Eliminates test score anxiety and grading arguments</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                <span>Outlines accredited Indian universities and government entrance routes</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                <span>Provides &ldquo;One Small Ask&rdquo; for supportive home conversation</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-24 sm:py-32 border-t border-zinc-900 px-6 sm:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Find the direction you are drawn to.
          </h3>
          <p className="text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Take the 24-question assessment, isolate your interest vs confidence signals, and uncover your authentic path.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onStartAssessment()}
              className="px-9 py-4 rounded-full bg-white text-black hover:bg-zinc-200 text-sm font-semibold tracking-tight transition-all shadow-xl inline-flex items-center gap-2"
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
