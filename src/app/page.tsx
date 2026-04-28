"use client";

import Link from "next/link";
import { useState } from "react";
import { FilePlus, Target, BookOpen, Mail, Download, Code2, ArrowRight, Terminal, Briefcase, FileText, FileCode } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5 0-1.4-.5-2.5-1.5-3.4.1-.3.6-1.6-.1-3.3 0 0-1.2-.4-3.9 1.4a12.3 12.3 0 0 0-7 0C4.3 1.4 3 1.8 3 1.8c-.7 1.7-.2 3-.1 3.3-1 1-1.5 2-1.5 3.4 0 5 3 6.2 6 6.5-.4.4-.7 1.1-.8 2.2-.7.3-2.5.9-3.6-1-1-.5-1.8-.7-1.8-.7-.9-.1-.2.2-.2.8.5 1.4 1.7 1.4 1.7.9 1.8 2.5 1.5 3.2 1.2v3.3" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Home() {
  const [isCopied, setIsCopied] = useState(false);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("agarwalkanisk12345@gmail.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    window.location.href = "mailto:agarwalkanisk12345@gmail.com";
  };

  return (
    <div className="min-h-full w-full flex flex-col p-8 sm:p-12 md:p-20 bg-[#ffffff] dark:bg-[#1e1e1e] text-slate-800 dark:text-[#cccccc] selection:bg-blue-200 dark:selection:bg-[#264f78] overflow-y-auto duration-200 transition-colors">
      <div className="max-w-4xl w-full mx-auto space-y-12 pb-24">

        <section className="flex flex-col text-left space-y-6 pt-4 sm:pt-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            Kanishk Agarwal
          </h1>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-mono text-blue-600 dark:text-[#569cd6] max-w-2xl">
              Backend Engineer specializing in low-latency systems, concurrency, and distributed execution engines.
            </h2>
            <p className="text-slate-600 dark:text-neutral-400 max-w-2xl text-lg">
              I build production-grade infrastructure, handling bottlenecks, thread synchronization, and system constraints.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto">
            {/* Primary CTA */}
            <Link
              href="/systems/scheduler"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white dark:bg-blue-600 dark:hover:bg-blue-500 px-6 py-3 rounded shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-150 hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 font-medium text-base"
            >
              <FileCode className="h-4 w-4" />
              <span>View Task Scheduler</span>
            </Link>

            {/* Secondary CTA */}
            <a
              href="/Kanishk_Agarwal.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-slate-700 dark:text-neutral-300 px-6 py-3 rounded transition-all duration-150 border border-slate-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:scale-[1.02] font-medium"
            >
              <FileText className="h-4 w-4" />
              <span>View Resume</span>
            </a>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="border border-slate-200 dark:border-neutral-800 p-5 rounded-lg bg-slate-50 dark:bg-[#252526] flex flex-col justify-center">
            <span className="block text-3xl font-bold text-emerald-600 dark:text-[#4ec9b0] mb-1">85%</span>
            <span className="text-sm font-mono text-slate-500 dark:text-neutral-400">P99 Latency Reduction</span>
          </div>
          <div className="border border-slate-200 dark:border-neutral-800 p-5 rounded-lg bg-slate-50 dark:bg-[#252526] flex flex-col justify-center">
            <span className="block text-3xl font-bold text-blue-600 dark:text-[#569cd6] mb-1">100k+</span>
            <span className="text-sm font-mono text-slate-500 dark:text-neutral-400">Events/sec Throughput</span>
          </div>
          <div className="border border-slate-200 dark:border-neutral-800 p-5 rounded-lg bg-slate-50 dark:bg-[#252526] flex flex-col justify-center">
            <span className="block text-3xl font-bold text-purple-600 dark:text-[#c586c0] mb-1">Zero</span>
            <span className="text-sm font-mono text-slate-500 dark:text-neutral-400">Data Races / Deadlocks</span>
          </div>
        </section>

        <section className="flex flex-col space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 pb-2">
            <h2 className="text-sm font-semibold tracking-wide text-slate-500 dark:text-neutral-400 uppercase flex items-center gap-2">
              <Target className="h-4 w-4" />
              Featured System
            </h2>
          </div>

          <div className="bg-slate-50 dark:bg-[#252526] border border-blue-500/30 hover:border-blue-500/50 dark:border-neutral-800 dark:hover:border-blue-500/50 rounded-lg p-8 transition-all duration-200 relative">

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              C++ Concurrent Task Scheduler
            </h3>

            <div className="space-y-6 text-slate-700 dark:text-neutral-300">
              <div>
                <h4 className="font-bold font-mono text-sm text-blue-600 dark:text-[#569cd6] mb-2">PROBLEM & CONSTRAINTS</h4>
                <p className="leading-relaxed">Standard thread spawning overhead was creating a 40ms bottleneck on high-frequency task dispatches. The system required a bounded-memory pool capable of absorbing temporary backpressure without causing thread starvation or excessive context switching.</p>
              </div>

              <div>
                <h4 className="font-bold font-mono text-sm text-blue-600 dark:text-[#569cd6] mb-2">SYSTEM DESIGN</h4>
                <ul className="list-disc pl-5 space-y-1.5 font-mono text-sm">
                  <li>Fixed-size worker pool sized to `std::thread::hardware_concurrency()`</li>
                  <li>Lock-free ring buffer concepts applied to submission queues to minimize contention</li>
                  <li>Condition variable signaling for bounded idle worker wakeups</li>
                  <li>Type-erased packaged tasks returning `std::future` for asynchronous resolution</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold font-mono text-sm text-blue-600 dark:text-[#569cd6] mb-2">TRADE-OFFS & MEASURED RESULTS</h4>
                <div className="font-mono text-sm bg-neutral-100 dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 p-4 rounded leading-relaxed">
                  Opted for a single centralized queue over work-stealing queues due to implementation complexity vs L1 cache coherency overhead at our specific scale. Result: Eliminated arbitrary thread creation overhead, dropping P99 dispatch latency from 40ms to 1.2ms under heavy burst load.
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Link
                href="/systems/scheduler"
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded font-medium hover:bg-blue-700 transition-colors"
              >
                <FileCode className="h-4 w-4" />
                System Deep Dive
              </Link>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold tracking-wide text-slate-500 dark:text-neutral-400 uppercase flex items-center gap-2 border-b border-slate-200 dark:border-neutral-800 pb-2">
              <Briefcase className="h-4 w-4" />
              Technical Deep Dives
            </h2>

            <ul className="flex flex-col gap-1 text-sm font-mono">
              <li>
                <Link href="/systems/scheduler" className="group flex flex-col sm:flex-row sm:items-center justify-between hover:bg-neutral-100 dark:hover:bg-[#252526] p-3 rounded transition-colors">
                  <div className="flex items-center gap-3">
                    <FilePlus className="h-4 w-4 text-blue-500 dark:text-[#569cd6]" />
                    <span className="text-slate-800 dark:text-neutral-200 font-medium">High-Performance Task Scheduler</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/systems/mcp" className="group flex flex-col sm:flex-row sm:items-center justify-between hover:bg-neutral-100 dark:hover:bg-[#252526] p-3 rounded transition-colors">
                  <div className="flex items-center gap-3">
                    <Code2 className="h-4 w-4 text-yellow-500 dark:text-[#dcdcaa]" />
                    <span className="text-slate-800 dark:text-neutral-200 font-medium">Local execution Protocol (MCP)</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="group flex flex-col sm:flex-row sm:items-center justify-between hover:bg-neutral-100 dark:hover:bg-[#252526] p-3 rounded transition-colors">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-green-500 dark:text-[#4ec9b0]" />
                    <span className="text-slate-800 dark:text-neutral-200 font-medium">System Design Notes</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/leetcode" className="group flex flex-col sm:flex-row sm:items-center justify-between hover:bg-neutral-100 dark:hover:bg-[#252526] p-3 rounded transition-colors">
                  <div className="flex items-center gap-3">
                    <Terminal className="h-4 w-4 text-orange-500 dark:text-[#ce9178]" />
                    <span className="text-slate-800 dark:text-neutral-200 font-medium">Algorithmic Patterns</span>
                  </div>
                </Link>
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold tracking-wide text-slate-500 dark:text-neutral-400 uppercase flex items-center gap-2 border-b border-slate-200 dark:border-neutral-800 pb-2">
              <Code2 className="h-4 w-4" />
              SDE-2 Competencies
            </h2>

            <ul className="flex flex-col gap-4 text-sm mt-2">
              <li className="flex items-start gap-3 p-2">
                <ArrowRight className="h-4 w-4 mt-0.5 text-slate-400 dark:text-neutral-500 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-slate-800 dark:text-neutral-200 font-bold">Multithreaded Execution</span>
                  <span className="text-slate-600 dark:text-[#858585] leading-relaxed">Designing thread pools, safe memory models, and minimizing context switches in bounded resources.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-2">
                <ArrowRight className="h-4 w-4 mt-0.5 text-slate-400 dark:text-neutral-500 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-slate-800 dark:text-neutral-200 font-bold">State Machine Orchestration</span>
                  <span className="text-slate-600 dark:text-[#858585] leading-relaxed">Directing state, idempotency, and retry layers for LLM and workflow automation logic.</span>
                </div>
              </li>
            </ul>
          </section>
        </div>

        {/* CONNECT SECTION */}
        <section className="pt-8 border-t border-slate-200 dark:border-neutral-800">
          <h2 className="text-sm font-semibold tracking-wide text-slate-500 dark:text-neutral-400 uppercase mb-4">Connect</h2>
          <div className="flex flex-wrap items-center gap-4 text-sm w-full">
            <a href="https://github.com/KanishkKa1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-slate-700 dark:bg-[#252526] dark:hover:bg-neutral-700 dark:text-neutral-300 px-4 py-2 rounded transition-colors font-medium border border-transparent dark:border-neutral-800 cursor-pointer">
              <GithubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/kanishkaga/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-slate-700 dark:bg-[#252526] dark:hover:bg-neutral-700 dark:text-neutral-300 px-4 py-2 rounded transition-colors font-medium border border-transparent dark:border-neutral-800 cursor-pointer">
              <LinkedinIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
            <button
              onClick={handleEmailClick}
              className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-slate-700 dark:bg-[#252526] dark:hover:bg-neutral-700 dark:text-neutral-300 px-4 py-2 rounded transition-colors font-medium border border-transparent dark:border-neutral-800 cursor-pointer"
            >
              <Mail className="h-4 w-4" />
              <span className="w-[45px] text-left">{isCopied ? "Copied!" : "Email"}</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
