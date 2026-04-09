export default function ExperiencePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 pb-20">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
        Experience
      </h1>
      <p className="text-slate-600 dark:text-[#cccccc] mb-10 leading-relaxed text-lg">
        A timeline of my professional work experience.
      </p>

      <div className="flex flex-col gap-10 border-l border-slate-200 dark:border-[#333333] ml-3 pl-6 relative">
        <div className="relative">
          <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-blue-500 bg-white dark:bg-[#1e1e1e] shadow-[0_0_0_4px_rgba(59,130,246,0.1)] dark:shadow-[0_0_0_4px_rgba(55,148,255,0.1)]" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3794ff] mb-1.5">
              Jan 2025 - Present
            </span>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
              Harman
            </h3>
            <p className="text-sm text-slate-600 dark:text-[#cccccc] mt-1.5 leading-relaxed">
              Software Engineer
            </p>
          </div>
        </div>

        <div className="relative">
          <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-slate-300 dark:border-slate-500 bg-white dark:bg-[#1e1e1e]" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">
              Jan 2024 - June 2024
            </span>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
              Assisto
            </h3>
            <p className="text-sm text-slate-600 dark:text-[#cccccc] mt-1.5 leading-relaxed">
              Developed dialog managers to handle autonomous chatbots and engineered 3 distinct chatbot systems for client deployment.
            </p>
          </div>
        </div>

        <div className="relative">
          <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-slate-300 dark:border-slate-500 bg-white dark:bg-[#1e1e1e]" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">
              2019 - 2021
            </span>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
              Motion Graphics
            </h3>
            <p className="text-sm text-slate-600 dark:text-[#cccccc] mt-1.5 leading-relaxed">
              Video Editor. Edited and composited high-fidelity video projects over a tenure in creative multimedia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
