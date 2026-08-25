import { Question, Segment, RIASECDimension } from '../types';

export const CLASS_10_QUESTIONS: Question[] = [
  // Realistic (3 Interest, 1 Confidence)
  {
    id: 'c10_r_int_1',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Realistic',
    text: 'When a mechanical device, bicycle, or household appliance stops working, I instinctively want to open it up and see how the physical parts work together.',
  },
  {
    id: 'c10_r_int_2',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Realistic',
    text: 'I prefer science practicals and craft workshops where I build, wire, or physically assemble things with my hands over theoretical lectures.',
  },
  {
    id: 'c10_r_int_3',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Realistic',
    text: 'I enjoy outdoor physical environments, fieldwork, robotics kits, or sports equipment maintenance more than sitting at a desk for hours.',
  },
  {
    id: 'c10_r_conf_1',
    segment: 'class_10',
    type: 'confidence',
    dimension: 'Realistic',
    text: 'I feel confident in my ability to troubleshoot mechanical faults, assemble physical models, or master hands-on technical tools.',
  },

  // Investigative (3 Interest, 1 Confidence)
  {
    id: 'c10_i_int_1',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Investigative',
    text: 'When I learn a scientific rule or mathematical formula, I want to understand the first-principles proof behind why it works rather than just memorising it.',
  },
  {
    id: 'c10_i_int_2',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Investigative',
    text: 'I naturally enjoy reading about astronomy, genetics, logic puzzles, coding challenges, or environmental discoveries in my spare time.',
  },
  {
    id: 'c10_i_int_3',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Investigative',
    text: 'I like spending hours digging into an unsolved mystery, data discrepancy, or complex school science question until I find the root cause.',
  },
  {
    id: 'c10_i_conf_1',
    segment: 'class_10',
    type: 'confidence',
    dimension: 'Investigative',
    text: 'I am confident in my capability to master demanding mathematical reasoning, scientific analysis, and abstract logical problem-solving.',
  },

  // Artistic (3 Interest, 1 Confidence)
  {
    id: 'c10_a_int_1',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Artistic',
    text: 'I am drawn to sketching, writing fiction, composing music, video editing, or visual aesthetics where there is no single predetermined correct answer.',
  },
  {
    id: 'c10_a_int_2',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Artistic',
    text: 'I pay close attention to typography, colour schemes, emotional tone, and design when seeing posters, book covers, architecture, or films.',
  },
  {
    id: 'c10_a_int_3',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Artistic',
    text: 'I prefer open-ended creative expression and storytelling over strict, step-by-step repetitive school instructions.',
  },
  {
    id: 'c10_a_conf_1',
    segment: 'class_10',
    type: 'confidence',
    dimension: 'Artistic',
    text: 'I trust my creative taste and ability to produce original artwork, prose, designs, or performance pieces that evoke genuine emotion.',
  },

  // Social (3 Interest, 1 Confidence)
  {
    id: 'c10_s_int_1',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Social',
    text: 'When classmates are struggling with a concept or going through emotional distress, I naturally step forward to listen, explain, and support them.',
  },
  {
    id: 'c10_s_int_2',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Social',
    text: 'I am energized by community service, peer mentoring, school welfare initiatives, or helping someone understand their health and well-being.',
  },
  {
    id: 'c10_s_int_3',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Social',
    text: 'I would rather work in a role directly improving people’s daily lives and learning than working in isolation with data or machines.',
  },
  {
    id: 'c10_s_conf_1',
    segment: 'class_10',
    type: 'confidence',
    dimension: 'Social',
    text: 'I have strong interpersonal empathy and confidence in mediating peer conflicts, teaching others patiently, and building trust.',
  },

  // Enterprising (3 Interest, 1 Confidence)
  {
    id: 'c10_e_int_1',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Enterprising',
    text: 'I naturally gravitate towards leading group projects, pitching ideas to teachers, or organizing school exhibitions and fete stalls for profit.',
  },
  {
    id: 'c10_e_int_2',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Enterprising',
    text: 'I find it exciting to negotiate, persuade someone to adopt my viewpoint, or think about how new products and businesses make money in India.',
  },
  {
    id: 'c10_e_int_3',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Enterprising',
    text: 'I am motivated by public speaking, student council leadership, debate tournaments, and taking calculated initiatives.',
  },
  {
    id: 'c10_e_conf_1',
    segment: 'class_10',
    type: 'confidence',
    dimension: 'Enterprising',
    text: 'I feel self-assured when taking charge of an uncertain situation, making executive decisions, and speaking persuasively before a crowd.',
  },

  // Conventional (3 Interest, 1 Confidence)
  {
    id: 'c10_c_int_1',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Conventional',
    text: 'I feel deeply satisfied when my study schedule, notes, file folders, and personal budget are neatly organized, indexed, and error-free.',
  },
  {
    id: 'c10_c_int_2',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Conventional',
    text: 'I prefer clear grading rubrics, standardized test structures, and predictable processes over ambiguous, undefined tasks.',
  },
  {
    id: 'c10_c_int_3',
    segment: 'class_10',
    type: 'interest',
    dimension: 'Conventional',
    text: 'I enjoy tracking financial records, cataloguing information, checking mathematical calculations for accuracy, and creating structured checklists.',
  },
  {
    id: 'c10_c_conf_1',
    segment: 'class_10',
    type: 'confidence',
    dimension: 'Conventional',
    text: 'I trust my diligence to execute detailed, procedural tasks with extreme precision and minimal tolerance for careless errors.',
  },
];

export const CLASS_12_QUESTIONS: Question[] = [
  // Realistic (3 Interest, 1 Confidence)
  {
    id: 'c12_r_int_1',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Realistic',
    text: 'I would choose a degree with intensive fieldwork, physical prototyping, hardware circuitry, or industrial labs over one confined entirely to lecture halls.',
  },
  {
    id: 'c12_r_int_2',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Realistic',
    text: 'I find civil structures, aeronautics, manufacturing plants, surgical tool mechanics, or agricultural technology more appealing than purely conceptual office work.',
  },
  {
    id: 'c12_r_int_3',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Realistic',
    text: 'I am drawn to tangible engineering, site architecture, diagnostic instrumentation, or environmental resource management.',
  },
  {
    id: 'c12_r_conf_1',
    segment: 'class_12',
    type: 'confidence',
    dimension: 'Realistic',
    text: 'I am confident in my capacity to handle rigorous technical laboratories, spatial manipulation, and hands-on operational tools.',
  },

  // Investigative (3 Interest, 1 Confidence)
  {
    id: 'c12_i_int_1',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Investigative',
    text: 'I am drawn to researching biological pathways, theoretical physics, algorithmic complexity, or quantitative economic models.',
  },
  {
    id: 'c12_i_int_2',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Investigative',
    text: 'I enjoy reading primary research papers, dissecting statistical data sets, or formulating hypotheses to test in laboratory conditions.',
  },
  {
    id: 'c12_i_int_3',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Investigative',
    text: 'I would thrive in an academic or industrial environment where the primary deliverable is solving hard, previously unsolved analytical questions.',
  },
  {
    id: 'c12_i_conf_1',
    segment: 'class_12',
    type: 'confidence',
    dimension: 'Investigative',
    text: 'I am confident in my intellectual stamina to crack rigorous entrance examinations (like JEE/NEET/CUET research tracks) and master advanced theory.',
  },

  // Artistic (3 Interest, 1 Confidence)
  {
    id: 'c12_a_int_1',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Artistic',
    text: 'I am drawn to careers in industrial design, UI/UX architecture, creative writing, cinema, architecture, or visual communication.',
  },
  {
    id: 'c12_a_int_2',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Artistic',
    text: 'I feel constrained by rigid linear formulas and want my higher studies to provide space for original aesthetic exploration and storytelling.',
  },
  {
    id: 'c12_a_int_3',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Artistic',
    text: 'I frequently critique the user experience, spatial balance, narrative pacing, and branding of products and media around me.',
  },
  {
    id: 'c12_a_conf_1',
    segment: 'class_12',
    type: 'confidence',
    dimension: 'Artistic',
    text: 'I am confident in building a competitive portfolio (such as for NID, NIFT, architecture or creative design) that stands out on merit.',
  },

  // Social (3 Interest, 1 Confidence)
  {
    id: 'c12_s_int_1',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Social',
    text: 'I am deeply motivated by medical care, psychological counselling, special education, or public health advocacy where human healing is central.',
  },
  {
    id: 'c12_s_int_2',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Social',
    text: 'I want my undergraduate studies to equip me with the skills to address societal inequalities, clinical patient needs, or community health disparities.',
  },
  {
    id: 'c12_s_int_3',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Social',
    text: 'I find deep fulfillment in understanding human developmental psychology, social policy, patient bedside care, or pedagogy.',
  },
  {
    id: 'c12_s_conf_1',
    segment: 'class_12',
    type: 'confidence',
    dimension: 'Social',
    text: 'I am confident in my emotional resilience to manage high-stakes patient interactions, human counselling, or community welfare under pressure.',
  },

  // Enterprising (3 Interest, 1 Confidence)
  {
    id: 'c12_e_int_1',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Enterprising',
    text: 'I am excited by corporate strategy, startup venture creation, commercial law, investment banking, or brand marketing.',
  },
  {
    id: 'c12_e_int_2',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Enterprising',
    text: 'I want a career path where my compensation and trajectory are directly tied to leadership, negotiation, and high-impact commercial outcomes.',
  },
  {
    id: 'c12_e_int_3',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Enterprising',
    text: 'I actively follow market trends, venture capital rounds, regulatory policy shifts, and corporate expansion strategies across India.',
  },
  {
    id: 'c12_e_conf_1',
    segment: 'class_12',
    type: 'confidence',
    dimension: 'Enterprising',
    text: 'I feel confident in my ability to lead teams through commercial ambiguity, pitch high-stakes proposals, and drive strategic growth.',
  },

  // Conventional (3 Interest, 1 Confidence)
  {
    id: 'c12_c_int_1',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Conventional',
    text: 'I am drawn to chartered accountancy, corporate compliance, financial audit, actuarial science, or database systems management.',
  },
  {
    id: 'c12_c_int_2',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Conventional',
    text: 'I value rigorous regulatory frameworks, balance sheet accuracy, statutory tax compliance, and systematic risk management.',
  },
  {
    id: 'c12_c_int_3',
    segment: 'class_12',
    type: 'interest',
    dimension: 'Conventional',
    text: 'I prefer working in structured institutional frameworks where standards of practice are clear, documented, and reliably rewarded.',
  },
  {
    id: 'c12_c_conf_1',
    segment: 'class_12',
    type: 'confidence',
    dimension: 'Conventional',
    text: 'I am confident in my capacity to crack demanding professional certifications (like CA, CS, CMA, Actuarial) that demand extreme procedural precision.',
  },
];

export const CAREER_SWITCH_QUESTIONS: Question[] = [
  // Realistic (3 Interest, 1 Confidence)
  {
    id: 'cs_r_int_1',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Realistic',
    text: 'The parts of my professional work I have found most grounding involved tangible hardware, physical infrastructure, systems deployment, or direct operational reality.',
  },
  {
    id: 'cs_r_int_2',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Realistic',
    text: 'I feel drained by endless abstract corporate slide decks and crave moving into fields tied to renewable energy, manufacturing, robotics, or clinical biomedical tools.',
  },
  {
    id: 'cs_r_int_3',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Realistic',
    text: 'I want my next career move to produce clear, tangible physical outcomes that I can directly inspect rather than purely virtual artefacts.',
  },
  {
    id: 'cs_r_conf_1',
    segment: 'career_switch',
    type: 'confidence',
    dimension: 'Realistic',
    text: 'I am confident in my ability to acquire practical technical certifications, master site operations, or retrain in applied hardware/engineering domains.',
  },

  // Investigative (3 Interest, 1 Confidence)
  {
    id: 'cs_i_int_1',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Investigative',
    text: 'I find myself naturally reading deep research papers, building quantitative models, studying AI architectures, or diagnosing complex systemic root causes in my free time.',
  },
  {
    id: 'cs_i_int_2',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Investigative',
    text: 'My current role feels intellectually shallow; I want to transition into deep data science, bioinformatics, policy research, or technical R&D.',
  },
  {
    id: 'cs_i_int_3',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Investigative',
    text: 'I enjoy spending uninterrupted multi-day focus periods formulating models, validating hypotheses, and extracting insights from raw empirical evidence.',
  },
  {
    id: 'cs_i_conf_1',
    segment: 'career_switch',
    type: 'confidence',
    dimension: 'Investigative',
    text: 'I am confident in my capacity to upskill in rigorous mathematical reasoning, statistical methodologies, and specialized technical domains.',
  },

  // Artistic (3 Interest, 1 Confidence)
  {
    id: 'cs_a_int_1',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Artistic',
    text: 'I constantly feel an unfulfilled urge to craft, design, write, or direct original visual and narrative experiences that conventional corporate roles stifle.',
  },
  {
    id: 'cs_a_int_2',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Artistic',
    text: 'I want to pivot toward product design, brand identity systems, architectural restoration, creative strategy, or high-craft multimedia production.',
  },
  {
    id: 'cs_a_int_3',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Artistic',
    text: 'I judge the quality of my professional output by its elegance, human emotional resonance, and visual craftsmanship rather than mere administrative completion.',
  },
  {
    id: 'cs_a_conf_1',
    segment: 'career_switch',
    type: 'confidence',
    dimension: 'Artistic',
    text: 'I have confidence that my creative instincts and design craft can compete at a professional level once given dedicated focus and portfolio development.',
  },

  // Social (3 Interest, 1 Confidence)
  {
    id: 'cs_s_int_1',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Social',
    text: 'I want to leave purely transactional commercial goals to work in clinical psychology, healthcare administration, executive coaching, or education reform.',
  },
  {
    id: 'cs_s_int_2',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Social',
    text: 'The most satisfying milestones in my career have come from mentoring juniors, resolving human friction, or championing stakeholder well-being.',
  },
  {
    id: 'cs_s_int_3',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Social',
    text: 'I would trade a portion of corporate prestige for a role where I can witness the direct, measurable improvement in individual human lives.',
  },
  {
    id: 'cs_s_conf_1',
    segment: 'career_switch',
    type: 'confidence',
    dimension: 'Social',
    text: 'I possess the emotional intelligence, patient active listening, and clinical empathy required to pivot successfully into people-centric vocations.',
  },

  // Enterprising (3 Interest, 1 Confidence)
  {
    id: 'cs_e_int_1',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Enterprising',
    text: 'I feel constrained by middle-management bureaucracy and want to steer general management, found a venture, lead product P&L, or manage client acquisitions.',
  },
  {
    id: 'cs_e_int_2',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Enterprising',
    text: 'I am stimulated by high-stakes negotiations, competitive positioning, commercial expansion, and holding direct revenue responsibility.',
  },
  {
    id: 'cs_e_int_3',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Enterprising',
    text: 'I want to pivot toward executive leadership, investment strategy, or business development where initiative and risk-taking dictate rewards.',
  },
  {
    id: 'cs_e_conf_1',
    segment: 'career_switch',
    type: 'confidence',
    dimension: 'Enterprising',
    text: 'I am confident in my capacity to command rooms, drive revenue growth, manage commercial uncertainty, and negotiate enterprise deals.',
  },

  // Conventional (3 Interest, 1 Confidence)
  {
    id: 'cs_c_int_1',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Conventional',
    text: 'I crave transitioning into a role with high structural clarity, systematic auditing, regulatory compliance, risk governance, or institutional precision.',
  },
  {
    id: 'cs_c_int_2',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Conventional',
    text: 'I find chaos and lack of documented standard operating procedures distressing, and prefer managing financial operations, supply chain logistics, or data governance.',
  },
  {
    id: 'cs_c_int_3',
    segment: 'career_switch',
    type: 'interest',
    dimension: 'Conventional',
    text: 'I want to leverage my organizational diligence in chartered financial planning, corporate compliance, tax advisory, or operational process architecture.',
  },
  {
    id: 'cs_c_conf_1',
    segment: 'career_switch',
    type: 'confidence',
    dimension: 'Conventional',
    text: 'I am confident in my ability to establish rock-solid operational controls, manage complex compliance protocols, and eliminate structural risk.',
  },
];

export function getQuestionBankForSegment(segment: Segment): Question[] {
  switch (segment) {
    case 'class_10':
      return CLASS_10_QUESTIONS;
    case 'class_12':
      return CLASS_12_QUESTIONS;
    case 'career_switch':
      return CAREER_SWITCH_QUESTIONS;
  }
}
