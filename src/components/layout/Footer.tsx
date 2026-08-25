import React from 'react';
import { BrandLogo } from '../common/BrandLogo';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-black text-zinc-600 dark:text-zinc-400 text-xs py-14 px-6 sm:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* Brand Column */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <BrandLogo className="h-5 sm:h-6 w-auto text-zinc-900 dark:text-white" />
            <span className="font-semibold text-sm text-zinc-900 dark:text-white tracking-tight">
              Re\Start My Career
            </span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed max-w-xs">
            Find the direction you are drawn to. Then find the path to actually get there.
          </p>
        </div>

        {/* Target Stages Column - Requirement 7: PLAIN TEXT LABELS, NOT CLICKABLE */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-300 uppercase tracking-wider">
            Target Stages
          </h4>
          <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
            <li className="select-none">
              Career Switch (Professionals)
            </li>
            <li className="select-none">
              Class 12 (Degrees & Entrances)
            </li>
            <li className="select-none">
              Class 10 (Stream Selection)
            </li>
          </ul>
        </div>

        {/* Resources Column - Requirement 7: OPPORTUNITIES REMOVED */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-300 uppercase tracking-wider">
            Resources
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onSelectTab('help')}
                className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors text-left cursor-pointer"
              >
                Help & FAQ
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('feedback')}
                className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors text-left cursor-pointer"
              >
                Feedback
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('settings')}
                className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors text-left cursor-pointer"
              >
                Settings
              </button>
            </li>
          </ul>
        </div>

        {/* Governance & Principles */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-300 uppercase tracking-wider">
            Privacy & Principles
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onSelectTab('privacy')}
                className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors text-left cursor-pointer"
              >
                Privacy & Data Architecture
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('terms')}
                className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors text-left cursor-pointer"
              >
                Psychometric Methodology
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Disclaimers & Copyright */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
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
