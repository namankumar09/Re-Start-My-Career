const fs = require('fs');
let content = fs.readFileSync('src/data/careerDatabase.ts', 'utf8');

// Remove 'class_10' from existing segments
content = content.replace(/'class_10',\s*/g, '');
content = content.replace(/,\s*'class_10'/g, '');
content = content.replace(/'class_10'/g, ''); // just in case it's the only one left, though segments should have more

// Append new entries before the closing bracket of the CAREER_DATABASE array
const streamEntries = `
  // ================= 8. CLASS 10 STREAMS (Foundational Pathways) =================
  {
    id: 'stream_science_pcm',
    title: 'Science Stream (PCM: Physics, Chemistry, Math)',
    segments: ['class_10'],
    primaryDimensions: ['Realistic', 'Investigative'],
    secondaryDimensions: ['Conventional'],
    path: 'Take Physics, Chemistry, and Mathematics in Class 11-12. Keeps engineering, architecture, aviation, and data science open.',
    exams: ['Leads to JEE, BITSAT, NDA, NATA'],
    courses: ['B.Tech, B.Arch, B.Sc Mathematics/Physics/Data Science'],
    institutions: ['Any recognized Higher Secondary School / Junior College'],
    reality: 'Highly analytical and calculation-heavy. Expect daily problem-solving, rigorous formula application, and significant coaching/prep time for entrance exams.',
    incomeRange: 'N/A (Foundational stream)',
    timeToEntry: '2 years (Class 11–12)',
    riskLevel: 'Low',
    transferableSkills: ['Calculus & Algebra', 'Analytical problem solving', 'Physics principles'],
    isIncomePreservingFriendly: false,
    transitionType: 'Standard path'
  },
  {
    id: 'stream_science_pcb',
    title: 'Science Stream (PCB: Physics, Chemistry, Biology)',
    segments: ['class_10'],
    primaryDimensions: ['Investigative', 'Social'],
    secondaryDimensions: ['Realistic'],
    path: 'Take Physics, Chemistry, and Biology in Class 11-12. Keeps medicine, allied healthcare, biotechnology, and agricultural sciences open.',
    exams: ['Leads to NEET-UG, CUET-UG (Life Sciences)'],
    courses: ['MBBS, BDS, B.Sc Nursing, B.Sc Biotechnology, BPT'],
    institutions: ['Any recognized Higher Secondary School / Junior College'],
    reality: 'Heavy memorization combined with conceptual application. Requires long study hours, especially for NEET preparation, with focus on biological processes and organic chemistry.',
    incomeRange: 'N/A (Foundational stream)',
    timeToEntry: '2 years (Class 11–12)',
    riskLevel: 'Low',
    transferableSkills: ['Biological concepts', 'Memorization & recall', 'Chemical structures'],
    isIncomePreservingFriendly: false,
    transitionType: 'Standard path'
  },
  {
    id: 'stream_science_pcmb',
    title: 'Science Stream (PCMB: Physics, Chem, Math, Biology)',
    segments: ['class_10'],
    primaryDimensions: ['Investigative'],
    secondaryDimensions: ['Realistic', 'Social'],
    path: 'Take Physics, Chemistry, Mathematics, and Biology in Class 11-12. Keeps literally every science, engineering, and medical field open.',
    exams: ['Leads to JEE, NEET, CUET, KVPY'],
    courses: ['Keeps all engineering and medical bachelor options open'],
    institutions: ['Any recognized Higher Secondary School / Junior College'],
    reality: 'The most academically intense stream. Expect extreme workload managing both Mathematics and Biology curriculums simultaneously.',
    incomeRange: 'N/A (Foundational stream)',
    timeToEntry: '2 years (Class 11–12)',
    riskLevel: 'High', // High workload risk
    transferableSkills: ['Multidisciplinary science', 'Extreme time management', 'Quantitative & Biological synthesis'],
    isIncomePreservingFriendly: false,
    transitionType: 'Standard path'
  },
  {
    id: 'stream_commerce_maths',
    title: 'Commerce with Mathematics',
    segments: ['class_10'],
    primaryDimensions: ['Enterprising', 'Conventional'],
    secondaryDimensions: ['Investigative'],
    path: 'Take Accountancy, Business Studies, Economics, and Mathematics in Class 11-12. Essential for top-tier finance, actuarial science, and economics degrees.',
    exams: ['Leads to CUET-UG (Commerce/Econ), CA Foundation, ACET'],
    courses: ['B.Com (Hons), B.A. Economics (Hons), CA, BBA'],
    institutions: ['Any recognized Higher Secondary School / Junior College'],
    reality: 'Balances theoretical business concepts with rigorous mathematical application (Calculus/Statistics). Opens doors to premier economics and finance programs.',
    incomeRange: 'N/A (Foundational stream)',
    timeToEntry: '2 years (Class 11–12)',
    riskLevel: 'Low',
    transferableSkills: ['Financial accounting', 'Statistical mathematics', 'Microeconomic theory'],
    isIncomePreservingFriendly: false,
    transitionType: 'Standard path'
  },
  {
    id: 'stream_commerce_without_maths',
    title: 'Commerce without Mathematics',
    segments: ['class_10'],
    primaryDimensions: ['Conventional', 'Enterprising'],
    secondaryDimensions: ['Social'],
    path: 'Take Accountancy, Business Studies, Economics, and a 5th subject (e.g., Informatics, PE, Entrepreneurship). Keeps accounting, business management, and law open.',
    exams: ['Leads to CUET-UG, CA Foundation, CLAT'],
    courses: ['B.Com, BBA, B.A. LL.B, Company Secretary'],
    institutions: ['Any recognized Higher Secondary School / Junior College'],
    reality: 'Focuses heavily on accounting principles, business theory, and commercial law. Less mathematically intense, focusing more on financial documentation and business logic.',
    incomeRange: 'N/A (Foundational stream)',
    timeToEntry: '2 years (Class 11–12)',
    riskLevel: 'Low',
    transferableSkills: ['Bookkeeping', 'Business law', 'Organizational theory'],
    isIncomePreservingFriendly: false,
    transitionType: 'Standard path'
  },
  {
    id: 'stream_arts_humanities',
    title: 'Arts / Humanities',
    segments: ['class_10'],
    primaryDimensions: ['Artistic', 'Social'],
    secondaryDimensions: ['Investigative'],
    path: 'Take subjects like History, Political Science, Psychology, Sociology, Literature, or Fine Arts. Leads to psychology, design, law, journalism, and civil services.',
    exams: ['Leads to CUET-UG (Arts), CLAT, NID DAT, UCEED'],
    courses: ['B.A. (Hons) Psychology/Pol Science/History, B.Des, B.A. LL.B'],
    institutions: ['Any recognized Higher Secondary School / Junior College'],
    reality: 'Requires extensive reading, essay writing, critical thinking, and social theory analysis. Highly flexible, leading into creative, academic, or social impact fields.',
    incomeRange: 'N/A (Foundational stream)',
    timeToEntry: '2 years (Class 11–12)',
    riskLevel: 'Low',
    transferableSkills: ['Critical essay writing', 'Historical/Social analysis', 'Creative communication'],
    isIncomePreservingFriendly: false,
    transitionType: 'Standard path'
  }
];`;

content = content.replace(/\s*\];\s*$/, streamEntries);

// Ensure empty segment array fix if needed
content = content.replace(/segments:\s*\[\s*\]/g, "segments: ['class_12']"); // Safety fallback

fs.writeFileSync('src/data/careerDatabase.ts', content);
console.log('Done');
