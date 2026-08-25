import { UserProfile, AssessmentResult, Recommendation } from '../types';
import { calculateAssessmentResult, generateRecommendations } from '../services/assessmentEngine';
import { CLASS_10_QUESTIONS, CLASS_12_QUESTIONS, CAREER_SWITCH_QUESTIONS } from './questionBanks';

export interface DemoAccount {
  id: string;
  name: string;
  badge: string;
  description: string;
  profile: UserProfile;
  answers: Record<string, number>;
  result: AssessmentResult;
  recommendations: Recommendation[];
}

// 1. DEMO A: Class 10 Student (Strong Investigative + Realistic)
const demoAProfile: UserProfile = {
  id: 'demo_user_a',
  name: 'Aarav Sharma',
  email: 'aarav.demo@restartcareer.in',
  phone: '+91 98765 43210',
  age: 15,
  gender: 'Male',
  city: 'Bengaluru, Karnataka',
  currentEducation: 'Class 10 (CBSE)',
  segment: 'class_10',
  reservationCategory: 'General',
  annualFamilyIncome: '₹8 Lakhs – ₹15 Lakhs',
  createdAt: '2026-08-20T10:00:00Z',
  updatedAt: '2026-08-20T10:30:00Z',
};

const demoAAnswers: Record<string, number> = {};
CLASS_10_QUESTIONS.forEach((q) => {
  if (q.dimension === 'Investigative') demoAAnswers[q.id] = q.type === 'interest' ? 5 : 4;
  else if (q.dimension === 'Realistic') demoAAnswers[q.id] = q.type === 'interest' ? 5 : 4;
  else if (q.dimension === 'Conventional') demoAAnswers[q.id] = q.type === 'interest' ? 3 : 3;
  else if (q.dimension === 'Enterprising') demoAAnswers[q.id] = q.type === 'interest' ? 2 : 3;
  else if (q.dimension === 'Social') demoAAnswers[q.id] = q.type === 'interest' ? 2 : 3;
  else if (q.dimension === 'Artistic') demoAAnswers[q.id] = q.type === 'interest' ? 2 : 2;
});
const demoAResult = calculateAssessmentResult(demoAProfile.id, 'class_10', demoAAnswers);
const demoARecs = generateRecommendations(demoAResult, demoAProfile);

// 2. DEMO B: Class 12 Student (Strong Social + Investigative)
const demoBProfile: UserProfile = {
  id: 'demo_user_b',
  name: 'Ananya Iyer',
  email: 'ananya.demo@restartcareer.in',
  phone: '+91 98234 56789',
  age: 17,
  gender: 'Female',
  city: 'Chennai, Tamil Nadu',
  currentEducation: 'Class 12 (PCB)',
  segment: 'class_12',
  reservationCategory: 'OBC',
  annualFamilyIncome: '₹2.5 Lakhs – ₹8 Lakhs',
  createdAt: '2026-08-21T11:00:00Z',
  updatedAt: '2026-08-21T11:35:00Z',
};

const demoBAnswers: Record<string, number> = {};
CLASS_12_QUESTIONS.forEach((q) => {
  if (q.dimension === 'Social') demoBAnswers[q.id] = q.type === 'interest' ? 5 : 4;
  else if (q.dimension === 'Investigative') demoBAnswers[q.id] = q.type === 'interest' ? 5 : 3; // latent gap in Investigative
  else if (q.dimension === 'Artistic') demoBAnswers[q.id] = q.type === 'interest' ? 4 : 4;
  else if (q.dimension === 'Realistic') demoBAnswers[q.id] = q.type === 'interest' ? 3 : 3;
  else if (q.dimension === 'Enterprising') demoBAnswers[q.id] = q.type === 'interest' ? 2 : 3;
  else if (q.dimension === 'Conventional') demoBAnswers[q.id] = q.type === 'interest' ? 2 : 2;
});
const demoBResult = calculateAssessmentResult(demoBProfile.id, 'class_12', demoBAnswers);
const demoBRecs = generateRecommendations(demoBResult, demoBProfile);

// 3. DEMO C: Career Switcher (Strong Artistic + Enterprising, No Dependants)
const demoCProfile: UserProfile = {
  id: 'demo_user_c',
  name: 'Rohan Mehra',
  email: 'rohan.demo@restartcareer.in',
  phone: '+91 97112 33445',
  age: 26,
  gender: 'Male',
  city: 'Mumbai, Maharashtra',
  currentEducation: 'B.Tech IT (Working as QA Engineer)',
  segment: 'career_switch',
  reservationCategory: 'General',
  annualFamilyIncome: 'Above ₹15 Lakhs',
  incomeDependency: 'No one',
  switchReason: 'I never liked the field',
  experienceYears: 3,
  currentField: 'Software Testing / QA',
  createdAt: '2026-08-22T09:15:00Z',
  updatedAt: '2026-08-22T09:45:00Z',
};

const demoCAnswers: Record<string, number> = {};
CAREER_SWITCH_QUESTIONS.forEach((q) => {
  if (q.dimension === 'Artistic') demoCAnswers[q.id] = q.type === 'interest' ? 5 : 4;
  else if (q.dimension === 'Enterprising') demoCAnswers[q.id] = q.type === 'interest' ? 5 : 4;
  else if (q.dimension === 'Investigative') demoCAnswers[q.id] = q.type === 'interest' ? 4 : 3;
  else if (q.dimension === 'Social') demoCAnswers[q.id] = q.type === 'interest' ? 3 : 3;
  else if (q.dimension === 'Realistic') demoCAnswers[q.id] = q.type === 'interest' ? 2 : 2;
  else if (q.dimension === 'Conventional') demoCAnswers[q.id] = q.type === 'interest' ? 1 : 4; // overbuilt in conventional
});
const demoCResult = calculateAssessmentResult(demoCProfile.id, 'career_switch', demoCAnswers);
const demoCRecs = generateRecommendations(demoCResult, demoCProfile);

// 4. DEMO D: Career Switcher (Primary Earner, Income-Preserving Transition Needed)
const demoDProfile: UserProfile = {
  id: 'demo_user_d',
  name: 'Pooja Verma',
  email: 'pooja.demo@restartcareer.in',
  phone: '+91 99887 76655',
  age: 29,
  gender: 'Female',
  city: 'Pune, Maharashtra',
  currentEducation: 'B.Com + 6 yrs Financial Operations',
  segment: 'career_switch',
  reservationCategory: 'General',
  annualFamilyIncome: '₹8 Lakhs – ₹15 Lakhs',
  incomeDependency: 'I am the primary earner',
  switchReason: 'Burnout',
  experienceYears: 6,
  currentField: 'Financial Operations / Back Office',
  createdAt: '2026-08-23T14:20:00Z',
  updatedAt: '2026-08-23T15:00:00Z',
};

const demoDAnswers: Record<string, number> = {};
CAREER_SWITCH_QUESTIONS.forEach((q) => {
  if (q.dimension === 'Investigative') demoDAnswers[q.id] = q.type === 'interest' ? 5 : 4;
  else if (q.dimension === 'Conventional') demoDAnswers[q.id] = q.type === 'interest' ? 4 : 5;
  else if (q.dimension === 'Enterprising') demoDAnswers[q.id] = q.type === 'interest' ? 4 : 4;
  else if (q.dimension === 'Social') demoDAnswers[q.id] = q.type === 'interest' ? 3 : 3;
  else if (q.dimension === 'Realistic') demoDAnswers[q.id] = q.type === 'interest' ? 2 : 2;
  else if (q.dimension === 'Artistic') demoDAnswers[q.id] = q.type === 'interest' ? 2 : 2;
});
const demoDResult = calculateAssessmentResult(demoDProfile.id, 'career_switch', demoDAnswers);
const demoDRecs = generateRecommendations(demoDResult, demoDProfile);

export const DEMO_PROFILES: DemoAccount[] = [
  {
    id: 'demo_a',
    name: 'Aarav Sharma',
    badge: 'Class 10 Student',
    description: 'Strong Investigative + Realistic (IR) profile exploring Engineering vs Pure Science stream choices.',
    profile: demoAProfile,
    answers: demoAAnswers,
    result: demoAResult,
    recommendations: demoARecs,
  },
  {
    id: 'demo_b',
    name: 'Ananya Iyer',
    badge: 'Class 12 PCB Student',
    description: 'Strong Social + Investigative (SI) profile with high interest in Healthcare/Psychology and a notable latent gap.',
    profile: demoBProfile,
    answers: demoBAnswers,
    result: demoBResult,
    recommendations: demoBRecs,
  },
  {
    id: 'demo_c',
    name: 'Rohan Mehra',
    badge: 'Career Switcher (No Dependants)',
    description: 'High-flexibility pivot from software QA toward Product Design & Creative Strategy (AE Profile).',
    profile: demoCProfile,
    answers: demoCAnswers,
    result: demoCResult,
    recommendations: demoCRecs,
  },
  {
    id: 'demo_d',
    name: 'Pooja Verma',
    badge: 'Career Switcher (Primary Earner)',
    description: 'Income-preserving transition from financial operations burnout into Business Intelligence & Risk Analysis (IC Profile).',
    profile: demoDProfile,
    answers: demoDAnswers,
    result: demoDResult,
    recommendations: demoDRecs,
  },
];
