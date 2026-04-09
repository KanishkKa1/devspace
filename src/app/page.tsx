import Image from "next/image";
import Link from "next/link";
import { FilePlus, Target, BookOpen, User, Mail } from "lucide-react";

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
  return (
    <div className="min-h-full w-full flex flex-col p-8 sm:p-12 md:p-20 bg-white dark:bg-[#1e1e1e] text-slate-800 dark:text-[#cccccc]">
      <div className="max-w-4xl w-full mx-auto">

        {/* Header section mimicking VSCode */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl font-light tracking-tight text-slate-900 dark:text-white">Kanishk Workspace</h1>
          </div>
          <p className="text-slate-500 dark:text-[#969696] text-lg">Systems Engineering</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Start col */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-medium tracking-tight text-slate-800 dark:text-[#dedede] mb-2">Start</h2>

            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/systems/scheduler" className="flex items-center gap-3 text-blue-600 dark:text-[#3794ff] hover:underline">
                  <FilePlus className="h-4 w-4" />
                  <span>View C++ Scheduler System</span>
                </Link>
              </li>
              <li>
                <Link href="/systems/mcp" className="flex items-center gap-3 text-blue-600 dark:text-[#3794ff] hover:underline">
                  <Target className="h-4 w-4" />
                  <span>Explore MCP Interface</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="flex items-center gap-3 text-blue-600 dark:text-[#3794ff] hover:underline">
                  <BookOpen className="h-4 w-4" />
                  <span>Read Engineering Notes</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-3 text-blue-600 dark:text-[#3794ff] hover:underline">
                  <User className="h-4 w-4" />
                  <span>Contact Me</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Recent col */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-medium tracking-tight text-slate-800 dark:text-[#dedede] mb-2">Recent</h2>

            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/systems/langgraph" className="group flex flex-col hover:bg-slate-50 dark:hover:bg-[#2a2d2e] p-1.5 -ml-1.5 rounded-md cursor-pointer transition-colors">
                  <span className="text-blue-600 dark:text-[#3794ff] group-hover:underline">langgraph.py</span>
                  <span className="text-xs text-slate-400 dark:text-[#888888]">e:/workspace/systems/langgraph.py</span>
                </Link>
              </li>
              <li>
                <Link href="/systems/mcp" className="group flex flex-col hover:bg-slate-50 dark:hover:bg-[#2a2d2e] p-1.5 -ml-1.5 rounded-md cursor-pointer transition-colors">
                  <span className="text-blue-600 dark:text-[#3794ff] group-hover:underline">mcp.cpp</span>
                  <span className="text-xs text-slate-400 dark:text-[#888888]">e:/workspace/systems/mcp.cpp</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="group flex flex-col hover:bg-slate-50 dark:hover:bg-[#2a2d2e] p-1.5 -ml-1.5 rounded-md cursor-pointer transition-colors">
                  <span className="text-blue-600 dark:text-[#3794ff] group-hover:underline">projects.json</span>
                  <span className="text-xs text-slate-400 dark:text-[#888888]">e:/workspace/projects.json</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Links col at bottom */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-[#333333]">
          <h2 className="text-sm font-medium tracking-tight text-slate-800 dark:text-[#dedede] mb-4">Connect</h2>
          <div className="flex items-center gap-6 text-sm">
            <a href="https://github.com/kanishk" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-[#cccccc] dark:hover:text-white transition-colors">
              <GithubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/kanishk" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-[#cccccc] dark:hover:text-white transition-colors">
              <LinkedinIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
            <a href="mailto:contact@kanishk.com" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-[#cccccc] dark:hover:text-white transition-colors">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
