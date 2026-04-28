import { CodeBlock } from "@/components/ui/CodeBlock";
import { ArrowRight, Server, Repeat, RefreshCw, Layers, Zap } from "lucide-react";

export default function DistributedQueuePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 pb-24 animate-fade-in-up">
      {/* Experience Tag */}
      <div className="mb-6 flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-md w-fit border border-blue-200 dark:border-blue-800">
        <Server className="h-4 w-4" />
        <span>DERIVED FROM PRODUCTION EXPERIENCE (DISTRIBUTED BACKENDS)</span>
      </div>

      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
          Distributed Execution Layer: <br/>Partitioned Log & Consumer Groups
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1"><Layers className="h-3.5 w-3.5" /> Distributed Systems</span>
          <span className="flex items-center gap-1"><RefreshCw className="h-3.5 w-3.5" /> High Availability</span>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-xl leading-relaxed text-slate-600 dark:text-[#b4b4b4] border-l-4 border-amber-500/20 pl-6 mb-12 italic">
          Scaling a single-node thread pool isn't enough when you outgrow monolithic design. Moving to a distributed queue architecture (similar to Kafka/RabbitMQ) introduced a myriad of complexities regarding node coordination, message ordering, and idempotency guarantees.
        </p>

        {/* The Impact Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-8 rounded-2xl bg-amber-50 dark:bg-[#1a1a1a] border border-amber-100 dark:border-neutral-800">
            <div className="text-slate-500 font-mono text-xs uppercase mb-2 tracking-widest flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-500" />
              Throughput Scale
            </div>
            <div className="text-4xl font-bold text-amber-700 dark:text-white mb-1">100,000+</div>
            <div className="text-sm text-amber-600/80 dark:text-[#a0a0a0] font-medium">Events per Second (Simulated Target)</div>
            <p className="mt-4 text-xs text-amber-800 dark:text-[#737373] leading-relaxed">
              By shifting from synchronous monolithic API calls to distributed partitioned queueing, the system naturally absorbs extreme traffic spikes without dropping payloads.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-blue-50 dark:bg-[#1a1a1a] border border-blue-100 dark:border-neutral-800">
            <div className="text-slate-500 font-mono text-xs uppercase mb-2 tracking-widest flex items-center gap-2">
              <Repeat className="h-4 w-4 text-blue-500" />
              Fault Resilience
            </div>
            <div className="text-4xl font-bold text-blue-700 dark:text-white mb-1">Zero</div>
            <div className="text-sm text-blue-600/80 dark:text-[#a0a0a0] font-medium">Dropped Executions</div>
            <p className="mt-4 text-xs text-blue-800 dark:text-[#737373] leading-relaxed">
              If a consumer worker crashes mid-process, un-ACKed messages revert to the queue for retry allocation, guaranteeing At-Least-Once delivery.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Architecture: The Partitioned Log
        </h2>
        
        {/* Architecture Diagram */}
        <div className="my-8 w-full overflow-x-auto rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 p-6 flex justify-center">
          <svg width="700" height="300" viewBox="0 0 700 300" className="text-slate-800 dark:text-slate-300 font-mono text-xs">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" className="fill-slate-400 dark:fill-slate-600" />
              </marker>
            </defs>
            
            {/* Producers */}
            <rect x="20" y="50" width="100" height="40" rx="4" className="fill-slate-100 dark:fill-[#252526] stroke-slate-300 dark:stroke-[#333]" strokeWidth="2" />
            <text x="70" y="75" textAnchor="middle" className="font-semibold fill-slate-700 dark:fill-slate-300">API Gateway</text>
            
            <rect x="20" y="110" width="100" height="40" rx="4" className="fill-slate-100 dark:fill-[#252526] stroke-slate-300 dark:stroke-[#333]" strokeWidth="2" />
            <text x="70" y="135" textAnchor="middle" className="font-semibold fill-slate-700 dark:fill-slate-300">CRON Jobs</text>
            
            {/* Event lines */}
            <path d="M 120 70 L 210 100" fill="none" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 120 130 L 210 130" fill="none" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Partitioned Log (Topic) */}
            <rect x="220" y="40" width="180" height="200" rx="4" className="fill-amber-50/50 dark:fill-[#1e1c14] stroke-amber-200 dark:stroke-[#3d3314]" strokeWidth="2" />
            <text x="310" y="65" textAnchor="middle" className="font-bold fill-amber-700 dark:fill-amber-500">Order Topic</text>

            <rect x="240" y="80" width="140" height="30" rx="2" className="fill-white dark:fill-[#141414] stroke-slate-200 dark:stroke-[#333]" />
            <text x="310" y="100" textAnchor="middle" className="fill-slate-500">Partition 0 (A-M)</text>

            <rect x="240" y="120" width="140" height="30" rx="2" className="fill-white dark:fill-[#141414] stroke-slate-200 dark:stroke-[#333]" />
            <text x="310" y="140" textAnchor="middle" className="fill-slate-500">Partition 1 (N-Z)</text>
            
            <rect x="240" y="160" width="140" height="30" rx="2" className="fill-white dark:fill-[#141414] stroke-slate-200 dark:stroke-[#333]" />
            <text x="310" y="180" textAnchor="middle" className="fill-slate-500">Partition 2 (Misc)</text>

            {/* Consume Lines */}
            <path d="M 400 95 L 490 70" fill="none" className="stroke-blue-400 dark:stroke-blue-600" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 400 135 L 490 130" fill="none" className="stroke-blue-400 dark:stroke-blue-600" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 400 175 L 490 190" fill="none" className="stroke-blue-400 dark:stroke-blue-600" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Consumer Group */}
            <rect x="480" y="30" width="180" height="220" rx="4" className="fill-slate-50 dark:fill-[#161b22] stroke-blue-200 dark:stroke-[#1f293d]" strokeWidth="2" strokeDasharray="4" />
            <text x="570" y="50" textAnchor="middle" className="font-bold fill-blue-700 dark:fill-blue-400 text-[10px]">Consumer Group: Payment</text>

            <rect x="500" y="60" width="140" height="40" rx="4" className="fill-white dark:fill-[#0d1117] stroke-blue-300 dark:stroke-[#2d3b55]" />
            <text x="570" y="85" textAnchor="middle" className="font-bold fill-slate-700 dark:fill-slate-300">Worker Node 1</text>
            
            <rect x="500" y="110" width="140" height="40" rx="4" className="fill-white dark:fill-[#0d1117] stroke-blue-300 dark:stroke-[#2d3b55]" />
            <text x="570" y="135" textAnchor="middle" className="font-bold fill-slate-700 dark:fill-slate-300">Worker Node 2</text>

            <rect x="500" y="170" width="140" height="40" rx="4" className="fill-rose-50/50 dark:fill-[#2d1115] stroke-rose-300 dark:stroke-[#4d1d23]" strokeDasharray="2" />
            <text x="570" y="195" textAnchor="middle" className="font-bold fill-rose-700 dark:fill-rose-400 tracking-wider">DEAD NODE</text>
            <text x="570" y="240" textAnchor="middle" className="fill-slate-500 text-[9px] italic">Rebalancing...</text>
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
          Critical Concurrency Concepts
        </h2>

        <div className="space-y-8">
          <div className="border-l-4 border-amber-500 pl-6 py-2">
            <h3 className="font-bold text-slate-800 dark:text-white mb-2 italic">1. Partitioning for Scale vs. Order</h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0]">
              In a single FIFO queue, maintaining strict order implies single-threaded execution globally—which kills throughput. To scale, we <strong>partition</strong> the queue. By hashing a routing key (e.g., <code>user_id</code>), we guarantee that all events for a specific user land in the same partition. This retains strict chronological ordering <em>per entity</em>, while allowing N distinct partitions to be processed entirely in parallel.
            </p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-6 py-2">
            <h3 className="font-bold text-slate-800 dark:text-white mb-2 italic">2. Idempotency Guarantees</h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0]">
              Distributed systems guarantee <strong>At-Least-Once</strong> delivery by default. Network partitions or worker OOMs guarantee that your worker will eventually execute the same payload twice. Therefore, the execution logic must be mathematically <strong>Idempotent</strong>. We implemented logical idempotency keys (<code>tx_hash</code>) verified against a distributed cache (e.g. Redis) before initiating any state-mutating database records.
            </p>
          </div>

          <div className="border-l-4 border-rose-500 pl-6 py-2">
            <h3 className="font-bold text-slate-800 dark:text-white mb-2 italic">3. offset Management & The Two-Phase Problem</h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-[#a0a0a0]">
              If a worker writes to the database, then crashes before committing its partition offset back to the Broker, a new worker will inherit the partition and replay the transaction. We handle this via strict transactional boundaries where the offset update and the database write occur within the same transactional context where possible, or rely wholly on the Idempotency layer above.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
