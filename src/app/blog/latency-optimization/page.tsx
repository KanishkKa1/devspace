export default function LatencyOptimization() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
          How I reduced latency from 6s to 0.8s
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-slate-500 dark:text-[#858585]">
          <span className="bg-slate-100 dark:bg-neutral-800 px-2 py-1 rounded">System Design</span>
          <span className="bg-slate-100 dark:bg-neutral-800 px-2 py-1 rounded">Performance</span>
          <span>•</span>
          <span>April 2026</span>
        </div>
      </div>
      
      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-[#cccccc]">
        <p className="text-lg leading-relaxed text-slate-600 dark:text-[#b4b4b4]">
          This post covers the strategies and architectural changes implemented to drastically cut down processing times in a high-throughput backend system.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4 text-slate-800 dark:text-white">1. Understanding the Bottlenecks</h2>
        <p className="mb-4">
          The initial architecture relied heavily on a traditional, synchronous REST API. The core processing pipeline was taking upwards of 6 seconds to complete. By deeply analyzing the entire backend design and profiling the existing API flows, it became clear that the system suffered from sequential locking.
        </p>
        
        <h2 className="text-xl font-semibold mt-10 mb-4 text-slate-800 dark:text-white">2. Database and Architectural Overhaul</h2>
        <p className="mb-4">
          The root of the slowdown wasn't just poor code; it was fundamental to how the database and architecture interacted. I restructured the database schema to eliminate N+1 query problems and implemented aggressive indexing on heavy read-paths. More importantly, I transitioned the monolithic polling mechanism into an event-driven architecture, cleanly decoupling the worker queues from the client-facing APIs.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4 text-slate-800 dark:text-white">3. API Chaining & WebSockets</h2>
        <p className="mb-4">
          Synchronous waiting was destroyed entirely. I designed an asynchronous API chain where heavy initialization processes fire off independently while the client immediately connects via WebSockets. Instead of polling REST endpoints and dragging down the server, WebSockets now stream state changes in real-time. 
        </p>

        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 rounded-r-lg">
           <h3 className="text-green-800 dark:text-green-400 font-bold mb-2">The Result</h3>
           <p className="text-green-700 dark:text-green-500/80 m-0 text-sm">
             By fundamentally understanding the backend design, shifting blocking calls to an optimized API chain, and introducing real-time WebSockets, the total perceived transaction latency nosedived from <strong>6.0 seconds to 0.8 seconds</strong>, vastly improving the system's throughput limitations.
           </p>
        </div>
      </div>
    </div>
  );
}
