import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  ExternalLink, 
  ShieldCheck, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { Opportunity, SupportedLanguage, ReservationCategory } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { SCHOLARSHIPS_DATA } from '../../data/scholarships';

interface OpportunitiesViewProps {
  userCategory?: ReservationCategory;
  userIncome?: string;
  language: SupportedLanguage;
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  userCategory,
  userIncome,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const filteredOpportunities = SCHOLARSHIPS_DATA.filter((opp) => {
    // Search query match
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.coverage.toLowerCase().includes(searchTerm.toLowerCase());

    // Category match
    const matchesCat = selectedCategory === 'All' || opp.categoryMatch.includes(selectedCategory as ReservationCategory);

    // Type match
    const matchesType = selectedType === 'All' || opp.type === selectedType;

    return matchesSearch && matchesCat && matchesType;
  });

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen pb-24 selection:bg-blue-600/30 selection:text-blue-200">
      
      {/* Header */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Indian Financial Support Registry</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            {t.nav_opportunities}
          </h1>
          <p className="text-xs text-zinc-400 max-w-2xl">
            Accredited central government, state affirmative action, and merit-cum-means financial schemes to support your chosen educational pathway.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Transparent Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-start gap-3 text-xs text-zinc-300">
          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Financial background and reservation criteria are used <strong>exclusively</strong> to match you with funding opportunities. They never restrict or bias your career recommendations.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search scheme name, provider..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          {/* Category & Type Selectors */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 focus:outline-none focus:border-blue-500 font-mono"
            >
              <option value="All">All Categories</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 focus:outline-none focus:border-blue-500 font-mono"
            >
              <option value="All">All Types</option>
              <option value="government_central">Central Government</option>
              <option value="state_scheme">State Scheme</option>
              <option value="private_corporate">Private / Corporate</option>
              <option value="institutional">Institutional</option>
            </select>
          </div>

        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    {opp.type.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {opp.applicationDeadline}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-mono text-zinc-400">{opp.provider}</span>
                  <h3 className="font-heading text-base font-bold text-zinc-100 mt-0.5">
                    {opp.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {opp.description}
                </p>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1 text-xs">
                  <span className="font-mono text-[10px] text-zinc-400 uppercase">Coverage / Benefit</span>
                  <p className="text-emerald-300 font-mono font-semibold">
                    {opp.coverage}
                  </p>
                </div>

                <div className="space-y-1 text-[11px] text-zinc-400">
                  <p><strong>Eligibility:</strong> {opp.eligibility}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <a
                  href={opp.applicationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 font-mono"
                >
                  <span>Official Application Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
};
