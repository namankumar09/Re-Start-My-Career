export interface FAQItem {
  question: string;
  answer: string;
  category: 'methodology' | 'scoring' | 'parent_report' | 'privacy';
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'methodology',
    question: 'What is the Holland RIASEC Framework?',
    answer: 'Developed by psychologist Dr. John L. Holland, the RIASEC model categorizes career interests and work environments into six distinct archetypes: Realistic (hands-on/physical), Investigative (analytical/scientific), Artistic (creative/expressive), Social (helping/mentoring), Enterprising (leadership/commercial), and Conventional (structured/governance). Decades of empirical psychometric research show that higher alignment between a person’s RIASEC profile and their daily work environment predicts higher long-term satisfaction and lower workplace burnout.',
  },
  {
    category: 'scoring',
    question: 'Why measure interest and confidence separately?',
    answer: 'Standard career quizzes ask "What are you good at?" or conflate what you enjoy with what you have already practiced. In the Indian context, academic conditioning often suppresses natural curiosity in areas where a student hasn’t received formal training or encouragement. By evaluating "What pulls you" (Interest) separately from "What you believe you can do" (Confidence), we can isolate hidden psychological friction points.',
  },
  {
    category: 'scoring',
    question: 'What does a "Latent Gap" mean?',
    answer: 'A Latent Gap occurs when your interest in a dimension is substantially higher than your current confidence (a gap of +20 points or greater). This indicates you are strongly pulled toward this domain, but may be holding yourself back due to lack of early exposure, self-doubt, or absence of family role models. This is precisely the direction most commonly abandoned prematurely, making it the most important area to test through low-risk real-world experiments.',
  },
  {
    category: 'methodology',
    question: 'Is this assessment a psychological or medical diagnosis?',
    answer: 'No. re\\start my career is a career intelligence and self-discovery platform, not a psychiatric or diagnostic instrument. It provides directional signals based on your self-reported preferences to guide educational exploration. It should never be treated as an immutable destiny or an absolute measure of cognitive ability.',
  },
  {
    category: 'methodology',
    question: 'How are Indian career pathways and institutions selected?',
    answer: 'Our database maps realistic Indian higher education pathways including national entrance examinations (such as JEE, NEET, CUET, CLAT, NID DAT, NIFT, IPMAT, CA Foundation, UPSC) and top public/private universities. Each pathway accounts for actual prerequisite timelines, degree sequences, and post-graduation industry realities rather than advertising prestige.',
  },
  {
    category: 'methodology',
    question: 'Can I retake the assessment or change my answers?',
    answer: 'Yes. You can retake the assessment at any time from the Assessment tab or your Dashboard. If your interests evolve or if you feel your previous answers did not reflect your true priorities, retaking the test will recalculate your scores and update all recommendations immediately.',
  },
  {
    category: 'parent_report',
    question: 'How does the Parent Report differ from the Student Report?',
    answer: 'Indian parents naturally care about stability, employability, educational costs, and long-term risk. The Parent Report translates the student’s strengths into grounded attributes (such as reliability, problem-solving, and adaptability) and outlines established educational routes. It intentionally removes numerical scores (which often invite unhelpful arguments about test validity) and replaces raw watch-outs with constructive conversational prompts.',
  },
  {
    category: 'privacy',
    question: 'How is my personal and assessment data handled?',
    answer: 'Your responses are stored securely to maintain your progress and enable longitudinal tracking. Optional demographic information (reservation category, income) is solely used to surface relevant government scholarships and is strictly never used to filter out career opportunities. We do not sell user data to private coaching institutes.',
  },
  {
    category: 'methodology',
    question: 'Does AI make the final career decision for me?',
    answer: 'No. All core scoring, gap calculations, and initial recommendation rankings are 100% deterministic mathematical calculations. The AI engine acts exclusively as an interactive counsellor on top of your verified results, answering specific follow-up questions and helping you explore transition trade-offs.',
  },
];
