import { CodeBlock } from "@/components/ui/CodeBlock";
import { ArrowRight, Server, Zap, GitBranch, ShieldCheck, Activity, SplitSquareHorizontal } from "lucide-react";
import Link from "next/link";

export default function AsyncWorkflowCaseStudyPage() {
  const asciiArchitecture = `
[SYNCHRONOUS CRITICAL PATH  (0.7s)]
      │
      ▼
┌──────────────────┐      ┌─────────────────────────┐
│  API GATEWAY     │─────▶│   PRIMARY DATABASE      │
│ (Wait for HTTP)  │◀─────│  (Commit ACID Trans.)   │
└────────┬─────────┘      └───────────┬─────────────┘
         │                            │
   (HTTP 200 OK)                      │ [Change Data Capture]
         │                            ▼
         ▼                ┌─────────────────────────┐
    [CLIENT]              │   MESSAGE BROKER (MQ)   │  [IDEMPOTENCY KEY: 123-ABC]
                          │ (Kafka / RabbitMQ)      │
                          └────┬────────────────┬───┘
                               │                │
[ASYNC BACKGROUND PATH]        │                │
            ┌──────────────────┘                └─────────────────┐
            ▼                                                     ▼
┌───────────────────────┐                             ┌───────────────────────┐
│     WORKER: PDF       │                             │    WORKER: EMAIL      │
│   (3s Generation)     │                             │  (2s Network Call)    │
│ [Retries: 3 / Backoff]│                             │ [Retries: 5 / Backoff]│
└───────────────────────┘                             └───────────────────────┘`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 pb-24 animate-fade-in-up">
      {/* Header Section */}
      <div className="mb-12 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 text-emerald-500 font-mono text-sm mb-4">
            <SplitSquareHorizontal className="h-4 w-4" />
            <span className="tracking-widest uppercase">System Design Interview Focus</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            System Design: Async Decoupling <br/>(Isolating the Critical Path)
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Server className="h-3.5 w-3.5" /> Distributed Systems</span>
            <span className="flex items-center gap-1"><GitBranch className="h-3.5 w-3.5" /> Event-Driven</span>
          </div>
        </div>
        <Link 
          href="/blog/latency-optimization"
          className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 px-4 py-2 rounded-md transition-colors w-fit border border-slate-200 dark:border-slate-700 shrink-0 mt-2 sm:mt-0"
        >
          <span>Next: Latency</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        
        {/* The Impact Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-8 rounded-2xl bg-slate-50 dark:bg-[#111822] border border-slate-100 dark:border-[#1E2329]">
            <div className="text-slate-500 font-mono text-xs uppercase mb-2 tracking-widest">Synchronous Monolith</div>
            <div className="text-4xl font-bold text-slate-800 dark:text-white mb-1">8.0s</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Blocking Transaction Queue</div>
            <ul className="mt-4 space-y-1 text-xs text-slate-600 dark:text-slate-500 font-mono border-t border-slate-200 dark:border-[#1E2329] pt-3">
              <li>0.7s (DB Write)</li>
              <li>+ 3.0s (PDF Generation)</li>
              <li>+ 2.0s (Stripe Sync)</li>
              <li>+ 2.3s (Email Service)</li>
            </ul>
          </div>
          <div className="p-8 rounded-2xl bg-green-50 dark:bg-[#071F11] border border-green-100 dark:border-[#0D2D1A]">
            <div className="text-[#22C55E] font-mono text-xs uppercase mb-2 tracking-widest">Async Delegation</div>
            <div className="text-4xl font-bold text-[#22C55E] mb-1">0.7s</div>
            <div className="text-sm text-green-700 dark:text-[#22C55E]/80 font-medium">Hard Critical Path</div>
            <p className="mt-4 text-xs text-emerald-800 dark:text-[#737373] leading-relaxed">
              We decoupled all non-ACID external invocations into a distributed queue, dropping user-facing latency strictly down to internal DB constraints.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. The Problem Space</h2>
        <p className="mb-6">
          When an application scales, synchronous architectural flows inevitably fail. If a single endpoint is responsible for taking a booking, generating the receipt PDF, capturing the payment, and sending the confirmation email, the overall execution time is fundamentally gated by the <em>slowest external dependency</em>. 
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Why Synchronous Execution Fails Resiliency</h2>
        <p className="mb-4">
          Beyond latency, the fatal flaw in monolithic synchronous execution is <strong>Cascading Failure</strong> and lack of isolation.
        </p>
        <div className="p-5 bg-slate-50 dark:bg-[#1a1a1a] rounded-lg border border-slate-200 dark:border-neutral-800 font-mono text-sm mb-8">
          <strong>The Failure Scenario:</strong><br/>
          - The user pays, and the Database commits the transaction.<br/>
          - The external Email API (Sendgrid) goes down and returns a <code>503 Timeout</code>.<br/>
          - The HTTP thread crashes. Does the database roll back? If it rolls back, the user was already charged. If it doesn't, the user never gets their email. The boundaries of the ACID transaction are completely broken.
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Design Decision: Critical vs. Non-Critical</h2>
        <p className="mb-8">
          I defined a strict semantic boundary for the workload:
          <br/><br/>
          <strong>The Critical Path:</strong> Operations that <em>must</em> succeed to maintain system integrity. (Validating balance, acquiring a distributed lock, committing to Postgres). The client cannot be told "Success" unless this finishes.
          <br/><br/>
          <strong>The Non-Blocking Path:</strong> Operations that are <em>Eventual</em> side effects. (Generating the PDF, firing Webhooks). 
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Event-Driven Architecture</h2>
        <div className="mb-8 w-full overflow-hidden rounded-xl border border-slate-200 dark:border-[#333333] max-w-[700px]">
          <div className="bg-slate-100 dark:bg-[#1e1e1e] px-4 py-2 border-b border-slate-200 dark:border-[#333333] flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">architecture.diagram</span>
          </div>
          <pre className="bg-white dark:bg-[#000000] p-6 text-xs sm:text-sm font-mono overflow-x-auto text-slate-900 dark:text-orange-500 m-0 border-none rounded-none leading-tight">
            {asciiArchitecture}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Core Challenges Encountered</h2>
        <div className="space-y-6 mb-8">
          <div>
            <h4 className="font-bold flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <ShieldCheck className="h-4 w-4" /> Idempotency Interfaces
            </h4>
            <p className="text-sm mt-1">
              Message queues guarantee "At Least Once" delivery, meaning a worker might process the same <code>SEND_EMAIL</code> task twice. 
              <br/><strong>Solution:</strong> We utilized strict idempotency keys (<code>transaction_id + task_type</code>) stored in a Redis cache. Before a worker fires an email, it runs an atomic <code>SETNX</code> check. If the key exists, it silently acknowledges the message and drops it.
            </p>
          </div>
          <div>
            <h4 className="font-bold flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <ShieldCheck className="h-4 w-4" /> Backpressure Handling
            </h4>
            <p className="text-sm mt-1">
              If an external service throttles our worker pool with `HTTP 429 Too Many Requests`, the queue fills up endlessly.
              <br/><strong>Solution:</strong> Exponential Backoff configuration on the Consumer Groups. The worker will attempt processing at `1s`, `2s`, `4s`, `8s` intervals. If it fails 5 times, it drops the message into a Dead Letter Queue (DLQ) preventing a poisoned message from stalling the partition.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. Trade-offs Embraced</h2>
        <p className="mb-4">
          Queue-based execution forces a paradigm shift to <strong>Eventual Consistency</strong>. 
          <br/><br/>
          We traded immediate confirmation for absolute resiliency. When the API returns <code>200 OK</code> in 0.7s, the user does not have their PDF yet. We had to mitigate this trade-off heavily on the Frontend by relying on Optimistic UI rendering and Polling/WebSockets to notify the user when the background worker actually flushed the pipeline.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7. Future Improvements</h2>
        <p className="mb-12">
          The current architecture relies heavily on separate microservice workers pulling from individual queues. Moving forward, as complex spanning transactions arise, a <strong>Saga Pattern</strong> orchestrator (like Temporal) should be deployed to elegantly handle compensating actions (rollbacks across distributed, asynchronous nodes).
        </p>

        {/* Footer Navigation */}
        <Link href="/blog/latency-optimization" className="block pt-12 border-t border-slate-200 dark:border-neutral-800 flex justify-between items-center hover:opacity-80 transition-opacity cursor-pointer group">
          <div>
             <span className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Context</span>
             <h4 className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">How to Think About Latency</h4>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
