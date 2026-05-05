import { Cpu, Zap, Video, Calendar, MapPin, ExternalLink, Award, TrendingUp } from "lucide-react";

const EXPERIENCES = [
  {
    title: "Software Development Engineer",
    company: "Harman International",
    location: "Bangalore",
    date: "Jan 2025 - Present",
    icon: Cpu,
    color: "blue",
    impact: [
      { text: "Architected an event-driven WebSocket pipeline backed by Redis Pub/Sub, replacing legacy API polling and cutting P99 booking latency from 6s to 0.8s across multiple stateless server instances.", highlight: "6s to 0.8s" },
      { text: "Designed an asynchronous execution model using Kafka to decouple critical paths, cutting workflow latency from 8s to 0.7s. Enforced at-least-once semantics with idempotency keys to prevent duplicate processing.", highlight: "idempotency keys" },
      { text: "Engineered a robust state machine utilizing MySQL row-level locking (SELECT FOR UPDATE) and optimistic versioning to enforce lifecycle constraints, eliminating 90% of invalid data states.", highlight: "optimistic versioning" },
      { text: "Optimized critical database access paths in MySQL via composite indexing and query execution plan restructuring, reducing P95 read latency by 25% across tables exceeding 1M+ rows.", highlight: "P95 read latency" },
      { text: "Built an LLM-integrated orchestration service to dynamically route interdependent workflows across 20+ microservices, maintaining deterministic execution guarantees.", highlight: "deterministic execution" },
      { text: "Decoupled tightly bound legacy workflows into independent service-layer abstractions, reducing regression issues by 30% and establishing clear domain boundaries.", highlight: "service-layer abstractions" },
      { text: "Implemented comprehensive system observability and failure surfacing mechanisms, reducing Mean Time To Resolution (MTTR) for production incidents by 60%.", highlight: "observability" }
    ]
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "Assisto Technologies Ltd.",
    location: "Pune",
    date: "Jan 2024 - May 2024",
    icon: Zap,
    color: "amber",
    impact: [
      { text: "Designed and deployed production RAG pipelines, integrating LLM inference with vector-based retrieval systems to improve semantic search relevance.", highlight: "RAG pipelines" },
      { text: "Optimized model inference pipelines through caching and batching strategies, reducing end-to-end response latency by 30%.", highlight: "latency by 30%" },
      { text: "Integrated speech processing models into asynchronous backend workflows for automated large-scale audio transcription.", highlight: "asynchronous backend workflows" }
    ]
  }
];

export default function ExperiencePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 pb-24 relative">
      {/* Ambient background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-blue-500/10 dark:bg-blue-500/20 blur-[120px] -z-10 rounded-full pointer-events-none" />

      <div className="mb-16 space-y-4 relative animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 text-sm font-medium mb-2 transition-all hover:bg-blue-100 dark:hover:bg-blue-900/50">
          <TrendingUp className="h-4 w-4" />
          Career Journey
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
          Experience & Impact
        </h1>
        <p className="text-slate-600 dark:text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Measuring success through system efficiency, performance optimization, and architectural reliability.
        </p>
      </div>

      <div className="relative space-y-16">
        {/* Continuous Timeline Line with Gradient */}
        <div className="absolute left-6 md:left-8 top-8 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-slate-200 to-transparent dark:from-blue-500/50 dark:via-neutral-800 dark:to-transparent rounded-full" />

        {EXPERIENCES.map((exp, index) => (
          <div 
            key={exp.company + index} 
            className="relative pl-16 md:pl-20 animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms`, opacity: 0 }}
          >
            {/* Timeline Icon */}
            <div className={`absolute left-0 h-12 w-12 md:h-16 md:w-16 rounded-2xl flex items-center justify-center bg-white dark:bg-neutral-900 border-2 border-slate-200 dark:border-neutral-800 shadow-sm z-10 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] dark:group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]`}>
              <exp.icon className={`h-6 w-6 md:h-8 md:w-8 ${
                exp.color === 'blue' ? 'text-blue-500' : 
                exp.color === 'amber' ? 'text-amber-500' : 
                'text-purple-500'
              } transition-transform duration-300`} />
            </div>

            <div className="group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400">
                    {exp.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm font-medium text-slate-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5" />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 dark:bg-neutral-800/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-neutral-700/50 shrink-0">
                  <Calendar className="h-3.5 w-3.5" />
                  {exp.date}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {exp.impact.map((point, pIndex) => {
                  // Logic to highlight specific parts of the text
                  const parts = point.text.split(new RegExp(`(${point.highlight})`, 'gi'));
                  
                  return (
                    <div 
                      key={pIndex} 
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/50 dark:bg-neutral-900/30 border border-transparent hover:border-slate-200 dark:hover:border-neutral-700/50 hover:bg-white dark:hover:bg-neutral-800/50 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group/point"
                    >
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-neutral-600 group-hover/point:bg-blue-500 group-hover/point:scale-125 transition-all" />
                      <p className="text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
                        {parts.map((part, i) => (
                          part.toLowerCase() === point.highlight.toLowerCase() ? (
                            <span key={i} className="font-bold text-slate-900 dark:text-white bg-blue-100 dark:bg-blue-900/20 px-1 rounded">
                              {part}
                            </span>
                          ) : part
                        ))}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
