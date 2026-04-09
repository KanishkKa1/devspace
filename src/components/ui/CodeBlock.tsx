"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
  output?: string;
}

export function CodeBlock({ code, language, output }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg border border-slate-200 bg-slate-50 dark:border-[#333333] dark:bg-[#1e1e1e] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-[#333333] bg-[#f3f3f3] dark:bg-[#252526]">
        <span className="text-xs font-mono text-slate-500 dark:text-[#969696]">{language}</span>
        <button
          onClick={handleCopy}
          className="text-slate-400 hover:text-slate-600 dark:text-[#969696] dark:hover:text-[#cccccc] transition-colors"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="text-sm font-mono text-slate-800 dark:text-[#ce9178] whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
      
      {output && (
        <div className="border-t border-slate-200 dark:border-[#333333] bg-slate-100 dark:bg-[#151515]">
          <div className="px-4 py-1.5 border-b border-slate-200 dark:border-[#333333] flex items-center">
            <span className="text-[10px] font-semibold tracking-wider text-slate-500 dark:text-[#5ce4ce] uppercase">Output</span>
          </div>
          <div className="p-4 overflow-x-auto custom-scrollbar">
            <pre className="text-xs font-mono text-slate-600 dark:text-[#cccccc] whitespace-pre">
              <code>{output}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
