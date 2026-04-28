import React from 'react';
import { Skill } from '@/data/skills';

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#121212] p-5 transition-all duration-300 hover:border-slate-400 dark:hover:border-neutral-600 hover:shadow-sm">
      {/* Top Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-mono text-base font-bold text-slate-900 dark:text-slate-100">
          {skill.name}
        </h3>
        {skill.isRecent && (
          <span className="flex h-2 w-2 relative mt-1" title="Core/Active Stack">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        )}
      </div>

      {/* Context & Impact (Always visible now, high signal) */}
      <div className="mt-3 space-y-3">
        <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
          {skill.context}
        </p>
        <p className="text-sm text-slate-800 dark:text-neutral-200 font-medium border-l-2 border-slate-300 dark:border-blue-500/50 pl-3 italic group-hover:border-blue-500 transition-colors">
          "{skill.impact}"
        </p>
      </div>
    </div>
  );
}
