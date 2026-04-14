"use client";

import { Check, Copy, Play, Terminal } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
  output?: string;
}

export function CodeBlock({ code, language, output }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg border border-slate-200 bg-slate-50 dark:border-[#333333] dark:bg-[#1e1e1e] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-[#333333] bg-[#f3f3f3] dark:bg-[#252526]">
        <span className="text-xs font-mono text-slate-500 dark:text-[#969696]">{language}</span>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="text-slate-400 hover:text-slate-600 dark:text-[#969696] dark:hover:text-[#cccccc] transition-colors focus:outline-none"
            title="Copy Code"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
          {output && (
            <button
              onClick={() => {
                if (!output) return;
                setIsRunning(true);
                setShowOutput(false);
                setTimeout(() => {
                  setIsRunning(false);
                  setShowOutput(true);
                }, 800);
              }}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded text-emerald-700 bg-emerald-100/80 hover:bg-emerald-200 dark:text-[#5ce4ce] dark:bg-[#5ce4ce]/10 dark:hover:bg-[#5ce4ce]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {isRunning ? (
                <div className="h-3.5 w-3.5 rounded-full border-[2px] border-emerald-600 dark:border-[#5ce4ce] border-t-transparent animate-spin" />
              ) : (
                <Play className="h-3.5 w-3.5 fill-current" />
              )}
              {isRunning ? "Running..." : "Run"}
            </button>
          )}
        </div>
      </div>
      <div className="p-4 overflow-auto custom-scrollbar max-h-[500px]">
        <pre className="text-sm font-mono text-slate-800 dark:text-[#ce9178] whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
      
      {(showOutput || isRunning) && (
        <div className="border-t border-slate-200 dark:border-[#333333] bg-[#fafafa] dark:bg-[#151515] animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="px-4 py-2 border-b border-slate-200 dark:border-[#333333] flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-slate-500 dark:text-[#5ce4ce]" />
            <span className="text-[10px] font-semibold tracking-wider text-slate-500 dark:text-[#5ce4ce] uppercase">
              {isRunning ? "Execution in progress" : "Output"}
            </span>
          </div>
          <div className="p-4 overflow-x-auto custom-scrollbar min-h-[80px]">
            <pre className="text-[13px] font-mono text-slate-700 dark:text-[#cccccc] whitespace-pre loading-relaxed">
              {isRunning ? <span className="animate-pulse font-bold text-emerald-600 dark:text-[#5ce4ce]">_</span> : <code>{output}</code>}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
