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
    <div className="my-8 rounded shadow-sm border border-slate-200 bg-white dark:border-[#1E2329] dark:bg-[#0B0F14]">
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-slate-200 dark:border-[#1E2329] bg-slate-50/50 dark:bg-[#0B0F14]">
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{language}</span>
        <div className="flex items-center gap-4">
          <button
            onClick={handleCopy}
            className="text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300 transition-colors focus:outline-none"
            title="Copy Code"
          >
            {copied ? <Check className="h-4 w-4 text-[#22C55E]" /> : <Copy className="h-4 w-4" />}
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
                }, 600);
              }}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded text-white bg-[#22C55E] hover:bg-[#16a34a] transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none shadow-sm"
            >
              {isRunning ? (
                <div className="h-3.5 w-3.5 rounded-full border-[2px] border-white/30 border-t-white animate-spin" />
              ) : (
                <Play className="h-3 w-3 fill-current" />
              )}
              {isRunning ? "Running" : "Execute"}
            </button>
          )}
        </div>
      </div>
      <div className="p-5 overflow-auto custom-scrollbar max-h-[500px]">
        <pre className="text-[13px] leading-relaxed font-mono text-slate-800 dark:text-slate-300 whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
      
      {(showOutput || isRunning) && (
        <div className="border-t border-slate-200 dark:border-[#1E2329] bg-slate-50 dark:bg-[#0B0F14] animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="p-5 overflow-x-auto custom-scrollbar min-h-[100px]">
            <pre className="text-[13px] font-mono text-slate-600 dark:text-slate-400 whitespace-pre leading-relaxed">
              {isRunning ? <span className="animate-pulse font-bold text-[#22C55E]">Executing process...</span> : <code>{output}</code>}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
