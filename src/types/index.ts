export type Segment = 'career_switch' | 'class_12' | 'class_10';

export type RIASECDimension = 'Realistic' | 'Investigative' | 'Artistic' | 'Social' | 'Enterprising' | 'Conventional';

export type QuestionType = 'interest' | 'confidence';

export interface Question {
  id: string;
  segment: Segment;
  type: QuestionType;
  dimension: RIASECDimension;
  text: string;
  subtext?: string;
}

export type ReservationCategory = 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'Prefer not to say';

export type IncomeBracket = 
  | 'Under ₹2.5 Lakhs'
  | '₹2.5 Lakhs – ₹8 Lakhs'
  | '₹8 Lakhs – ₹15 Lakhs'
  | 'Above ₹15 Lakhs'
  | 'Prefer not to say';

export type IncomeDependency = 'No one' | 'I partly support my family' | 'I am the primary earner';

export type SwitchReason = 'Burnout' | 'No growth' | 'Financial reasons' | 'I never liked the field' | 'Other';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  age: number;
  gender: string;
  city: string;
  currentEducation: string;
  segment: Segment;
  reservationCategory?: ReservationCategory;
  annualFamilyIncome?: IncomeBracket;
  // Career Switch specific
  incomeDependency?: IncomeDependency;
  switchReason?: SwitchReason;
  experienceYears?: number;
  currentField?: string;
  createdAt: string;
  updatedAt: string;
}

export type GapClassification = 'Latent' | 'Overbuilt' | 'Aligned';

export interface DimensionScore {
  dimension: RIASECDimension;
  interestScore: number; // 0 - 100
  confidenceScore: number; // 0 - 100
  gap: number; // interest - confidence
  classification: GapClassification;
}

export interface AssessmentResult {
  userId: string;
  segment: Segment;
  completedAt: string;
  scores: Record<RIASECDimension, DimensionScore>;
  hollandCode: string; // e.g., "IAS"
  topDimensions: RIASECDimension[];
  headline: string;
  isLowVariance: boolean;
  lowVarianceMessage?: string;
  highestLatentDimension?: RIASECDimension;
  highestLatentGap?: number;
}

export interface Career {
  id: string;
  title: string;
  segments: Segment[];
  primaryDimensions: RIASECDimension[];
  secondaryDimensions: RIASECDimension[];
  path: string;
  exams: string[];
  courses: string[];
  institutions: string[];
  reality: string;
  incomeRange: string;
  timeToEntry: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
  transferableSkills: string[];
  isPcbMedical?: boolean;
  isIncomePreservingFriendly?: boolean;
  transitionType?: 'Income-preserving transition' | 'Higher-flexibility transition' | 'Standard path';
}

export interface Recommendation {
  career: Career;
  fitScore: number; // 0 - 100%
  reasoningChain: string;
  whyThis: string;
  howYouGetThere: string;
  whatItIsActuallyLike: string;
  indianExams: string[];
  institutions: string[];
  estimatedDuration: string;
  transitionLabel?: string;
}

export interface SavedCareerItem {
  id: string;
  careerId: string;
  recommendation: Recommendation;
  savedAt: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system' | 'ai';
  content: string;
  timestamp: string;
  contextUsed?: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  provider: string;
  type: string;
  categoryMatch: ReservationCategory[];
  incomeEligibility: string[];
  description: string;
  coverage: string;
  eligibility?: string;
  applicationDeadline?: string;
  applicationLink: string;
  deadline?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'assessment' | 'career' | 'action' | 'opportunity' | 'counselling';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface NotificationSettings {
  assessmentReminders: boolean;
  careerUpdates: boolean;
  thirtyDayActionReminders: boolean;
  scholarshipOpportunities: boolean;
  aiFollowUps: boolean;
}

export interface AISettings {
  provider: 'gemini' | 'openai' | 'anthropic';
  model: string;
  apiKey?: string;
  isConnected: boolean;
}

export interface FeedbackSubmission {
  id: string;
  rating: number;
  category: 'recommendations' | 'questions' | 'parent_report' | 'counsellor' | 'other' | 'accuracy' | 'ux' | 'pathways' | 'ai_chat';
  message: string;
  email?: string;
  contactEmail?: string;
  timestamp?: string;
  createdAt?: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';
export type SupportedLanguage = 'en' | 'hi';
