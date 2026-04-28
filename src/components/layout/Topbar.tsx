"use client";

import { Menu, Terminal } from "lucide-react";

interface TopbarProps {
  toggleSidebar: () => void;
}

export function Topbar({ toggleSidebar }: TopbarProps) {
  return (
    <div className="flex h-12 w-full flex-shrink-0 items-center justify-between bg-white px-4 md:px-6 dark:bg-[#1a1a1a] shadow-sm dark:shadow-none border-b border-slate-200 dark:border-[#2a2a2a] transition-all duration-300 ease-in-out z-10 relative">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="rounded-md p-1.5 hover:bg-slate-100 md:hidden dark:hover:bg-[#333333] transition-all duration-200 text-slate-800 dark:text-gray-200"
          aria-label="Toggle Navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden md:flex items-center gap-2 select-none">
          <Terminal className="h-4 w-4 text-blue-600 dark:text-blue-500" />
          <span className="font-semibold tracking-tight text-sm text-slate-800 dark:text-slate-200">
            Kanishk.Engine
          </span>
          <span className="text-slate-300 dark:text-slate-600 mx-2">/</span>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            Production Ops
          </span>
        </div>
      </div>

      <div className="flex items-center flex-1 md:hidden ml-2">
        <span className="text-sm font-semibold truncate text-slate-800 dark:text-slate-200 select-none">
          Kanishk
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Command Palette Hint */}
        <div 
          className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 hover:bg-slate-200 dark:bg-[#252526] dark:hover:bg-[#2d2d2d] px-2.5 py-1.5 rounded-md cursor-pointer transition-colors border border-transparent dark:border-[#333]"
          onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
          title="Open Command Palette"
        >
          <span className="hidden lg:inline mr-1">Search or jump to...</span>
          <kbd className="bg-slate-200 dark:bg-[#333] px-1 rounded text-slate-600 dark:text-slate-300">⌘</kbd>
          <kbd className="bg-slate-200 dark:bg-[#333] px-1 rounded text-slate-600 dark:text-slate-300">K</kbd>
        </div>
      </div>
    </div>
  );
}
