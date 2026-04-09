"use client";

import Link from "next/link";
import { useState } from "react";
import { FilePlus, Target, BookOpen, Mail, ChevronRight, Download, Code2, Play, ExternalLink, ArrowRight, Terminal, Briefcase, FileText, FileCode } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5 0-1.4-.5-2.5-1.5-3.4.1-.3.6-1.6-.1-3.3 0 0-1.2-.4-3.9 1.4a12.3 12.3 0 0 0-7 0C4.3 1.4 3 1.8 3 1.8c-.7 1.7-.2 3-.1 3.3-1 1-1.5 2-1.5 3.4 0 5 3 6.2 6 6.5-.4.4-.7 1.1-.8 2.2-.7.3-2.5.9-3.6-1-1-.5-1.8-.7-1.8-.7-.9-.1-.2.2-.2.2.8.5 1.4 1.7 1.4 1.7.9 1.8 2.5 1.5 3.2 1.2v3.3" />
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

        <section className="flex flex-col items-center text-center space-y-6 pt-4 sm:pt-6">


          <div className="relative group cursor-default">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 transition-all duration-200">
              Kanishk Agarwal
            </h1>
            <div className="absolute -inset-x-6 -inset-y-4 rounded-lg bg-slate-100/50 dark:bg-neutral-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
          </div>

          <div className="flex items-center gap-3 text-sm md:text-base font-mono text-slate-700 dark:text-[#ce9178] bg-slate-100 dark:bg-neutral-800/50 px-4 py-2.5 rounded border border-slate-200 dark:border-neutral-800 shadow-sm transform hover:scale-[1.02] transition-all duration-200">
            <span className="text-green-600 dark:text-[#4af626] font-bold select-none">&gt;</span>
            <span className="text-slate-800 dark:text-[#ce9178]">C++ Backend Engineer | Building Low-Latency Systems</span>
            <span className="w-2 h-4 bg-slate-400 dark:bg-[#ce9178] animate-pulse inline-block ml-1" />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto">
            {/* Primary CTA */}
            <Link
              href="/systems/scheduler"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white dark:bg-blue-600 dark:hover:bg-blue-500 px-6 py-3 rounded shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-150 hover:scale-105 focus:ring-2 focus:ring-blue-500 font-medium text-base"
            >
              <FileCode className="h-4 w-4 transform group-hover:scale-110 transition-all duration-200" />
              <span>⭐ View Scheduler Project</span>
            </Link>

            {/* Secondary CTA */}
            <a
              href="/Kanishk_Agarwal.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-slate-700 dark:text-neutral-300 px-6 py-3 rounded transition-all duration-150 border border-slate-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:scale-105 font-medium"
            >
              <FileText className="h-4 w-4 transform group-hover:-translate-y-0.5 transition-all duration-200" />
              <span>View Resume</span>
            </a>

            {/* Tertiary CTA */}
            <a
              href="/Kanishk_Agarwal.pdf"
              download
              className="group w-full sm:w-auto flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700 dark:text-neutral-500 dark:hover:text-[#cccccc] px-4 py-2 transition-all duration-150 text-xs sm:text-sm font-medium underline decoration-transparent hover:decoration-current"
            >
              <Download className="h-3 w-3 transform group-hover:-translate-y-0.5 transition-all duration-200" />
              <span>Download Resume</span>
            </a>
          </div>
        </section>

        {/* FEATURED PROJECT */}
        <section className="flex flex-col space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 pb-2">
            <h2 className="text-sm font-semibold tracking-wide text-slate-500 dark:text-neutral-400 uppercase flex items-center gap-2">
              <Target className="h-4 w-4" />
              Featured Project
            </h2>
          </div>

          <div className="bg-slate-50 dark:bg-neutral-900 border border-blue-500/30 hover:border-blue-500/50 dark:border-blue-500/30 dark:hover:border-blue-400 rounded-lg p-7 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-150 hover:scale-[1.01] relative overflow-hidden group cursor-default">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 transform origin-top group-hover:scale-y-110 transition-transform duration-300"></div>
            <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-20 transition-opacity duration-300">
              <Target className="w-24 h-24 text-blue-500" />
            </div>

            <div className="flex justify-between items-start gap-4 relative z-10">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  C++ Task Scheduler
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-[#9cdcfe] font-mono text-sm mb-6 list-inside list-disc">
                  <li className="transition-all duration-200 hover:text-slate-900 dark:hover:text-white">Multithreaded task scheduler using thread pool</li>
                  <li className="transition-all duration-200 hover:text-slate-900 dark:hover:text-white">Concurrent job execution with queue-based scheduling</li>
                  <li className="transition-all duration-200 hover:text-slate-900 dark:hover:text-white">Designed for low-latency and high-throughput systems</li>
                  <li className="transition-all duration-200 hover:text-slate-900 dark:hover:text-white mt-3">
                    <Link href="/blog/latency-optimization" className="text-green-600 dark:text-green-500 hover:underline hover:text-green-500 transition-colors cursor-pointer">
                      Reduced latency from 6s → 0.8s (Read Case Study)
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 relative z-10 mt-2">
              <Link
                href="/systems/scheduler"
                className="flex items-center gap-2 text-sm text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-400 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700/50 px-4 py-2 rounded shadow-sm shadow-blue-500/10 transition-all duration-150 hover:scale-105 font-medium"
              >
                <FileCode className="h-4 w-4" />
                <span>Open scheduler.cpp</span>
              </Link>
              <a
                href="https://github.com/KanishkKa1/cpp_TaskScheduler"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-300 px-4 py-2 rounded transition-all duration-150 hover:scale-105"
              >
                <GithubIcon className="h-4 w-4" />
                <span>View Code</span>
                <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
              </a>
            </div>
          </div>
        </section>

        {/* WHY ME SECTION */}
        <section className="flex flex-col space-y-4">
           <div className="font-mono text-sm text-slate-600 dark:text-[#a0a0a0] bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-5 rounded-lg shadow-sm">
             <div className="text-blue-500 dark:text-blue-400 font-bold mb-3">&gt; Why me?</div>
             <ul className="space-y-2 list-none m-0 pl-1">
               <li className="flex items-start gap-2 hover:text-slate-800 dark:hover:text-white transition-colors duration-150">
                 <span className="text-slate-400 dark:text-neutral-600">-</span>
                 <span className="text-slate-700 dark:text-neutral-300">Focused on low-latency backend systems and concurrency</span>
               </li>
               <li className="flex items-start gap-2 hover:text-slate-800 dark:hover:text-white transition-colors duration-150">
                 <span className="text-slate-400 dark:text-neutral-600">-</span>
                 <span className="text-slate-700 dark:text-neutral-300">Strong in C++ multithreading, scheduling, and system design</span>
               </li>
               <li className="flex items-start gap-2 hover:text-slate-800 dark:hover:text-white transition-colors duration-150">
                 <span className="text-slate-400 dark:text-neutral-600">-</span>
                 <span className="text-slate-700 dark:text-neutral-300">Build production-style systems, not just demo projects</span>
               </li>
             </ul>
           </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* WORK SECTION */}
          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold tracking-wide text-slate-500 dark:text-neutral-400 uppercase flex items-center gap-2 border-b border-slate-200 dark:border-neutral-800 pb-2">
              <Briefcase className="h-4 w-4" />
              Work
            </h2>

            <ul className="flex flex-col gap-1 text-sm font-mono">
              <li>
                <Link href="/systems/scheduler" className="group flex flex-col sm:flex-row sm:items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded cursor-pointer transition-colors duration-150">
                  <div className="flex items-center gap-3">
                    <FilePlus className="h-4 w-4 text-blue-500 dark:text-[#569cd6] shrink-0" />
                    <span className="text-slate-800 dark:text-neutral-200 font-medium group-hover:text-blue-600 dark:group-hover:text-[#569cd6] transition-colors duration-200 truncate">Multithreaded Scheduler System</span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-[#6a9955] sm:ml-4 mt-1 sm:mt-0 truncate">scheduler.cpp</span>
                </Link>
              </li>
              <li>
                <Link href="/systems/mcp" className="group flex flex-col sm:flex-row sm:items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded cursor-pointer transition-colors duration-150">
                  <div className="flex items-center gap-3">
                    <Code2 className="h-4 w-4 text-yellow-500 dark:text-[#dcdcaa] shrink-0" />
                    <span className="text-slate-800 dark:text-neutral-200 font-medium group-hover:text-blue-600 dark:group-hover:text-[#569cd6] transition-colors duration-200 truncate">Custom Protocol Interface</span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-[#6a9955] sm:ml-4 mt-1 sm:mt-0 truncate">mcp_interface.cpp</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="group flex flex-col sm:flex-row sm:items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded cursor-pointer transition-colors duration-150">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-green-500 dark:text-[#4ec9b0] shrink-0" />
                    <span className="text-slate-800 dark:text-neutral-200 font-medium group-hover:text-blue-600 dark:group-hover:text-[#569cd6] transition-colors duration-200 truncate">System Design Notes</span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-[#6a9955] sm:ml-4 mt-1 sm:mt-0 truncate">engineering_notes.md</span>
                </Link>
              </li>
              <li>
                <Link href="/leetcode" className="group flex flex-col sm:flex-row sm:items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded cursor-pointer transition-colors duration-150">
                  <div className="flex items-center gap-3">
                    <Terminal className="h-4 w-4 text-orange-500 dark:text-[#ce9178] shrink-0" />
                    <span className="text-slate-800 dark:text-neutral-200 font-medium group-hover:text-blue-600 dark:group-hover:text-[#569cd6] transition-colors duration-200 truncate">DSA Practice</span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-[#6a9955] sm:ml-4 mt-1 sm:mt-0 truncate">leetcode.ts</span>
                </Link>
              </li>
            </ul>
          </section>

          {/* RECENT WORK */}
          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold tracking-wide text-slate-500 dark:text-neutral-400 uppercase flex items-center gap-2 border-b border-slate-200 dark:border-neutral-800 pb-2">
              <Code2 className="h-4 w-4" />
              Recent Work
            </h2>

            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/systems/scheduler" className="group flex items-start gap-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded cursor-pointer transition-colors duration-150">
                  <ArrowRight className="h-4 w-4 mt-0.5 text-slate-400 dark:text-neutral-500 group-hover:translate-x-1 transition-transform duration-200 group-hover:text-blue-500 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-slate-800 dark:text-neutral-200 font-medium group-hover:text-blue-600 dark:group-hover:text-[#569cd6] transition-colors duration-200">Improved Scheduler Architecture</span>
                    <span className="text-xs text-slate-500 dark:text-[#858585] mt-0.5">Refactored multithreading implementation</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/systems/mcp" className="group flex items-start gap-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded cursor-pointer transition-colors duration-150">
                  <ArrowRight className="h-4 w-4 mt-0.5 text-slate-400 dark:text-neutral-500 group-hover:translate-x-1 transition-transform duration-200 group-hover:text-blue-500 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-slate-800 dark:text-neutral-200 font-medium group-hover:text-blue-600 dark:group-hover:text-[#569cd6] transition-colors duration-200">Built MCP Interface</span>
                    <span className="text-xs text-slate-500 dark:text-[#858585] mt-0.5">System integration via custom protocol</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/systems/langgraph" className="group flex items-start gap-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded cursor-pointer transition-colors duration-150">
                  <ArrowRight className="h-4 w-4 mt-0.5 text-slate-400 dark:text-neutral-500 group-hover:translate-x-1 transition-transform duration-200 group-hover:text-blue-500 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-slate-800 dark:text-neutral-200 font-medium group-hover:text-blue-600 dark:group-hover:text-[#569cd6] transition-colors duration-200">Experimenting with LangGraph</span>
                    <span className="text-xs text-slate-500 dark:text-[#858585] mt-0.5">Agents logic and workflow state</span>
                  </div>
                </Link>
              </li>
            </ul>
          </section>
        </div>

        {/* CONNECT SECTION */}
        <section className="pt-8 border-t border-slate-200 dark:border-neutral-800">
          <h2 className="text-sm font-semibold tracking-wide text-slate-500 dark:text-neutral-400 uppercase mb-4">Connect</h2>
          <div className="flex flex-wrap items-center gap-4 text-sm w-full">
            <a href="https://github.com/KanishkKa1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-slate-700 dark:bg-neutral-800/50 dark:hover:bg-neutral-800 dark:text-neutral-300 px-4 py-2 rounded transition-all duration-150 hover:scale-105 font-medium border border-transparent dark:border-neutral-800 cursor-pointer">
              <GithubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/kanishkaga/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-slate-700 dark:bg-neutral-800/50 dark:hover:bg-neutral-800 dark:text-neutral-300 px-4 py-2 rounded transition-all duration-150 hover:scale-105 font-medium border border-transparent dark:border-neutral-800 cursor-pointer">
              <LinkedinIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
            <button 
              onClick={handleEmailClick}
              className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-slate-700 dark:bg-neutral-800/50 dark:hover:bg-neutral-800 dark:text-neutral-300 px-4 py-2 rounded transition-all duration-150 hover:scale-105 font-medium border border-transparent dark:border-neutral-800 cursor-pointer"
            >
              <Mail className="h-4 w-4" />
              <span className="w-[45px] text-left">{isCopied ? "Copied!" : "Email"}</span>
            </button>

            <div className="flex items-center gap-3 sm:ml-auto">
              <a href="/Kanishk_Agarwal.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-slate-700 dark:bg-neutral-800/50 dark:hover:bg-neutral-800 dark:text-neutral-300 px-4 py-2 rounded transition-all duration-150 hover:scale-105 font-medium border border-transparent dark:border-neutral-800 cursor-pointer">
                <FileText className="h-4 w-4" />
                <span>View Resume</span>
              </a>
              <a href="/Kanishk_Agarwal.pdf" download className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-slate-700 dark:bg-neutral-800/50 dark:hover:bg-neutral-800 dark:text-neutral-300 px-4 py-2 rounded transition-all duration-150 hover:scale-105 font-medium border border-transparent dark:border-neutral-800 cursor-pointer">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
