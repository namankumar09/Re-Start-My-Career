import React from 'react';
import { Shield, Sparkles, HelpCircle, FileText, Lock } from 'lucide-react';
import { SupportedLanguage } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  language: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        
        {/* Brand Column */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-400 font-mono text-xs font-bold">
              r\
            </div>
            <span className="font-heading font-semibold text-sm text-zinc-100 tracking-tight">
              re\start my career
            </span>
          </div>
          <p className="text-zinc-400 text-xs leading-relaxed">
            Find the direction you are drawn to. Then find the path to actually get there.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
            <span>Holland RIASEC Engine Online</span>
          </div>
        </div>

        {/* Pathways Column */}
        <div>
          <h4 className="font-heading text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-3">
            Target Moments
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onSelectTab('onboarding')}
                className="hover:text-zinc-200 transition-colors text-left"
              >
                01 — Career Switch (Professionals)
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('onboarding')}
                className="hover:text-zinc-200 transition-colors text-left"
              >
                02 — Class 12 (Degrees & Entrances)
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('onboarding')}
                className="hover:text-zinc-200 transition-colors text-left"
              >
                03 — Class 10 (Stream Selection)
              </button>
            </li>
          </ul>
        </div>

        {/* Resources Column */}
        <div>
          <h4 className="font-heading text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-3">
            Intelligence & Support
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onSelectTab('help')}
                className="hover:text-zinc-200 transition-colors text-left"
              >
                {t.nav_help}
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('opportunities')}
                className="hover:text-zinc-200 transition-colors text-left"
              >
                {t.nav_opportunities}
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('feedback')}
                className="hover:text-zinc-200 transition-colors text-left"
              >
                {t.nav_feedback}
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('settings')}
                className="hover:text-zinc-200 transition-colors text-left"
              >
                {t.nav_settings}
              </button>
            </li>
          </ul>
        </div>

        {/* Trust & Legal Column */}
        <div>
          <h4 className="font-heading text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-3">
            Governance & Privacy
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onSelectTab('privacy')}
                className="hover:text-zinc-200 transition-colors text-left flex items-center gap-1.5"
              >
                <Lock className="w-3 h-3 text-zinc-400" />
                <span>Privacy Architecture</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('terms')}
                className="hover:text-zinc-200 transition-colors text-left flex items-center gap-1.5"
              >
                <FileText className="w-3 h-3 text-zinc-400" />
                <span>Terms of Service (Prototype)</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Disclaimers & Copyright */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400 font-mono">
        <p>
          re\start my career — Psychometric signal modeling for Indian educational & career decisions.
        </p>
        <p className="text-center md:text-right text-zinc-400">
          Career guidance platform. Not a psychological diagnosis. Final production deployment requires legal & clinical audit.
        </p>
      </div>
    </footer>
  );
};
