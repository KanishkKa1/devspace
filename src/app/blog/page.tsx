import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogDirectory() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 pb-20 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">System Thinking Hub</h1>
      </div>

      <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-[#cccccc]">
        <p className="text-lg leading-relaxed mb-10">
          This hub isn't just about technical documentation—it's about <strong>Architecture as a series of trade-offs</strong>. 
          Here, I explore how to reason about complex distributed systems, enforce invariants, and build for resilience and observability.
        </p>
        
        <div className="space-y-8">
          <Link href="/blog/websockets-case-study" className="block border-l-4 border-blue-500 pl-6 py-2 hover:bg-slate-50 dark:hover:bg-neutral-900 transition-colors rounded-r cursor-pointer">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 italic">System Design: Scaling State</h3>
            <p className="text-sm italic opacity-80">Tier-1 breakdown of trading polling for WebSockets, handling state boundaries, and Thundering Herds.</p>
          </Link>
          <Link href="/blog/async-workflow-case-study" className="block border-l-4 border-amber-500 pl-6 py-2 hover:bg-slate-50 dark:hover:bg-neutral-900 transition-colors rounded-r cursor-pointer">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 italic">System Design: Async Decoupling</h3>
            <p className="text-sm italic opacity-80">Isolating the critical path to crush transaction latency, utilizing message brokers and idempotency constraints.</p>
          </Link>
          <Link href="/blog/latency-optimization" className="block border-l-4 border-indigo-500 pl-6 py-2 hover:bg-slate-50 dark:hover:bg-neutral-900 transition-colors rounded-r cursor-pointer">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 italic">How to Think about Latency</h3>
            <p className="text-sm italic opacity-80">Reasoning about p99s, tail latency, and why polling is almost never the answer.</p>
          </Link>
          <Link href="/blog/workflow-optimization" className="block border-l-4 border-green-500 pl-6 py-2 hover:bg-slate-50 dark:hover:bg-neutral-900 transition-colors rounded-r cursor-pointer">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 italic">Mental Models for Fault Tolerance</h3>
            <p className="text-sm italic opacity-80">Understanding idempotent interfaces, retry budgets, and exponential backoff in distributed environments.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
