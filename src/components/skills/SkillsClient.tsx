"use client";

import React, { useState, useMemo } from 'react';
import { Domain, SKILL_DOMAINS } from '@/data/skills';
import { SkillCard } from './SkillCard';

export function SkillsClient() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Memoize the filtered domains to prevent unnecessary recalculations
  const displayedDomains = useMemo(() => {
    if (activeFilter === 'all') {
      return SKILL_DOMAINS;
    }
    return SKILL_DOMAINS.filter(domain => domain.id === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-12">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-md text-sm font-mono transition-colors ${
            activeFilter === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-black'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white'
          }`}
        >
          All Domains
        </button>
        {SKILL_DOMAINS.map(domain => (
          <button
            key={domain.id}
            onClick={() => setActiveFilter(domain.id)}
            className={`px-4 py-2 rounded-md text-sm font-mono transition-colors ${
              activeFilter === domain.id
                ? 'bg-slate-900 text-white dark:bg-white dark:text-black'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white'
            }`}
          >
            {domain.title}
          </button>
        ))}
      </div>

      {/* Domain Sections */}
      <div className="space-y-16">
        {displayedDomains.map(domain => (
          <div key={domain.id} className="space-y-6 animate-fade-in-up">
            <div className="border-b border-slate-200 dark:border-neutral-800 pb-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-mono">
                {domain.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1">
                {domain.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {domain.skills.map((skill, idx) => (
                <SkillCard key={idx} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
