"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Terminal, Component, Copy, Cpu, Activity, BrainCircuit, AlertTriangle, Workflow 
} from 'lucide-react';

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
import { cn } from '@/lib/utils';

type Category = "Navigation" | "System Inspection" | "Actions";

interface CommandItem {
  id: string;
  title: string;
  category: Category;
  keywords: string[];
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // COMMAND REGISTRY
  const commands: CommandItem[] = useMemo(() => [
    // --- NAVIGATION ---
    {
      id: "nav-scheduler",
      title: "Open Scheduler System",
      category: "Navigation",
      keywords: ["cpp", "multithreading", "task queue", "thread pool", "harman"],
      icon: <Cpu className="w-4 h-4 text-emerald-500" />,
      action: () => router.push('/systems/scheduler')
    },
    {
      id: "nav-distributed",
      title: "Open Distribution Layer (Kafka-style)",
      category: "Navigation",
      keywords: ["kafka", "pubsub", "scale", "message queue", "partition"],
      icon: <Workflow className="w-4 h-4 text-blue-500" />,
      action: () => router.push('/systems/distribution-layer')
    },
    {
      id: "nav-vector",
      title: "Open Custom Vector",
      category: "Navigation",
      keywords: ["cpp", "memory", "allocator", "raii", "rule of 5"],
      icon: <Terminal className="w-4 h-4 text-amber-500" />,
      action: () => router.push('/projects/custom-vector')
    },
    {
      id: "nav-ai",
      title: "Open AI Orchestration Layer",
      category: "Navigation",
      keywords: ["llm", "mcp", "agents", "python", "guardrails", "safety"],
      icon: <BrainCircuit className="w-4 h-4 text-purple-500" />,
      action: () => router.push('/systems/ai-orchestration')
    },
    {
      id: "nav-skills",
      title: "Open Core Skills",
      category: "Navigation",
      keywords: ["about", "languages", "resume", "experience"],
      icon: <Activity className="w-4 h-4 text-indigo-500" />,
      action: () => router.push('/skills')
    },

    // --- SYSTEM INSPECTION ---
    {
      id: "inspect-sched-concurrency",
      title: "View Concurrency Model",
      category: "System Inspection",
      keywords: ["mutex", "atomic", "happens before", "scheduler"],
      icon: <Component className="w-4 h-4 text-rose-500" />,
      action: () => router.push('/systems/scheduler') 
    },
    {
      id: "inspect-sched-failure",
      title: "View Failure Scenarios",
      category: "System Inspection",
      keywords: ["deadlock", "starvation", "scheduler edge cases"],
      icon: <AlertTriangle className="w-4 h-4 text-orange-500" />,
      action: () => router.push('/systems/scheduler')
    },
    {
      id: "inspect-benchmarks",
      title: "View Benchmarks",
      category: "System Inspection",
      keywords: ["latency", "throughput", "120ms to 12ms"],
      icon: <Activity className="w-4 h-4 text-emerald-500" />,
      action: () => router.push('/systems/scheduler')
    },

    // --- QUICK ACTIONS ---
    {
      id: "action-github",
      title: "Open GitHub Profile",
      category: "Actions",
      keywords: ["code", "repository", "source"],
      icon: <GithubIcon className="w-4 h-4 text-slate-400" />,
      action: () => window.open('https://github.com/KanishkKa1', '_blank')
    },
    {
      id: "action-linkedin",
      title: "Open LinkedIn",
      category: "Actions",
      keywords: ["contact", "network", "social"],
      icon: <LinkedinIcon className="w-4 h-4 text-blue-600" />,
      action: () => window.open('https://linkedin.com', '_blank')
    },
    {
      id: "action-copy-url",
      title: "Copy Portfolio Link",
      category: "Actions",
      keywords: ["share", "clipboard", "url"],
      icon: <Copy className="w-4 h-4 text-slate-400" />,
      action: () => {
        navigator.clipboard.writeText(window.location.host);
      }
    }
  ], [router]);

  // TOGGLE LOGIC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle with Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      
      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleOpenEvent = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleOpenEvent);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpenEvent);
    };
  }, []); // Dependencies empty as handleKeyDown handles state internally or we don't need isOpen dependency for Escape anymore

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      // Ensure focus happens after render
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // FUZZY SEARCH
  const filteredCommands = useMemo(() => {
    if (!query) return commands;
    const lowerQuery = query.toLowerCase();
    
    return commands.map(cmd => {
      const titleMatch = cmd.title.toLowerCase().includes(lowerQuery);
      const keywordMatch = cmd.keywords.some(k => k.toLowerCase().includes(lowerQuery));
      // Give exact substring matches in title higher priority than keyword matches
      const score = titleMatch ? 2 : (keywordMatch ? 1 : 0);
      return { ...cmd, score };
    })
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score);
  }, [query, commands]);

  // CATEGORIZATION
  const groupedCommands = useMemo(() => {
    return filteredCommands.reduce((acc, cmd) => {
      if (!acc[cmd.category]) acc[cmd.category] = [];
      acc[cmd.category].push(cmd);
      return acc;
    }, {} as Record<Category, CommandItem[]>);
  }, [filteredCommands]);

  const flattenedResults = useMemo(() => {
    return Object.values(groupedCommands).flat();
  }, [groupedCommands]);

  // KEYBOARD NAVIGATION
  useEffect(() => {
    const handleNavigation = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % flattenedResults.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + flattenedResults.length) % flattenedResults.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const activeCommand = flattenedResults[activeIndex];
        if (activeCommand) {
          activeCommand.action();
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleNavigation);
    return () => window.removeEventListener('keydown', handleNavigation);
  }, [isOpen, activeIndex, flattenedResults]);

  // SCROLL ACTIVE ITEM INTO VIEW
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const activeEl = listRef.current.querySelector('[data-active="true"]');
      activeEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      <div 
        className="fixed inset-0 z-[101] overflow-y-auto p-4 cursor-pointer"
        onClick={() => setIsOpen(false)}
      >
        <div 
          className="relative top-[10%] mx-auto w-full max-w-2xl bg-white dark:bg-[#1a1a1a] rounded-xl shadow-2xl border border-slate-200 dark:border-[#333] overflow-hidden flex flex-col max-h-[70vh] cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3 border-b border-slate-100 dark:border-[#2a2a2a]">
            <Terminal className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
            <input
              ref={inputRef}
              className="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-slate-200 placeholder-slate-400 text-lg w-full"
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
            />
            <kbd className="hidden sm:inline-block text-[10px] bg-slate-100 dark:bg-[#333] text-slate-500 dark:text-slate-400 px-2 py-1 rounded font-mono font-medium">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div ref={listRef} className="overflow-y-auto p-2">
            {flattenedResults.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-sm">
                No commands found.
              </div>
            ) : (
              (Object.keys(groupedCommands) as Category[]).map((category, catIdx) => (
                <div key={category} className="mb-2">
                  <div className="px-3 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {category}
                  </div>
                  {groupedCommands[category].map((cmd) => {
                    const globalIdx = flattenedResults.findIndex(r => r.id === cmd.id);
                    const isActive = globalIdx === activeIndex;

                    return (
                      <button
                        key={cmd.id}
                        data-active={isActive}
                        className={cn(
                          "w-full flex items-center px-3 py-3 rounded-lg text-left transition-colors",
                          isActive 
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" 
                            : "hover:bg-slate-50 dark:hover:bg-[#252526] text-slate-700 dark:text-slate-300"
                        )}
                        onMouseEnter={() => setActiveIndex(globalIdx)}
                        onClick={() => {
                          cmd.action();
                          setIsOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "flex items-center justify-center p-1.5 rounded-md",
                            isActive ? "bg-white dark:bg-[#1a1a1a]" : "bg-slate-100 dark:bg-[#252526]"
                          )}>
                            {cmd.icon}
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              {/* Highlight matches if desired, keeping it simple for now */}
                              {cmd.title}
                            </div>
                            {isActive && cmd.keywords.length > 0 && (
                              <div className="text-[10px] flex items-center gap-1 mt-1 opacity-70">
                                {cmd.keywords.slice(0, 3).map(kw => (
                                  <span key={kw} className="bg-blue-100 dark:bg-blue-900/50 px-1 rounded">{kw}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
          
          {/* Footer Footer */}
          <div className="px-4 py-2 border-t border-slate-100 dark:border-[#2a2a2a] bg-slate-50 dark:bg-[#151515] flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1"><kbd className="bg-slate-200 dark:bg-[#333] px-1 rounded">&uarr;</kbd><kbd className="bg-slate-200 dark:bg-[#333] px-1 rounded">&darr;</kbd> to navigate</span>
              <span className="mx-1">&bull;</span>
              <span className="flex items-center gap-1"><kbd className="bg-slate-200 dark:bg-[#333] px-1 rounded">&crarr;</kbd> to select</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
