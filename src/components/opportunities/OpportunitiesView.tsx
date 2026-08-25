import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { ReservationCategory } from '../../types';
import { SCHOLARSHIPS_DATA } from '../../data/scholarships';

interface OpportunitiesViewProps {
  userCategory?: ReservationCategory;
  userIncome?: string;
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  userCategory,
  userIncome,
}) => {
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
    <div className="w-full bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 min-h-screen pb-24 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-black dark:selection:text-white transition-colors duration-200">
      
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50/80 dark:bg-black/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Indian Financial Support Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Scholarships & Schemes
          </h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Accredited central government, state affirmative action, and merit-cum-means financial schemes to support your chosen educational pathway.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Transparent Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start gap-3 text-xs text-zinc-700 dark:text-zinc-300">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Scholarships and reservation criteria are provided purely for financial feasibility planning. PathFind recommendations are strictly psychometric and are never narrowed based on socioeconomic background.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative sm:col-span-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by scholarship, provider, or state..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-500"
            >
              <option value="All">All Social Categories</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
            </select>
          </div>

          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-500"
            >
              <option value="All">All Types (Central, State, Corporate)</option>
              <option value="government_central">Central Government</option>
              <option value="government_state">State Government</option>
              <option value="private_merit">Merit / Corporate CSR</option>
            </select>
          </div>
        </div>

        {/* Matched Count */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 px-1">
          <span>Showing {filteredOpportunities.length} opportunities</span>
          {userCategory && <span>Profile Filter: {userCategory}</span>}
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-6 shadow-sm hover:border-zinc-400 dark:hover:border-zinc-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-medium">
                    {opp.provider}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 capitalize">
                    {opp.type.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                  {opp.title}
                </h3>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {opp.description}
                </p>

                <div className="p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                    <span>Coverage:</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{opp.coverage}</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                    <span>Eligible Categories:</span>
                    <span className="text-zinc-900 dark:text-zinc-200 font-mono">{opp.categoryMatch.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500">Official Gov Portal</span>
                <a
                  href={opp.applicationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-zinc-900 dark:text-white hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Apply Online</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
};
