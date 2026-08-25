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
  const { scores, segment } = result;

  // Filter and score careers from database
  const scoredCareers: { career: Career; fitScore: number }[] = [];

  CAREER_DATABASE.forEach((career) => {
    // 1. Strict segment compatibility
    if (!career.segments.includes(segment)) {
      return; // Skip careers not meant for this stage
    }

    let fit = 0;
    let totalWeight = 0;

    // 2. Primary dimension alignment
    career.primaryDimensions.forEach((dim) => {
      const dimData = scores[dim];
      const interest = dimData?.interestScore || 50;
      const confidence = dimData?.confidenceScore || 50;
      
      // Interest is weighted more heavily than confidence
      fit += (interest * 0.7) + (confidence * 0.3);
      totalWeight += 1;
    });

    // 3. Secondary dimension alignment
    career.secondaryDimensions.forEach((dim) => {
      const dimData = scores[dim];
      const interest = dimData?.interestScore || 50;
      const confidence = dimData?.confidenceScore || 50;
      
      fit += ((interest * 0.7) + (confidence * 0.3)) * 0.5;
      totalWeight += 0.5;
    });

    let avgFit = fit / totalWeight;

    // 4. Gap Adjustments
    let hasLatentGap = false;
    career.primaryDimensions.forEach((dim) => {
      if (scores[dim]?.classification === 'Latent') {
        hasLatentGap = true;
        avgFit += 3; // Boost slightly to encourage exploring latent interests
      }
    });

    // 5. Life Stage & Financial Context
    if (segment === 'career_switch') {
      if (profile.incomeDependency === 'I am the primary earner') {
        if (career.isIncomePreservingFriendly) {
          avgFit += 8;
        } else if (career.riskLevel === 'High') {
          avgFit -= 15;
        }
      } else if (profile.incomeDependency === 'No one') {
        if (career.riskLevel === 'High' || career.transitionType === 'Higher-flexibility transition') {
          avgFit += 5;
        }
      }

      if (profile.switchReason === 'Burnout' && career.riskLevel === 'Low') {
        avgFit += 5;
      }
      
      if (profile.age) {
        if (profile.age >= 40) {
          if (career.timeToEntry.includes('months') || career.timeToEntry.includes('1 year')) avgFit += 12;
          if (career.isIncomePreservingFriendly) avgFit += 8;
        } else if (profile.age >= 35) {
          if (career.timeToEntry.includes('1-2 years') || career.timeToEntry.includes('months')) avgFit += 8;
        } else if (profile.age >= 30) {
          if (career.timeToEntry.includes('4-6 years') || career.timeToEntry.includes('5.5')) avgFit -= 10;
        }
      }
    }

    // Normalize to 60-98 range for UI aesthetic
    const normalizedFit = Math.min(98, Math.max(60, Math.round(avgFit)));

    scoredCareers.push({
      career,
      fitScore: normalizedFit,
    });
  });

  // Sort descending by fitScore
  scoredCareers.sort((a, b) => b.fitScore - a.fitScore);

  // Pick top 4-6 recommendations
  const topList = scoredCareers.slice(0, 5);

  return topList.map(({ career, fitScore }) => {
    const primDim = career.primaryDimensions[0];
    const pScore = scores[primDim];
    
    let whyThis = '';
    if (pScore?.classification === 'Latent') {
      whyThis = `You have a strong latent interest in ${primDim} (${pScore.interestScore}%), but your confidence is currently lower (${pScore.confidenceScore}%). This pathway is recommended because it matches what you actually want to do. Don't let current confidence hold you back—skills can be built.`;
    } else if (pScore?.classification === 'Overbuilt') {
      whyThis = `While you are highly confident in ${primDim}, your interest is lower. This pathway leverages your existing capabilities, but you should ensure the day-to-day reality aligns with your actual interests.`;
    } else {
      const secDim = career.secondaryDimensions[0];
      const sScore = scores[secDim];
      whyThis = `Your ${primDim} interest (${pScore?.interestScore}%) combined with your ${secDim} interest (${sScore?.interestScore}%) creates a strong natural alignment for this pathway. Your confidence scores also indicate you feel capable of executing this transition.`;
    }

    const reasoningChain = `${primDim} (Int: ${pScore?.interestScore}, Conf: ${pScore?.confidenceScore}) → ${career.title}`;

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
      transitionLabel: career.transitionType || 'Structured path',
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
