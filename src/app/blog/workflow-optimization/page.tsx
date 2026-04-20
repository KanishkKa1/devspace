"use client";

import { Activity, Zap, GitBranch, Split, ArrowRight, Clock, ShieldCheck } from "lucide-react";

export default function WorkflowOptimization() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 pb-24 animate-fade-in-up">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-mono text-sm mb-4">
          <Split className="h-4 w-4" />
          <span className="tracking-widest uppercase">Workflow Engineering</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
          Critical Path Isolation: <br/>8s to 0.7s via Async Offloading
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> High Throughput</span>
          <span className="flex items-center gap-1"><GitBranch className="h-3.5 w-3.5" /> Async Architecture</span>
          <span>•</span>
          <span>4 min read</span>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        
        {/* Abstract/Intro */}
        <p className="text-xl leading-relaxed text-slate-600 dark:text-[#b4b4b4] border-l-4 border-emerald-500/20 pl-6 mb-12 italic">
          The fastest code is the code that doesn't run on the user's critical path.
        </p>

        {/* The Impact Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-8 rounded-2xl bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30">
            <div className="text-rose-600 dark:text-rose-400 font-mono text-xs uppercase mb-2 tracking-widest">Linear Execution</div>
            <div className="text-4xl font-bold text-rose-700 dark:text-rose-500 mb-1">8.2s</div>
            <div className="text-sm text-rose-600/80 dark:text-rose-400/60 font-medium">Blocking Sequential Steps</div>
            <p className="mt-4 text-xs text-rose-800 dark:text-rose-300/80 leading-relaxed">
              Every operation—logging, email notifications, database writes, and cache invalidation—was blocking the main request thread.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
            <div className="text-blue-600 dark:text-blue-400 font-mono text-xs uppercase mb-2 tracking-widest">Isolated Execution</div>
            <div className="text-4xl font-bold text-blue-700 dark:text-blue-500 mb-1">0.7s</div>
            <div className="text-sm text-blue-600/80 dark:text-blue-400/60 font-medium">91% Execution Speedup</div>
            <p className="mt-4 text-xs text-blue-800 dark:text-blue-300/80 leading-relaxed">
              Identifying the "True Result" and offloading all non-essential side-effects to an asynchronous worker pool.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6">
          <GitBranch className="h-6 w-6 text-emerald-500" />
          The Strategy: Critical Path Isolation
        </h2>
        <p className="mb-6">
          In a complex end-to-end workflow, we often fall into the trap of <strong>Sequentialism</strong>. We think the user needs to wait for the email to be sent, for the analytics to be logged, and for the cache to be invalidated. 
        </p>
        
        <div className="mb-8 p-6 bg-slate-50 dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-neutral-800">
          <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">The "Non-Blocking" Checklist</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-blue-500" />
              <span className="text-slate-700 dark:text-slate-300"><strong>Audit Logging:</strong> Necessary for record, unnecessary for response.</span>
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-blue-500" />
              <span className="text-slate-700 dark:text-slate-300"><strong>Third-party APIs:</strong> Notifications, analytics, and CRM syncs.</span>
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-blue-500" />
              <span className="text-slate-700 dark:text-slate-300"><strong>Heavy Reads:</strong> Re-computing complex stats for the next view.</span>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6">
          <Zap className="h-6 w-6 text-amber-500" />
          Implementation: Proper Async Orchestration
        </h2>
        <p className="mb-6">
          Moving from 8s to 0.7s required a complete rewrite of the workflow's lifecycle. We introduced a <strong>"Commit then Emit"</strong> pattern:
        </p>
        <p className="mb-8 bg-slate-50 dark:bg-neutral-900 p-6 rounded-xl border border-slate-200 dark:border-neutral-800 font-mono text-sm leading-relaxed">
          <span className="text-slate-500">// 1. Critical Path (Blocking)</span><br/>
          await db.primary.write(payload); <br/>
          <span className="text-blue-500">return ack_to_client();</span> <span className="text-slate-500">// 0.7s total here</span><br/><br/>

          <span className="text-slate-500">// 2. Post-Commit Offloading (Non-Blocking)</span><br/>
          queue.dispatch('SEND_EMAIL', payload);<br/>
          queue.dispatch('SYNC_CRM', payload);<br/>
          queue.dispatch('COMPUTE_STATS', payload);
        </p>
        <p className="mb-12 leading-relaxed">
          The heavy lifting (emails, external API syncs, complex re-indexing) happens in a separate worker process. If an analytics API is slow or down, it **no longer blocks the user's submission**.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6">
          Designing for Resilience
        </h2>
        <p className="mb-12">
          By isolating the critical path, we also improved system **Fault Tolerance**. If the CRM sync fails, the user still gets their confirmation. We handle retries and dead-letter queues in the background. The end result is a system that is not only <strong>90% faster</strong> but also far more resilient to external downstream failures.
        </p>

        {/* Footer Navigation */}
        <div className="pt-12 border-t border-slate-200 dark:border-neutral-800 flex justify-between items-center">
          <div>
             <span className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Context</span>
             <h4 className="font-semibold text-slate-800 dark:text-slate-200">Workflow Architecture</h4>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
