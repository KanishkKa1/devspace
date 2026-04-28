export default function SkillsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 pb-24">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Technical Expertise</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
        <div className="border border-slate-200 dark:border-neutral-800 p-6 rounded bg-slate-50 dark:bg-[#1e1e1e]">
          <h2 className="text-lg font-bold text-blue-600 dark:text-[#569cd6] mb-4">1. Systems Programming</h2>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-[#cccccc]">
            <li>• C++17/20</li>
            <li>• Multithreading (std::thread, std::async)</li>
            <li>• Synchronization (mutex, atomics, CVs)</li>
            <li>• Memory Model & RAII (Rule of 5)</li>
            <li>• Custom Allocators & Smart Pointers</li>
          </ul>
        </div>

        <div className="border border-slate-200 dark:border-neutral-800 p-6 rounded bg-slate-50 dark:bg-[#1e1e1e]">
          <h2 className="text-lg font-bold text-emerald-600 dark:text-[#4ec9b0] mb-4">2. Distributed Systems</h2>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-[#cccccc]">
            <li>• Messaging & Event Queues (Kafka patterns)</li>
            <li>• Consistency Models & Trade-offs</li>
            <li>• Scaling Strategies (Sharding, Replication)</li>
            <li>• Rate Limiting Architectures (Token Bucket)</li>
          </ul>
        </div>

        <div className="border border-slate-200 dark:border-neutral-800 p-6 rounded bg-slate-50 dark:bg-[#1e1e1e]">
          <h2 className="text-lg font-bold text-purple-600 dark:text-[#c586c0] mb-4">3. Backend Architecture</h2>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-[#cccccc]">
            <li>• API Design (REST / MCP)</li>
            <li>• Event-driven architecture</li>
            <li>• Async execution boundaries</li>
            <li>• Data storage optimizations</li>
          </ul>
        </div>

        <div className="border border-slate-200 dark:border-neutral-800 p-6 rounded bg-slate-50 dark:bg-[#1e1e1e]">
          <h2 className="text-lg font-bold text-orange-600 dark:text-[#ce9178] mb-4">4. AI Systems Infrastructure</h2>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-[#cccccc]">
            <li>• State Machine Orchestration</li>
            <li>• Tool Execution Protocols (MCP)</li>
            <li>• Idempotent Workflow Retries</li>
            <li>• Extensible agent architectures</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
