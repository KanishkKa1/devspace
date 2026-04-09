export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 pb-20">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Projects Directory</h1>
      <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-[#cccccc]">
        <p>
          I build full-stack applications, deep-tech systems, and various open source utilities. You can navigate specific systems via the sidebar under the <code className="bg-slate-100 dark:bg-[#333] px-1 py-0.5 rounded text-sm text-pink-600 dark:text-pink-400 font-mono">systems/</code> directory.
        </p>
      </div>
    </div>
  );
}
