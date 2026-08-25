import { SupportedLanguage } from '../types';

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Brand & Header
    brand_name: 're\\start my career',
    tagline: 'Find the direction you are drawn to. Then find the path to actually get there.',
    nav_dashboard: 'Dashboard',
    nav_assessment: 'Assessment',
    nav_report: 'Report',
    nav_saved_careers: 'Saved Careers',
    nav_counsellor: 'AI Counsellor',
    nav_opportunities: 'Opportunities',
    nav_feedback: 'Feedback',
    nav_help: 'Help / FAQ',
    nav_settings: 'Settings',
    nav_demo_mode: 'Demo Personas',
    nav_login: 'Sign In',
    nav_logout: 'Sign Out',
    
    // Landing
    hero_statement_1: "You don't need more career advice.",
    hero_statement_2: 'You need a clearer signal.',
    hero_supporting: 're\\start my career separates what pulls you from what you believe you’re capable of — then turns that difference into an actionable career path.',
    cta_find_direction: 'Find my direction',
    cta_see_how: 'See how it works',
    cta_try_demo: 'Explore with Demo Persona',

    // Problem & Signal
    section_problem_title: 'The Problem',
    section_problem_p1: 'Most career guidance in India asks only one superficial question: "What are you good at?"',
    section_problem_p2: 'This leads millions of students into high-prestige degrees they secretly dislike, or forces professionals to stay in exhausting careers because they lack a systematic transition signal.',
    section_signal_title: 'The Signal: Interest vs. Confidence',
    section_signal_caption: 'Blue is what pulls you. Green is what you believe you can do. The space between them is where careers get quietly abandoned.',

    // Three Moments
    segment_01_title: '01 — Career Switch',
    segment_01_desc: 'For people already working who are considering a different direction or escaping workplace burnout.',
    segment_02_title: '02 — Class 12',
    segment_02_desc: 'Choose your undergraduate degree, entrance exam focus, or professional trajectory with grounded reality.',
    segment_03_title: '03 — Class 10',
    segment_03_desc: 'Choose your academic stream (PCM, PCB, Commerce, Humanities) based on intrinsic curiosity.',

    // Assessment UI
    question_indicator: 'Question',
    of: 'of',
    scale_1: 'Strongly disagree',
    scale_2: 'Disagree',
    scale_3: 'Neutral',
    scale_4: 'Agree',
    scale_5: 'Strongly agree',
    btn_back: 'Back',
    btn_next: 'Next',
    btn_submit_assessment: 'Generate Career Intelligence Report',
    keyboard_hint: 'Tip: Press keys 1–5 on your keyboard for instant selection',

    // Report
    tab_for_you: 'For you',
    tab_for_parents: 'For your parents',
    report_title_user: 'Career Intelligence & RIASEC Blueprint',
    gap_panel_title: 'Interest vs. Confidence Gap Analysis',
    latent_badge: 'Latent Gap Detected',
    aligned_badge: 'Calibrated Alignment',
    overbuilt_badge: 'Confidence Exceeds Interest',
    hexagon_heading: 'Holland RIASEC Profile',
    recommendations_heading: 'Ranked Career Directions',
    watchouts_heading: 'Critical Watch-outs & Realities',
    thirty_days_heading: 'Next 30 Days Action Plan',
    opportunities_heading: 'Matched Scholarships & Schemes',

    // Parent Report
    parent_report_title: 'Family Career Briefing & Pathway Summary',
    parent_rationale_heading: 'What was left out of this version, and why',
    parent_ask_heading: 'One Small Ask for Parents',
    btn_print: 'Print Report',
    btn_copy: 'Copy Text Summary',

    // Saved Careers
    saved_empty: 'You haven’t saved a direction yet.',
    saved_empty_sub: 'Explore your recommendations and bookmark pathways you wish to track.',
    btn_save_career: 'Save to My Direction',
    btn_saved: 'Saved',
    btn_remove: 'Remove',

    // AI Counsellor
    ai_title: 'AI Career Counsellor',
    ai_subtitle: 'Evidence-grounded dialogue referencing your exact RIASEC scores, gaps, and Indian pathway realities.',
    ai_placeholder: 'Ask about degree alternatives, parent conversations, or transition risks...',
    btn_send: 'Send',
    ai_fallback_notice: 'Offline mode active: Answers are generated from your verified assessment data.',

    // Settings
    settings_title: 'System Preferences',
    appearance_label: 'Appearance',
    language_label: 'Language',
    ai_config_label: 'AI Service Architecture',
    notifications_label: 'Notification Channels',
    privacy_label: 'Data Integrity & Privacy',
    btn_delete_all: 'Delete All My Data',
  },
  hi: {
    // Brand & Header
    brand_name: 're\\start my career',
    tagline: 'वह दिशा खोजें जो आपको आकर्षित करती है। फिर वहां तक पहुंचने का वास्तविक मार्ग खोजें।',
    nav_dashboard: 'डैशबोर्ड',
    nav_assessment: 'मूल्यांकन',
    nav_report: 'रिपोर्ट',
    nav_saved_careers: 'सहेजे गए करियर',
    nav_counsellor: 'AI परामर्शदाता',
    nav_opportunities: 'छात्रवृत्तियां व योजनाएं',
    nav_feedback: 'प्रतिक्रिया',
    nav_help: 'सहायता / प्रश्नोत्तरी',
    nav_settings: 'सेटिंग्स',
    nav_demo_mode: 'डेमो प्रोफाइल',
    nav_login: 'लॉग इन करें',
    nav_logout: 'लॉग आउट',

    // Landing
    hero_statement_1: 'आपको केवल करियर सलाह नहीं चाहिए।',
    hero_statement_2: 'आपको एक स्पष्ट और सटीक संकेत चाहिए।',
    hero_supporting: 're\\start my career आपकी वास्तविक रुचि और आपके आत्मविश्वास के बीच के अंतर को पहचानता है — और उसे एक ठोस करियर मार्ग में बदलता है।',
    cta_find_direction: 'मेरी दिशा खोजें',
    cta_see_how: 'देखें यह कैसे काम करता है',
    cta_try_demo: 'डेमो प्रोफाइल से देखें',

    // Problem & Signal
    section_problem_title: 'मूल समस्या',
    section_problem_p1: 'भारत में अधिकांश करियर मार्गदर्शन केवल एक सतही प्रश्न पूछता है: "आप किसमें अच्छे हैं?"',
    section_problem_p2: 'इससे लाखों छात्र ऐसे दबाव वाले पाठ्यक्रमों में चले जाते हैं जिन्हें वे पसंद नहीं करते।',
    section_signal_title: 'संकेत: रुचि बनाम आत्मविश्वास',
    section_signal_caption: 'नीला रंग वह है जो आपको आकर्षित करता है। हरा रंग वह है जो आप मानते हैं कि आप कर सकते हैं। इनके बीच का अंतर वह जगह है जहां करियर छूट जाते हैं।',

    // Three Moments
    segment_01_title: '01 — करियर बदलाव (Career Switch)',
    segment_01_desc: 'कामकाजी पेशेवरों के लिए जो नई दिशा या सुरक्षित करियर ट्रांजिशन चाहते हैं।',
    segment_02_title: '02 — कक्षा 12 (Class 12)',
    segment_02_desc: 'अपनी डिग्री, प्रवेश परीक्षा (JEE/NEET/CUET/CLAT) या उच्च शिक्षा का सही चयन करें।',
    segment_03_title: '03 — कक्षा 10 (Class 10)',
    segment_03_desc: 'अपनी आंतरिक जिज्ञासा के आधार पर 11वीं के लिए सही स्ट्रीम (PCM, PCB, कॉमर्स, आर्ट्स) चुनें।',

    // Assessment UI
    question_indicator: 'प्रश्न',
    of: 'का',
    scale_1: 'पूरी तरह असहमत',
    scale_2: 'असहमत',
    scale_3: 'तटस्थ',
    scale_4: 'सहमत',
    scale_5: 'पूरी तरह सहमत',
    btn_back: 'पीछे',
    btn_next: 'आगे',
    btn_submit_assessment: 'करियर रिपोर्ट तैयार करें',
    keyboard_hint: 'सुझाव: त्वरित चयन के लिए कीबोर्ड पर 1 से 5 नंबर दबाएं',

    // Report
    tab_for_you: 'आपके लिए',
    tab_for_parents: 'अभिभावकों के लिए',
    report_title_user: 'करियर इंटेलिजेंस और RIASEC ब्लूप्रिंट',
    gap_panel_title: 'रुचि बनाम आत्मविश्वास अंतर विश्लेषण',
    latent_badge: 'अव्यक्त क्षमता (Latent Gap)',
    aligned_badge: 'संतुलित तालमेल (Aligned)',
    overbuilt_badge: 'आत्मविश्वास अधिक (Overbuilt)',
    hexagon_heading: 'हॉलैंड RIASEC हेक्सागोन',
    recommendations_heading: 'अनुशंसित करियर मार्ग',
    watchouts_heading: 'सावधानियां और जमीनी हकीकत',
    thirty_days_heading: 'अगले 30 दिनों की कार्ययोजना',
    opportunities_heading: 'छात्रवृत्तियां और सरकारी योजनाएं',

    // Parent Report
    parent_report_title: 'पारिवारिक करियर समीक्षा एवं सुरक्षा सारांश',
    parent_rationale_heading: 'इस रिपोर्ट में क्या नहीं रखा गया, और क्यों',
    parent_ask_heading: 'अभिभावकों से एक छोटा सा अनुरोध',
    btn_print: 'रिपोर्ट प्रिंट करें',
    btn_copy: 'सारांश कॉपी करें',

    // Saved Careers
    saved_empty: 'आपने अभी तक कोई करियर सुरक्षित नहीं किया है।',
    saved_empty_sub: 'अपनी अनुशंसाओं का अन्वेषण करें और पसंदीदा करियर को बुकमार्क करें।',
    btn_save_career: 'दिशा सहेजें',
    btn_saved: 'सहेजा गया',
    btn_remove: 'हटाएं',

    // AI Counsellor
    ai_title: 'AI करियर परामर्शदाता',
    ai_subtitle: 'आपके वास्तविक अंकों, रुचि-अंतर और भारतीय शिक्षा प्रणाली के आधार पर सीधा संवाद।',
    ai_placeholder: 'डिग्री विकल्प, माता-पिता से बातचीत या करियर जोखिम के बारे में पूछें...',
    btn_send: 'भेजें',
    ai_fallback_notice: 'ऑफ़लाइन मोड सक्रिय: उत्तर आपके सत्यापित मूल्यांकन डेटा से दिए जा रहे हैं।',

    // Settings
    settings_title: 'सिस्टम प्राथमिकताएं',
    appearance_label: 'दिखावट (थीम)',
    language_label: 'भाषा',
    ai_config_label: 'AI सेवा संरचना',
    notifications_label: 'सूचनाएं',
    privacy_label: 'डेटा सुरक्षा और गोपनीयता',
    btn_delete_all: 'मेरा सारा डेटा हटाएं',
  },
};
