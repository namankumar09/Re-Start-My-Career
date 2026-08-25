import { UserProfile, AssessmentResult, Recommendation, ChatMessage } from '../types';

export interface AICounsellorContext {
  profile: UserProfile;
  result: AssessmentResult;
  recommendations: Recommendation[];
  savedCareerTitles?: string[];
}

export async function askAICounsellor(
  userQuery: string,
  chatHistory: ChatMessage[],
  context: AICounsellorContext
): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userQuery,
        history: chatHistory.slice(-6).map((m) => ({ role: m.sender, content: m.content })),
        context: {
          name: context.profile.name,
          age: context.profile.age,
          segment: context.profile.segment,
          currentEducation: context.profile.currentEducation,
          incomeDependency: context.profile.incomeDependency,
          switchReason: context.profile.switchReason,
          currentField: context.profile.currentField,
          experienceYears: context.profile.experienceYears,
          hollandCode: context.result.hollandCode,
          topDimensions: context.result.topDimensions,
          scores: context.result.scores,
          latentGapDimension: context.result.highestLatentDimension,
          latentGapValue: context.result.highestLatentGap,
          recommendations: context.recommendations.map((r) => ({
            title: r.career.title,
            fitScore: r.fitScore,
            path: r.howYouGetThere,
            reality: r.whatItIsActuallyLike,
            transitionLabel: r.transitionLabel,
          })),
          savedCareers: context.savedCareerTitles || [],
        },
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.reply && data.reply.trim().length > 0) {
        return data.reply;
      }
    }
  } catch {
    // Silently fall back to deterministic expert writer
  }

  return generateRuleBasedResponse(userQuery, context);
}

// Built-in rule-based deterministic response generator based on actual scores
export function generateRuleBasedResponse(
  query: string,
  context: AICounsellorContext
): string {
  const q = query.toLowerCase();
  const { profile, result, recommendations } = context;
  const top1 = result.topDimensions[0];
  const top2 = result.topDimensions[1];
  const top3 = result.topDimensions[2];
  const s1 = result.scores[top1]?.interestScore || 0;
  const s2 = result.scores[top2]?.interestScore || 0;
  const c1 = result.scores[top1]?.confidenceScore || 0;
  const latent = result.highestLatentDimension;
  const latentGap = result.highestLatentGap;

  // Question: Parent resistance / family support
  if (q.includes('parent') || q.includes('family') || q.includes('mom') || q.includes('dad') || q.includes('convince')) {
    return `In Indian families, resistance to non-conventional career directions almost always stems from a concern for financial stability and predictable employment rather than a desire to restrict you.

When speaking with your parents:
1. Don't frame your choice as a "passion" or "dream." Frame it around structural employability and accredited institutional routes (e.g., highlighting that programs at NID, TISS, IISc, or premier NLUs have established placement records).
2. Show them the specific Parent Report from the toggle above. It intentionally highlights your core reliability, problem-solving abilities, and accredited Indian examination routes while omitting raw test numbers.
3. Propose a defined, low-risk verification period: "Give me 30 to 45 days to prepare a detailed institutional roadmap and speak to professionals currently working in this field before making a final call."`;
  }

  // Question: Biotechnology vs MBBS / Medicine
  if (q.includes('biotechnology') || q.includes('mbbs') || q.includes('medicine') || q.includes('doctor') || q.includes('pcb')) {
    return `Your Investigative score is ${s1} and your Realistic score is ${result.scores.Realistic?.interestScore || 0}.

Here is the objective trade-off between Clinical MBBS and Biotechnology R&D:
• Clinical MBBS (NEET-UG route) demands a 5.5-year undergraduate degree followed by 3-year MD/MS residency under high physical shift pressure. Financial returns scale significantly only after 10–12 years.
• Biotechnology / Genomic Research (CUET / GAT-B route) focuses on computational biology, molecular assays, and biopharma drug discovery pipelines. It suits an Investigative profile that enjoys bench experiments and scientific problem-solving without 36-hour clinical emergency duty.

If your priority is diagnostic patient care, aim for NEET. If your priority is scientific inquiry and technology development, Biotechnology offers high global research mobility.`;
  }

  // Question: Career Switch & Income / Financial Risk
  if (q.includes('switch') || q.includes('risk') || q.includes('safe') || q.includes('salary') || q.includes('income') || q.includes('money')) {
    if (profile.incomeDependency === 'I am the primary earner') {
      return `Because you indicated that you are the primary earner for your family, your recommendations have been specifically weighted for income-preserving transitions.

Your primary recommendation (${recommendations[0]?.career.title || 'Data & Systems Architecture'}) allows you to leverage your ${profile.experienceYears || 3}+ years of professional experience:
1. Prioritize part-time or asynchronous credentials (such as IIT Madras BS/Diploma tracks or professional certifications like AWS/GCP/CSCP) rather than quitting full-time work.
2. Target "bridge roles" within your current organization or adjacent sectors before making a hard pivot.
3. Your Conventional score is ${result.scores.Conventional?.interestScore || 0}, which gives you the procedural discipline to execute a staged 6-to-9 month transition without financial disruption.`;
    } else {
      return `Since you have no immediate dependents, you have higher structural flexibility to make an ambitious pivot into ${recommendations[0]?.career.title || 'your top match'}.

Your profile (${result.hollandCode}: ${top1} ${s1}, ${top2} ${s2}) suggests strong analytical attraction. A dedicated 4-to-6 month portfolio sprint or specialized postgraduate degree will build competitive market credibility quickly.`;
    }
  }

  // Question: Confidence gap / Self-doubt
  if (q.includes('confidence') || q.includes('gap') || q.includes('doubt') || q.includes('afraid') || q.includes('scared')) {
    if (latent && latentGap && latentGap > 15) {
      return `Your assessment revealed a significant Latent Gap in ${latent} (Interest: ${result.scores[latent].interestScore}, Confidence: ${result.scores[latent].confidenceScore}, Gap: +${latentGap}).

This means you are naturally drawn to ${latent} tasks, but your current self-efficacy is noticeably lower. In the Indian educational system, this almost always occurs when someone has never had early mentorship or hands-on practice in that domain.

The antidote to low confidence is not theoretical reassurance; it is small, measurable micro-projects. Complete a 7-day mini-project in this area before letting self-doubt decide your trajectory.`;
    } else {
      return `Your interest and confidence scores are well-aligned across your primary dimensions (${top1}: ${s1} interest vs ${c1} confidence).

You are not fighting internal self-doubt here. What attracts you is consistent with what you believe you can execute. Your primary challenge is selecting the most efficient Indian entrance or institutional route.`;
    }
  }

  // Question: Why did you recommend this specific top career?
  if (q.includes('why') || q.includes('recommend') || q.includes('top')) {
    const topRec = recommendations[0];
    if (topRec) {
      return `The recommendation for "${topRec.career.title}" (${topRec.fitScore}% Fit) is derived directly from your assessment:

• Mathematical Reasoning: ${topRec.reasoningChain}
• Why it fits: Your ${top1} score of ${s1} paired with ${top2} (${s2}) indicates high suitability for ${topRec.career.path}.
• Practical reality: ${topRec.whatItIsActuallyLike}
• Relevant Indian Route: ${topRec.indianExams.join(', ') || 'Direct Portfolio & Merit Entry'}.`;
    }
  }

  // General Evidence-Based Guidance
  return `Based on your ${result.hollandCode} profile (${top1}: ${s1}, ${top2}: ${s2}, ${top3}: ${result.scores[top3]?.interestScore || 0}), your primary strengths align with structured investigation and disciplined execution.

Key observations for your stage (${profile.segment === 'class_10' ? 'Class 10 Stream Selection' : profile.segment === 'class_12' ? 'Class 12 Degree Route' : 'Career Transition'}):
1. Focus on pathways that leverage your ${top1} ability to break down complex problems.
2. Review the 30-Day Action Plan on your report to run low-stakes informational interviews and practical tests.
3. What specific dimension or educational route would you like to explore deeper?`;
}
