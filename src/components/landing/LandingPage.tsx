import React from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  Check, 
  Briefcase, 
  GraduationCap, 
  School,
  Quote,
  Sparkles
} from 'lucide-react';
import { Segment } from '../../types';
import { HexagonSVG } from '../common/HexagonSVG';
import { DEMO_PROFILES, DemoAccount } from '../../data/demoProfiles';

interface LandingPageProps {
  onStartAssessment: (segment?: Segment) => void;
  onSelectDemoProfile: (demo: DemoAccount) => void;
  onExploreHowItWorks: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onSelectDemoProfile,
  onExploreHowItWorks,
}) => {
  // Sample scores for landing demonstration
  const sampleScores = {
    Realistic: { dimension: 'Realistic' as const, interestScore: 78, confidenceScore: 72, gap: 6, classification: 'Aligned' as const },
    Investigative: { dimension: 'Investigative' as const, interestScore: 92, confidenceScore: 64, gap: 28, classification: 'Latent' as const },
    Artistic: { dimension: 'Artistic' as const, interestScore: 68, confidenceScore: 65, gap: 3, classification: 'Aligned' as const },
    Social: { dimension: 'Social' as const, interestScore: 54, confidenceScore: 58, gap: -4, classification: 'Aligned' as const },
    Enterprising: { dimension: 'Enterprising' as const, interestScore: 42, confidenceScore: 50, gap: -8, classification: 'Aligned' as const },
    Conventional: { dimension: 'Conventional' as const, interestScore: 35, confidenceScore: 40, gap: -5, classification: 'Aligned' as const },
  };

  // Dedicated Testimonials Stories with rich detail
  const testimonials = [
    {
      id: 'demo_a',
      demoAccount: DEMO_PROFILES[0],
      name: 'Aarav Sharma',
      role: 'Class 10 Student · CBSE',
      avatarInitial: 'A',
      quote: 'I was pushed toward generic JEE coaching because my math marks were high. Re\Start My Career showed my true interest was in Investigative & Applied Robotics — steering me toward Mechatronics without second-guessing.',
      tag: 'Stream Discovery',
      metric: 'IR Profile (Investigative-Realistic)'
    },
    {
      id: 'demo_b',
      demoAccount: DEMO_PROFILES[1],
      name: 'Ananya Iyer',
      role: 'Class 12 PCB Student',
      avatarInitial: 'A',
      quote: 'After feeling burnt out by pure NEET prep, the Latent Gap report showed high curiosity for healthcare research & neuropsychology rather than clinical surgery. The parent document resolved our family dinner arguments.',
      tag: 'Latent Gap Resolved',
      metric: 'SI Profile (Social-Investigative)'
    },
    {
      id: 'demo_c',
      demoAccount: DEMO_PROFILES[2],
      name: 'Rohan Mehra',
      role: 'Former QA Engineer → Product Design',
      avatarInitial: 'R',
      quote: 'I spent 3 years in repetitive software test suites. The assessment clearly flagged my Overbuilt Conventional skill vs. high Artistic pull. Transitioned to UI/UX design with a structured 30-day plan.',
      tag: 'High Flexibility Pivot',
      metric: 'AE Profile (Artistic-Enterprising)'
    },
    {
      id: 'demo_d',
      demoAccount: DEMO_PROFILES[3],
      name: 'Pooja Verma',
      role: 'Financial Operations → Business Intelligence',
      avatarInitial: 'P',
      quote: 'As the primary household earner, I couldn’t quit my job to restart college. Re\Start My Career filtered solely for income-preserving upskilling pathways, leading directly to a senior Risk & BI analyst role.',
      tag: 'Income-Preserving Switch',
      metric: 'IC Profile (Investigative-Conventional)'
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-black dark:selection:text-white transition-colors duration-200">
      
      {/* 1. HERO SECTION (Apple-level typography, restraint & whitespace) */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 md:pt-36 md:pb-32 px-6 sm:px-8 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Subtle typography eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
          <span>Psychometric Signals · Indian Educational Pathways</span>
        </div>

        {/* Large, bold display headlines */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.08] max-w-4xl">
          You don&apos;t need more career advice.
        </h1>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-500 dark:text-zinc-400 leading-[1.12] max-w-4xl mt-3 mb-8">
          You need a clearer signal.
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed mb-10">
          Re\Start My Career isolates what naturally pulls your curiosity from what you merely learned to tolerate — mapping your true psychometric profile to viable Indian educational and professional pathways.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          <button
            onClick={() => onStartAssessment()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-sm font-semibold tracking-tight transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Take the Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreHowItWorks}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white text-sm font-medium tracking-tight transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Learn How It Works</span>
          </button>
        </div>
      </section>

      {/* Requirement 3: FIXED TESTIMONIALS / DEMO SECTION (Vertical Cards) */}
      <section className="py-20 sm:py-28 border-t border-zinc-200 dark:border-zinc-900 px-6 sm:px-8 bg-zinc-50/60 dark:bg-zinc-950/40">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-widest">
              Student & Professional Experiences
            </p>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Real clarity across critical life stages.
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Explore how our dual interest vs. confidence gap modeling resolved real-world dilemmas. Click any profile to test drive the live report.
            </p>
          </div>

          {/* Vertical Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/90 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Header & Tag */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
                      {item.tag}
                    </span>
                    <Quote className="w-4 h-4 text-zinc-400 dark:text-zinc-600 shrink-0" />
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Profile Metric Tag */}
                  <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/60 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800">
                    {item.metric}
                  </div>
                </div>

                {/* Bottom User Info & Demo Trigger Button */}
                <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-900 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-900 text-white dark:bg-zinc-800 dark:text-white flex items-center justify-center text-xs font-semibold shrink-0 shadow-sm">
                      {item.avatarInitial}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <button
                    onClick={() => onSelectDemoProfile(item.demoAccount)}
                    className="w-full py-2 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
                  >
                    <span>View Demo Profile</span>
                    <ChevronRight className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. THE CORE PROBLEM (Editorial layout with large typography) */}
      <section className="py-24 sm:py-32 border-t border-zinc-200 dark:border-zinc-900 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          <div className="md:col-span-5 space-y-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-widest">
              The Fundamental Flaw
            </p>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">
              Most career tests only ask what you are already good at.
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-2">
              That measures your past environment and test-taking coaching — not your intrinsic cognitive engine. When you confuse current skill with long-term interest, you end up excelling at careers that burn you out.
            </p>
          </div>

          <div className="md:col-span-7 space-y-4">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 space-y-6">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">
                We measure two independent dimensions:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-1">01 · Intrinsic Pull</p>
                  <p className="text-base font-semibold text-zinc-950 dark:text-white">“What pulls you?”</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                    What captures your curiosity before parental expectations or peer prestige intervene.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-1">02 · Self-Efficacy</p>
                  <p className="text-base font-semibold text-zinc-950 dark:text-white">“What do you believe you can do?”</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                    Your current confidence and readiness to execute under actual exam or job conditions.
                  </p>
                </div>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200 dark:border-zinc-900 pt-4">
                When interest is high but confidence is low, that is a <strong className="text-zinc-900 dark:text-zinc-200">Latent Gap</strong> — a high-potential career path you may have prematurely dismissed simply because no one encouraged you early on.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. THE SIGNAL: INTEREST VS. CONFIDENCE (Interactive Hexagon) */}
      <section id="how-it-works" className="py-24 sm:py-32 border-t border-zinc-200 dark:border-zinc-900 px-6 sm:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-widest">
            Holland RIASEC Architecture
          </p>
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">
            The Latent Gap is where careers get quietly abandoned.
          </h3>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Our 24-question assessment maps Realistic, Investigative, Artistic, Social, Enterprising, and Conventional dimensions with mathematical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900">
          
          <div className="lg:col-span-6 flex justify-center">
            <HexagonSVG scores={sampleScores} size={340} interactive={false} />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-900 dark:text-white shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-950 dark:text-white">24 Targeted Questions</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                    18 interest questions identify your raw intrinsic direction. 6 confidence questions isolate perceived execution readiness.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-900 dark:text-white shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-950 dark:text-white">Mathematical Gap Classification</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                    Normalized 0–100 scores cleanly flag Latent (high interest, low confidence) and Overbuilt (low interest, high training) fields.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-900 dark:text-white shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-950 dark:text-white">Ground Truth Indian Pathways</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                    Direct mapping to JEE, NEET, CUET, CLAT, NID, NIFT, CA, UPSC, and alternative professional degrees with realistic timelines.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-900">
              <button
                onClick={() => onStartAssessment()}
                className="px-6 py-2.5 rounded-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-xs font-semibold tracking-tight transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Take the Assessment</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. THREE TARGET LIFE STAGES (Career Switch first) */}
      <section className="py-24 sm:py-32 border-t border-zinc-200 dark:border-zinc-900 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="max-w-2xl">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-widest">
              Three Crucial Junctures
            </p>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white mt-2">
              Tailored questions for your exact stage of life.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 01: Career Switch (FIRST) */}
            <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors shadow-sm">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase">Working Professionals</span>
                  <h4 className="text-xl font-bold text-zinc-950 dark:text-white mt-1">
                    Career Switch
                  </h4>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  For mid-career individuals seeking pivot strategies without discarding accrued domain experience or endangering financial stability.
                </p>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 bg-white dark:bg-black p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-900">
                  Factors in financial dependency: distinguishes income-preserving transitions from high-risk restarts.
                </div>
              </div>
              <button
                onClick={() => onStartAssessment('career_switch')}
                className="mt-6 w-full py-2.5 rounded-full bg-zinc-900 hover:bg-black text-white dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Select Career Switch</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 02: Class 12 */}
            <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors shadow-sm">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase">Higher Secondary</span>
                  <h4 className="text-xl font-bold text-zinc-950 dark:text-white mt-1">
                    Class 12
                  </h4>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  For 12th graders evaluating undergraduate majors, competitive entrances, and professional colleges across India.
                </p>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 bg-white dark:bg-black p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-900">
                  Evaluates undergraduate degree options, entrance exams, and allied fields beyond default engineering/medical paths.
                </div>
              </div>
              <button
                onClick={() => onStartAssessment('class_12')}
                className="mt-6 w-full py-2.5 rounded-full bg-zinc-900 hover:bg-black text-white dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Select Class 12</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 03: Class 10 */}
            <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors shadow-sm">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase">Secondary School</span>
                  <h4 className="text-xl font-bold text-zinc-950 dark:text-white mt-1">
                    Class 10
                  </h4>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  For 10th graders choosing high school academic streams (PCM, PCB, Commerce, Humanities) based on intrinsic interest.
                </p>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 bg-white dark:bg-black p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-900">
                  Grounds 11th-grade stream selection in intrinsic interest rather than parental or peer pressure.
                </div>
              </div>
              <button
                onClick={() => onStartAssessment('class_10')}
                className="mt-6 w-full py-2.5 rounded-full bg-zinc-900 hover:bg-black text-white dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Select Class 10</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. DUAL REPORT PREVIEW (Student vs Parent Document) */}
      <section className="py-24 sm:py-32 border-t border-zinc-200 dark:border-zinc-900 px-6 sm:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-widest">
            Dual Output Architecture
          </p>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
            One underlying assessment. Two distinct documents.
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            A candidate needs to know what pulls them; parents need clarity on long-term stability, accredited colleges, and practical risk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* For Candidate */}
          <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-900">
              <span className="text-xs font-semibold text-zinc-950 dark:text-white uppercase tracking-wider">For Candidate</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Detailed Psychometrics</span>
            </div>
            <h4 className="text-base font-semibold text-zinc-950 dark:text-white">
              “You’re built for work where investigation turns into something practically useful.”
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-300 shrink-0" />
                <span>Full Interest vs. Confidence numerical gap analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-300 shrink-0" />
                <span>Interactive Holland Hexagon with Latent dimension signals</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-300 shrink-0" />
                <span>Ranked career recommendations with reasoning chains</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-300 shrink-0" />
                <span>Transparent reality checks and 30-Day execution roadmap</span>
              </li>
            </ul>
          </div>

          {/* For Parents */}
          <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-900">
              <span className="text-xs font-semibold text-zinc-950 dark:text-white uppercase tracking-wider">For Family & Parents</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Constructive Dialogue</span>
            </div>
            <h4 className="text-base font-semibold text-zinc-950 dark:text-white">
              “Demonstrated strengths in analytical problem-solving and structured reliability.”
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-300 shrink-0" />
                <span>Addresses parental priorities: stability, cost & employability</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-300 shrink-0" />
                <span>Eliminates test score anxiety and grading arguments</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-300 shrink-0" />
                <span>Outlines accredited Indian universities and entrance routes</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-300 shrink-0" />
                <span>Provides “One Small Ask” for supportive home conversation</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-24 sm:py-32 border-t border-zinc-200 dark:border-zinc-900 px-6 sm:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Find the direction you are drawn to.
          </h3>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Take the 24-question assessment, isolate your interest vs confidence signals, and uncover your authentic path.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onStartAssessment()}
              className="px-9 py-4 rounded-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-sm font-semibold tracking-tight transition-all shadow-xl inline-flex items-center gap-2 cursor-pointer"
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
