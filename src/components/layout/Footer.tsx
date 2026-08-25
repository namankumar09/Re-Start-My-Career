import React from 'react';
import { SupportedLanguage } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { BrandLogo } from '../common/BrandLogo';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  language: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="w-full border-t border-zinc-900 bg-black text-zinc-400 text-xs py-14 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* Brand Column */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <BrandLogo className="h-5 sm:h-6 w-auto text-white" />
            <span className="font-semibold text-sm text-white tracking-tight">
              Re\Start My Career
            </span>
          </div>
          <p className="text-zinc-400 text-xs leading-relaxed max-w-xs">
            Find the direction you are drawn to. Then find the path to actually get there.
          </p>
        </div>

        {/* Pathways Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Target Stages
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onSelectTab('onboarding')}
                className="hover:text-white transition-colors text-left"
              >
                Career Switch (Professionals)
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('onboarding')}
                className="hover:text-white transition-colors text-left"
              >
                Class 12 (Degrees & Entrances)
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('onboarding')}
                className="hover:text-white transition-colors text-left"
              >
                Class 10 (Stream Selection)
              </button>
            </li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Resources
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onSelectTab('help')}
                className="hover:text-white transition-colors text-left"
              >
                {t.nav_help}
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('opportunities')}
                className="hover:text-white transition-colors text-left"
              >
                {t.nav_opportunities}
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('feedback')}
                className="hover:text-white transition-colors text-left"
              >
                {t.nav_feedback}
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('settings')}
                className="hover:text-white transition-colors text-left"
              >
                {t.nav_settings}
              </button>
            </li>
          </ul>
        </div>

        {/* Governance & Privacy */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Privacy & Principles
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onSelectTab('help')}
                className="hover:text-white transition-colors text-left"
              >
                Privacy & Data Architecture
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('help')}
                className="hover:text-white transition-colors text-left"
              >
                Psychometric Methodology
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Disclaimers & Copyright */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
        <p>
          Re\Start My Career · Psychometric signal modeling for Indian career & educational pathways.
        </p>
        <p className="text-center md:text-right">
          Career guidance system. All psychometric calculations run deterministically.
        </p>
      </div>
    </footer>
  );
};
