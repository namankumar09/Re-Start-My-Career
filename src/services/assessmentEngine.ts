import { 
  Segment, 
  RIASECDimension, 
  DimensionScore, 
  AssessmentResult, 
  UserProfile, 
  Recommendation, 
  Career,
  GapClassification 
} from '../types';
import { getQuestionBankForSegment } from '../data/questionBanks';
import { CAREER_DATABASE } from '../data/careerDatabase';

const DIMENSIONS: RIASECDimension[] = [
  'Realistic',
  'Investigative',
  'Artistic',
  'Social',
  'Enterprising',
  'Conventional'
];

export function calculateAssessmentResult(
  userId: string,
  segment: Segment,
  answers: Record<string, number> // questionId -> 1..5
): AssessmentResult {
  const questions = getQuestionBankForSegment(segment);

  // Check low variance / non-differentiated responses
  const answerValues = Object.values(answers);
  let isLowVariance = false;
  let lowVarianceMessage: string | undefined;

  if (answerValues.length >= questions.length) {
    const mean = answerValues.reduce((a, b) => a + b, 0) / answerValues.length;
    const variance = answerValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / answerValues.length;
    
    // If standard deviation or variance is exceptionally low (e.g., all 3s or all 4s)
    if (variance < 0.35) {
      isLowVariance = true;
      lowVarianceMessage = "Your answers didn’t differentiate between the six areas. Retake and answer more decisively.";
    }
  }

  // Calculate raw sums per dimension
  const dimensionSums: Record<RIASECDimension, { interestSum: number; interestCount: number; confScore: number }> = {
    Realistic: { interestSum: 0, interestCount: 0, confScore: 3 },
    Investigative: { interestSum: 0, interestCount: 0, confScore: 3 },
    Artistic: { interestSum: 0, interestCount: 0, confScore: 3 },
    Social: { interestSum: 0, interestCount: 0, confScore: 3 },
    Enterprising: { interestSum: 0, interestCount: 0, confScore: 3 },
    Conventional: { interestSum: 0, interestCount: 0, confScore: 3 },
  };

  questions.forEach((q) => {
    const rawVal = answers[q.id] || 3;
    if (q.type === 'interest') {
      dimensionSums[q.dimension].interestSum += rawVal;
      dimensionSums[q.dimension].interestCount += 1;
    } else {
      dimensionSums[q.dimension].confScore = rawVal;
    }
  });

  const scores: Record<RIASECDimension, DimensionScore> = {} as Record<RIASECDimension, DimensionScore>;
  let highestLatentGap = -999;
  let highestLatentDimension: RIASECDimension | undefined;

  DIMENSIONS.forEach((dim) => {
    const data = dimensionSums[dim];
    // Interest: 3 questions, range 3..15 -> normalized 0..100
    const minInterest = data.interestCount * 1;
    const maxInterest = data.interestCount * 5;
    const interestNormalized = Math.round(
      Math.max(0, Math.min(100, ((data.interestSum - minInterest) / (maxInterest - minInterest)) * 100))
    );

    // Confidence: 1 question, range 1..5 -> normalized 0..100
    const confNormalized = Math.round(
      Math.max(0, Math.min(100, ((data.confScore - 1) / 4) * 100))
    );

    const gap = interestNormalized - confNormalized;

    let classification: GapClassification = 'Aligned';
    if (gap > 20) {
      classification = 'Latent';
      if (gap > highestLatentGap) {
        highestLatentGap = gap;
        highestLatentDimension = dim;
      }
    } else if (gap < -20) {
      classification = 'Overbuilt';
    }

    scores[dim] = {
      dimension: dim,
      interestScore: interestNormalized,
      confidenceScore: confNormalized,
      gap,
      classification,
    };
  });

  // Determine top 3 dimensions based on interest score
  const sortedDimensions = [...DIMENSIONS].sort((a, b) => {
    if (scores[b].interestScore !== scores[a].interestScore) {
      return scores[b].interestScore - scores[a].interestScore;
    }
    // Tie-break with confidence
    return scores[b].confidenceScore - scores[a].confidenceScore;
  });

  const topDimensions = sortedDimensions.slice(0, 3);
  const hollandCode = topDimensions.map((d) => d[0]).join('');

  const headline = generateHeadline(topDimensions, scores);

  return {
    userId,
    segment,
    completedAt: new Date().toISOString(),
    scores,
    hollandCode,
    topDimensions,
    headline,
    isLowVariance,
    lowVarianceMessage,
    highestLatentDimension,
    highestLatentGap: highestLatentDimension ? highestLatentGap : undefined,
  };
}

function generateHeadline(
  topDimensions: RIASECDimension[],
  scores: Record<RIASECDimension, DimensionScore>
): string {
  const primary = topDimensions[0];
  const secondary = topDimensions[1];

  if (primary === 'Investigative' && (secondary === 'Realistic' || secondary === 'Conventional')) {
    return 'You’re built for work where rigorous investigation turns into something practically useful.';
  }
  if (primary === 'Investigative' && secondary === 'Artistic') {
    return 'You operate at the intersection of deep analytical inquiry and open-ended creative exploration.';
  }
  if (primary === 'Investigative' && secondary === 'Social') {
    return 'You’re drawn to scientific diagnosis and research that directly alleviates human suffering.';
  }
  if (primary === 'Artistic' && secondary === 'Investigative') {
    return 'You excel when complex systems and abstract ideas are translated into elegant, human-centered forms.';
  }
  if (primary === 'Artistic' && (secondary === 'Enterprising' || secondary === 'Social')) {
    return 'You’re driven to shape narratives, brands, and visual experiences that shift human behavior.';
  }
  if (primary === 'Social' && secondary === 'Investigative') {
    return 'Your strengths center on clinical empathy, evidence-backed patient care, and human development.';
  }
  if (primary === 'Social' && secondary === 'Enterprising') {
    return 'You thrive when mediating complex human dynamics, leading teams, and driving organizational health.';
  }
  if (primary === 'Enterprising' && (secondary === 'Investigative' || secondary === 'Conventional')) {
    return 'You’re built for strategic commercial leadership, market risk navigation, and high-impact execution.';
  }
  if (primary === 'Enterprising' && secondary === 'Social') {
    return 'You combine high commercial instinct with the ability to inspire, negotiate, and mobilize people.';
  }
  if (primary === 'Conventional' && secondary === 'Investigative') {
    return 'You find deep leverage in structural precision, financial governance, regulatory rigor, and auditing.';
  }
  if (primary === 'Realistic' && secondary === 'Investigative') {
    return 'You’re energized by hands-on physical systems, technical instrumentation, and direct engineering reality.';
  }

  return `You thrive in environments balancing ${primary} discipline with ${secondary} perspective.`;
}

export function generateRecommendations(
  result: AssessmentResult,
  profile: UserProfile
): Recommendation[] {
  const { scores, topDimensions, segment } = result;

  // Filter and score careers from database
  const scoredCareers: { career: Career; fitScore: number }[] = CAREER_DATABASE.map((career) => {
    let fit = 0;

    // Segment compatibility
    const segmentMatch = career.segments.includes(segment);
    if (!segmentMatch) {
      fit -= 25;
    }

    // Primary dimension alignment
    career.primaryDimensions.forEach((dim) => {
      const dimScore = scores[dim]?.interestScore || 50;
      const confScore = scores[dim]?.confidenceScore || 50;
      fit += (dimScore * 0.45) + (confScore * 0.15);
    });

    // Secondary dimension alignment
    career.secondaryDimensions.forEach((dim) => {
      const dimScore = scores[dim]?.interestScore || 50;
      fit += (dimScore * 0.20);
    });

    // Career switch specific adjustments
    if (segment === 'career_switch') {
      if (profile.incomeDependency === 'I am the primary earner') {
        if (career.isIncomePreservingFriendly) {
          fit += 15; // Prioritize low-risk bridge transitions
        } else if (career.riskLevel === 'High') {
          fit -= 20; // Penalize 5-year full-time degrees with no income
        }
      } else if (profile.incomeDependency === 'No one') {
        if (career.riskLevel === 'High' || career.transitionType === 'Higher-flexibility transition') {
          fit += 10; // Encourage ambitious pivots
        }
      }

      if (profile.switchReason === 'Burnout') {
        // Boost careers with structured hours or healthy boundaries
        if (career.riskLevel === 'Low') {
          fit += 5;
        }
      }
    }

    // Normalize fit to 60-98 range
    const normalizedFit = Math.min(97, Math.max(52, Math.round(fit / (career.primaryDimensions.length + career.secondaryDimensions.length * 0.5) * 1.05)));

    return {
      career,
      fitScore: normalizedFit,
    };
  });

  // Sort descending by fitScore
  scoredCareers.sort((a, b) => b.fitScore - a.fitScore);

  // Pick top 4-6 recommendations
  const topList = scoredCareers.slice(0, 5);

  return topList.map(({ career, fitScore }) => {
    const primDim = career.primaryDimensions[0];
    const secDim = career.secondaryDimensions[0] || 'Conventional';
    const tertDim = career.secondaryDimensions[1] || 'Realistic';

    const pScore = scores[primDim]?.interestScore || 80;
    const sScore = scores[secDim]?.interestScore || 70;
    const tScore = scores[tertDim]?.interestScore || 30;

    const reasoningChain = `${primDim} ${pScore} + ${secDim} ${sScore} + ${tertDim} ${tScore} → ${career.title}`;

    let transitionLabel: string | undefined;
    if (segment === 'career_switch') {
      if (profile.incomeDependency === 'I am the primary earner' && career.isIncomePreservingFriendly) {
        transitionLabel = 'Income-preserving transition';
      } else if (profile.incomeDependency === 'No one') {
        transitionLabel = 'Higher-flexibility transition';
      } else {
        transitionLabel = career.transitionType || 'Structured path';
      }
    }

    const whyThis = `Your ${primDim} score of ${pScore} indicates a strong natural orientation toward ${getDimensionTrait(primDim)}. Combined with your ${secDim} score of ${sScore} (${getDimensionTrait(secDim)}), this pathway leverages your strengths while keeping procedural friction manageable.`;

    return {
      career,
      fitScore,
      reasoningChain,
      whyThis,
      howYouGetThere: career.path,
      whatItIsActuallyLike: career.reality,
      indianExams: career.exams,
      institutions: career.institutions,
      estimatedDuration: career.timeToEntry,
      transitionLabel,
    };
  });
}

function getDimensionTrait(dim: RIASECDimension): string {
  switch (dim) {
    case 'Investigative':
      return 'systematic analysis, first-principles inquiry, and data-backed problem solving';
    case 'Realistic':
      return 'hands-on technical execution, physical systems, and tangible operational reality';
    case 'Artistic':
      return 'creative storytelling, aesthetic judgment, and open-ended design synthesis';
    case 'Social':
      return 'direct human empathy, clinical care, mentorship, and interpersonal healing';
    case 'Enterprising':
      return 'strategic leadership, commercial initiative, negotiation, and high-impact outcomes';
    case 'Conventional':
      return 'regulatory compliance, financial governance, procedural precision, and risk mitigation';
  }
}
