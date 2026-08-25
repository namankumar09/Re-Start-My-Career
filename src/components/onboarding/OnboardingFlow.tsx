import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Briefcase, 
  GraduationCap, 
  School, 
  ShieldCheck, 
  User, 
  Sparkles, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { 
  Segment, 
  UserProfile, 
  ReservationCategory, 
  IncomeBracket, 
  IncomeDependency, 
  SwitchReason, 
  SupportedLanguage 
} from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';

interface OnboardingFlowProps {
  initialSegment?: Segment;
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
  language: SupportedLanguage;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  initialSegment,
  onComplete,
  onCancel,
  language,
}) => {
  const t = TRANSLATIONS[language];

  // Steps: 1: Segment Selection, 2: Personal Info (+ Optional Scholarship), 3: Career Switch Details (if segment === 'career_switch')
  const [currentStep, setCurrentStep] = useState<number>(initialSegment ? 2 : 1);
  const [segment, setSegment] = useState<Segment>(initialSegment || 'career_switch');

  // Form State
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(initialSegment === 'class_10' ? 15 : initialSegment === 'class_12' ? 17 : 26);
  const [gender, setGender] = useState('Prefer not to say');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [currentEducation, setCurrentEducation] = useState('');
  
  // Optional Info
  const [reservationCategory, setReservationCategory] = useState<ReservationCategory>('Prefer not to say');
  const [annualFamilyIncome, setAnnualFamilyIncome] = useState<IncomeBracket>('Prefer not to say');

  // Career Switch Specific
  const [incomeDependency, setIncomeDependency] = useState<IncomeDependency>('I partly support my family');
  const [switchReason, setSwitchReason] = useState<SwitchReason>('No growth');
  const [experienceYears, setExperienceYears] = useState<number>(3);
  const [currentField, setCurrentField] = useState('Software');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep2 = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter your full name';
    if (!age || age < 12 || age > 70) errs.age = 'Please enter a valid age (12–70)';
    if (!city.trim()) errs.city = 'Please specify your current city';
    if (!currentEducation.trim()) errs.currentEducation = 'Please mention your current class or degree';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      // Adjust default age based on segment
      if (segment === 'class_10') setAge(15);
      else if (segment === 'class_12') setAge(17);
      else setAge(26);

      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!validateStep2()) return;
      if (segment === 'career_switch') {
        setCurrentStep(3);
      } else {
        submitProfile();
      }
    } else if (currentStep === 3) {
      submitProfile();
    }
  };

  const submitProfile = () => {
    const profile: UserProfile = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      age: Number(age),
      gender,
      city: city.trim(),
      currentEducation: currentEducation.trim(),
      segment,
      reservationCategory: reservationCategory !== 'Prefer not to say' ? reservationCategory : undefined,
      annualFamilyIncome: annualFamilyIncome !== 'Prefer not to say' ? annualFamilyIncome : undefined,
      incomeDependency: segment === 'career_switch' ? incomeDependency : undefined,
      switchReason: segment === 'career_switch' ? switchReason : undefined,
      experienceYears: segment === 'career_switch' ? Number(experienceYears) : undefined,
      currentField: segment === 'career_switch' ? currentField : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onComplete(profile);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-zinc-950 text-zinc-100">
      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
        
        {/* Progress Bar & Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
            <span>Step {currentStep} of {segment === 'career_switch' ? 3 : 2}</span>
            <span className="uppercase">{segment.replace('_', ' ')}</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${(currentStep / (segment === 'career_switch' ? 3 : 2)) * 100}%` }}
            />
          </div>
        </div>

        {/* ================= STEP 1: SEGMENT SELECTION (Career Switch first) ================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                Moment Selection
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
                Where are you in your career journey?
              </h2>
              <p className="text-xs text-zinc-400">
                Select your current life turning point. Questions and scoring are specifically tailored to this context.
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              {/* Option 01: Career Switch (MUST BE FIRST) */}
              <div
                onClick={() => setSegment('career_switch')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                  segment === 'career_switch'
                    ? 'bg-blue-950/30 border-blue-500 shadow-md ring-1 ring-blue-500/20'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${segment === 'career_switch' ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-zinc-100">{t.segment_01_title}</h3>
                    {segment === 'career_switch' && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    For professionals already working who are considering a new direction, escaping burnout, or seeking sustainable pivots.
                  </p>
                </div>
              </div>

              {/* Option 02: Class 12 */}
              <div
                onClick={() => setSegment('class_12')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                  segment === 'class_12'
                    ? 'bg-blue-950/30 border-blue-500 shadow-md ring-1 ring-blue-500/20'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${segment === 'class_12' ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-zinc-100">{t.segment_02_title}</h3>
                    {segment === 'class_12' && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Choose your undergraduate degree, entrance exam focus (JEE/NEET/CUET/CLAT/NID), or higher education direction.
                  </p>
                </div>
              </div>

              {/* Option 03: Class 10 */}
              <div
                onClick={() => setSegment('class_10')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                  segment === 'class_10'
                    ? 'bg-blue-950/30 border-blue-500 shadow-md ring-1 ring-blue-500/20'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${segment === 'class_10' ? 'bg-purple-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                  <School className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-zinc-100">{t.segment_03_title}</h3>
                    {segment === 'class_10' && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Select your 11th-grade academic stream (PCM, PCB, Commerce, Humanities) based on intrinsic curiosity.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-zinc-800">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                {t.btn_back}
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-zinc-100 text-zinc-950 hover:bg-white text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: PERSONAL INFO (+ OPTIONAL SCHOLARSHIP SECTION) ================= */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                Candidate Profile
              </span>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-zinc-100">
                Personal Information
              </h2>
              <p className="text-xs text-zinc-400">
                Required details to calibrate your assessment report.
              </p>
            </div>

            {/* Required Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                />
                {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Age *
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                  min="12"
                  max="70"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:outline-none focus:border-blue-500 font-mono"
                />
                {errors.age && <p className="text-[11px] text-red-400 mt-1">{errors.age}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Mobile Number (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  City / State *
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Bengaluru, Karnataka"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                />
                {errors.city && <p className="text-[11px] text-red-400 mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Current Course / Education *
                </label>
                <input
                  type="text"
                  value={currentEducation}
                  onChange={(e) => setCurrentEducation(e.target.value)}
                  placeholder={
                    segment === 'class_10' ? 'e.g. Class 10 CBSE' : segment === 'class_12' ? 'e.g. Class 12 PCB' : 'e.g. B.Tech Computer Science'
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                />
                {errors.currentEducation && <p className="text-[11px] text-red-400 mt-1">{errors.currentEducation}</p>}
              </div>
            </div>

            {/* Optional Scholarship & Schemes Section */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-semibold text-zinc-200">
                  Optional Information (Scholarships & Financial Support)
                </h3>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-[11px] text-zinc-400 leading-relaxed">
                <Info className="w-3.5 h-3.5 text-blue-400 inline mr-1 -mt-0.5" />
                This information is optional. It is used only to identify scholarships, fee support and government schemes you may qualify for. It is never used to narrow your career recommendations.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Reservation Category (Optional)
                  </label>
                  <select
                    value={reservationCategory}
                    onChange={(e) => setReservationCategory(e.target.value as ReservationCategory)}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC (Other Backward Classes)</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="EWS">EWS (Economically Weaker Section)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Annual Family Income (Optional)
                  </label>
                  <select
                    value={annualFamilyIncome}
                    onChange={(e) => setAnnualFamilyIncome(e.target.value as IncomeBracket)}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Under ₹2.5 Lakhs">Under ₹2.5 Lakhs</option>
                    <option value="₹2.5 Lakhs – ₹8 Lakhs">₹2.5 Lakhs – ₹8 Lakhs</option>
                    <option value="₹8 Lakhs – ₹15 Lakhs">₹8 Lakhs – ₹15 Lakhs</option>
                    <option value="Above ₹15 Lakhs">Above ₹15 Lakhs</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                {t.btn_back}
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-zinc-100 text-zinc-950 hover:bg-white text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5"
              >
                <span>{segment === 'career_switch' ? 'Next: Work Context' : 'Start 24-Question Assessment'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: CAREER SWITCH SPECIFIC CONTEXT ================= */}
        {currentStep === 3 && segment === 'career_switch' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                Career Switch Constraints
              </span>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-zinc-100">
                Financial Responsibility & Transition Context
              </h2>
              <p className="text-xs text-zinc-400">
                These answers actively shape whether we recommend income-preserving bridge roles or higher-flexibility pivots.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">
                  Who depends on your income? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(['No one', 'I partly support my family', 'I am the primary earner'] as IncomeDependency[]).map((dep) => (
                    <button
                      key={dep}
                      type="button"
                      onClick={() => setIncomeDependency(dep)}
                      className={`p-3 rounded-xl border text-xs font-medium transition-all text-left ${
                        incomeDependency === dep
                          ? 'bg-blue-950/40 border-blue-500 text-white shadow-sm'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {dep}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">
                  Why are you considering a change? *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['Burnout', 'No growth', 'Financial reasons', 'I never liked the field', 'Other'] as SwitchReason[]).map((reason) => (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => setSwitchReason(reason)}
                      className={`p-2.5 rounded-xl border text-xs font-medium transition-all text-center ${
                        switchReason === reason
                          ? 'bg-blue-950/40 border-blue-500 text-white'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Years of Professional Experience
                  </label>
                  <input
                    type="number"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(parseInt(e.target.value) || 0)}
                    min="0"
                    max="45"
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Current Field / Domain
                  </label>
                  <select
                    value={currentField}
                    onChange={(e) => setCurrentField(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Software">Software / IT / QA</option>
                    <option value="Finance">Finance / Banking / Accounting</option>
                    <option value="Healthcare">Healthcare / Pharma / Diagnostics</option>
                    <option value="Education">Education / Teaching / Training</option>
                    <option value="Sales">Sales / Business Development</option>
                    <option value="Operations">Operations / Supply Chain</option>
                    <option value="Manufacturing">Manufacturing / Core Engineering</option>
                    <option value="Government">Government / Public Sector</option>
                    <option value="Design">Design / Creative / Media</option>
                    <option value="Marketing">Marketing / Brand / Growth</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                {t.btn_back}
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-zinc-100 text-zinc-950 hover:bg-white text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5"
              >
                <span>Begin Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
