import React from 'react';
import { SkillsClient } from '@/components/skills/SkillsClient';
import { SystemCard } from '@/components/skills/SystemCard';
import { SYSTEMS_EXPERIENCE, ENGINEERING_DECISIONS, FAILURES_LESSONS } from '@/data/skills';

export const metadata = {
  title: 'Skills | System Architecture & Engineering',
  description: 'Technical expertise in system architecture, distributed systems, backend engineering, and concurrency.',
};

export default function SkillsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 pb-24 space-y-24">
      {/* Header Section */}
      <section className="space-y-4 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Technical Expertise & Systems Experience
        </h1>
        <p className="text-lg text-slate-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          Focused on building high-throughput, low-latency infrastructure and distributed systems. 
          Expertise in concurrency, memory management, and scalable backend architectures.
        </p>
      </section>

      {/* Systems Engineering Section */}
      <section className="space-y-8">
        <div className="border-b border-slate-200 dark:border-neutral-800 pb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
            Systems I've Built / Worked On
          </h2>
          <p className="text-slate-500 dark:text-neutral-400 mt-2">
            Architectural challenges and high-scale implementations.
          </p>
        </div>
        
        <div className="space-y-6">
          {SYSTEMS_EXPERIENCE.map((system, idx) => (
            <SystemCard key={idx} system={system} />
          ))}
        </div>
      </section>

      {/* Domain Skills Section (Interactive Client) */}
      <section className="space-y-8">
        <div className="border-b border-slate-200 dark:border-neutral-800 pb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
            Core Technologies
          </h2>
          <p className="text-slate-500 dark:text-neutral-400 mt-2">
            Curated, high-signal tools actively used in production or deep personal work.
          </p>
        </div>

        <SkillsClient />
      </section>

      {/* Engineering Decisions Section */}
      <section className="space-y-8">
        <div className="border-b border-slate-200 dark:border-neutral-800 pb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
            Key Engineering Decisions
          </h2>
          <p className="text-slate-500 dark:text-neutral-400 mt-2">
            Cross-system architectural choices and trade-offs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ENGINEERING_DECISIONS.map((decision, idx) => (
            <div key={idx} className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#121212] p-6 rounded-lg hover:border-slate-400 dark:hover:border-neutral-600 transition-colors">
              <h3 className="font-mono text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">{decision.title}</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono text-slate-400 dark:text-neutral-500 block mb-1">CONTEXT</span>
                  <p className="text-sm text-slate-600 dark:text-neutral-400">{decision.context}</p>
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 dark:text-neutral-500 block mb-1">DECISION</span>
                  <p className="text-sm text-slate-700 dark:text-neutral-300 border-l-2 border-blue-500/50 pl-3 italic">{decision.decision}</p>
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 dark:text-neutral-500 block mb-1">CONSEQUENCE</span>
                  <p className="text-sm text-slate-800 dark:text-neutral-200 font-medium">{decision.consequence}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Failures & Lessons Section */}
      <section className="space-y-8">
        <div className="border-b border-slate-200 dark:border-neutral-800 pb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
            Failures & Lessons
          </h2>
          <p className="text-slate-500 dark:text-neutral-400 mt-2">
            Real mistakes and the fixes that resolved them.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAILURES_LESSONS.map((lesson, idx) => (
            <div key={idx} className="border border-red-200 dark:border-red-900/30 bg-red-50/30 dark:bg-[#1a0f0f] p-6 rounded-lg hover:border-red-300 dark:hover:border-red-800 transition-colors">
              <h3 className="font-mono text-lg font-bold text-red-800 dark:text-red-400 mb-4">{lesson.title}</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono text-red-500/70 dark:text-red-500/50 block mb-1">WHAT BROKE</span>
                  <p className="text-sm text-slate-700 dark:text-neutral-300">{lesson.whatBroke}</p>
                </div>
                <div>
                  <span className="text-xs font-mono text-red-500/70 dark:text-red-500/50 block mb-1">IMPACT</span>
                  <p className="text-sm text-red-800 dark:text-red-300 font-medium">{lesson.impact}</p>
                </div>
                <div>
                  <span className="text-xs font-mono text-red-500/70 dark:text-red-500/50 block mb-1">THE FIX</span>
                  <p className="text-sm text-emerald-800 dark:text-emerald-400 border-l-2 border-emerald-500/50 pl-3 italic">{lesson.fix}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
