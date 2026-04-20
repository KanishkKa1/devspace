export default function LeetcodeDirectory() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 pb-20 animate-fade-in-up">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Algorithmic Thinking Patterns</h1>
      <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-[#cccccc]">
        <p className="text-lg leading-relaxed">
          Instead of just solutions, this section explores the <strong>mental models</strong> and <strong>core patterns</strong> used to break down complex problems. 
          From dynamic programming from first principles to optimizing algorithms for cache locality and memory alignment.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="p-6 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Pattern Recognition</h3>
            <p className="text-sm">Breaking down problems into known algorithmic primitives like Monotonic Stacks, Sliding Windows, and Interval Scheduling.</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">System-Level Optimization</h3>
            <p className="text-sm">Analyzing how data structures interact with the hardware—focusing on cache hits, branch prediction, and SIMD potential.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
