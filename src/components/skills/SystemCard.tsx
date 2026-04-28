import React from 'react';
import Link from 'next/link';
import { SystemExperience } from '@/data/skills';

interface SystemCardProps {
  system: SystemExperience;
}

export function SystemCard({ system }: SystemCardProps) {
  const content = (
    <div className={`border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-[#1a1a1a] p-6 sm:p-8 rounded-lg relative overflow-hidden group ${system.href ? 'hover:border-slate-300 dark:hover:border-neutral-700 transition-colors cursor-pointer' : ''}`}>
      <div className="absolute top-0 left-0 w-1 h-full bg-slate-300 dark:bg-neutral-700 transition-colors group-hover:bg-blue-500 dark:group-hover:bg-blue-500/80"></div>
      
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-neutral-800 pb-4">
          <h3 className={`text-xl font-bold font-mono mb-2 ${system.href ? 'group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors' : 'text-slate-900 dark:text-white'}`}>
            {system.name}
          </h3>
          <div className="inline-flex items-center bg-slate-200 dark:bg-neutral-800 px-2 py-1 rounded text-xs font-mono text-slate-600 dark:text-neutral-400">
            {system.environment}
          </div>
        </div>

        {/* Narrative Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Left Column */}
          <div className="space-y-6">
            <Section title="Problem & Constraints">
              <p className="text-sm text-slate-700 dark:text-neutral-300 mb-2">{system.problem}</p>
              <p className="text-sm text-slate-600 dark:text-neutral-400 border-l-2 border-amber-500/50 pl-3 italic">{system.constraints}</p>
            </Section>

            <Section title="Architecture Decisions">
              <p className="text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">{system.architectureDecisions}</p>
            </Section>
            
            <Section title="Trade-Offs">
              <p className="text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">{system.tradeOffs}</p>
            </Section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Section title="Failure Handling & Debugging">
              <p className="text-sm text-slate-700 dark:text-neutral-300 mb-3 leading-relaxed">
                <span className="font-semibold text-slate-900 dark:text-neutral-200">Failure Mode:</span> {system.failureHandling}
              </p>
              <p className="text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">
                <span className="font-semibold text-slate-900 dark:text-neutral-200">Insights:</span> {system.debugging}
              </p>
            </Section>

            <Section title="Measured Outcome & Impact">
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-300 bg-slate-100 dark:bg-neutral-800 p-3 rounded border border-slate-200 dark:border-neutral-700">
                  <span className="block text-xs font-bold text-slate-500 dark:text-neutral-500 mb-1 uppercase tracking-wider">Technical Outcome</span>
                  {system.outcome}
                </p>
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded border border-emerald-100 dark:border-emerald-500/20">
                  <span className="block text-xs font-bold text-emerald-600/70 dark:text-emerald-500/70 mb-1 uppercase tracking-wider">Business Impact</span>
                  {system.businessImpact}
                </p>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );

  if (system.href) {
    return (
      <Link href={system.href} className="block no-underline">
        {content}
      </Link>
    );
  }

  return content;
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-mono font-bold tracking-wider text-slate-500 dark:text-neutral-500 uppercase mb-2">
        {title}
      </h4>
      {children}
    </div>
  );
}
