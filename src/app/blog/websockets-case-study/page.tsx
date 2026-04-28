import { CodeBlock } from "@/components/ui/CodeBlock";
import { ArrowRight, Server, Zap, RefreshCw, Layers, ShieldCheck, Activity } from "lucide-react";

export default function WebsocketCaseStudyPage() {
  const asciiArchitecture = `
[CLIENT TIER]
      │ (10k CCU) 
      ▼
┌───────────────────────────────────────────────┐
│              L7 LOAD BALANCER                 │
│      (Sticky Sessions / Hash on User_ID)      │
└────────────┬─────────────────────┬────────────┘
             │                     │
      (ws:// Upgrade)       (ws:// Upgrade)
             │                     │
             ▼                     ▼
┌─────────────────────┐   ┌─────────────────────┐
│    NODE_APP_1       │   │    NODE_APP_2       │
│ (Stateful Sockets)  │   │ (Stateful Sockets)  │
│  [100MB RAM/10k]    │   │  [100MB RAM/10k]    │
└──────────┬──────────┘   └──────────┬──────────┘
           │                         │
           └──────────┐   ┌──────────┘
             (Redis Pub/Sub Bus)
                      ▼
┌───────────────────────────────────────────────┐
│              REDIS BACKPLANE                  │
│       (Channel: "user:status:events")         │
└─────────────────────┬─────────────────────────┘
                      │
                      ▼
┌───────────────────────────────────────────────┐
│             WORKER FLEET (Producers)          │
│       [ Executes Heavy Booking Logic ]        │
└───────────────────────────────────────────────┘`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 pb-24 animate-fade-in-up">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 text-red-500 font-mono text-sm mb-4">
          <Activity className="h-4 w-4" />
          <span className="tracking-widest uppercase">System Design Interview Focus</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
          System Design: Scaling State <br/>(Polling vs WebSockets)
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1"><Server className="h-3.5 w-3.5" /> Stateful Architecture</span>
          <span className="flex items-center gap-1"><RefreshCw className="h-3.5 w-3.5" /> Concurrency</span>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        
        {/* The Impact Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-8 rounded-2xl bg-slate-50 dark:bg-[#111822] border border-slate-100 dark:border-[#1E2329]">
            <div className="text-slate-500 font-mono text-xs uppercase mb-2 tracking-widest">Legacy Benchmark</div>
            <div className="text-4xl font-bold text-slate-800 dark:text-white mb-1">7.5s</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">P99 Latency under Load</div>
            <p className="mt-4 text-xs text-slate-600 dark:text-slate-500 leading-relaxed">
              Polling (1 req/sec per client) generated thousands of short-lived TCP handshakes, crippling the load balancer via ephemeral port exhaustion.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-green-50 dark:bg-[#071F11] border border-green-100 dark:border-[#0D2D1A]">
            <div className="text-[#22C55E] font-mono text-xs uppercase mb-2 tracking-widest">Optimized Benchmark</div>
            <div className="text-4xl font-bold text-[#22C55E] mb-1">0.8s</div>
            <div className="text-sm text-green-700 dark:text-[#22C55E]/80 font-medium">P99 Event Propagation</div>
            <p className="mt-4 text-xs text-green-800 dark:text-emerald-700 leading-relaxed">
              Transitioning to persistent WebSockets dropped server-side request parsing completely, trading CPU cycles for raw RAM consumption.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. The Problem Space</h2>
        <p className="mb-6">
          In a high-throughput booking engine, clients need immediate confirmation of their order. When 10,000 Concurrent Users (CCU) wait for a background worker to finish processing, they inherently demand real-time state.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Why Polling Mathematically Fails</h2>
        <p className="mb-4">
          A naive implementation uses short polling (HTTP GET every 1s). 
        </p>
        <div className="p-5 bg-slate-50 dark:bg-[#111822] rounded-lg border border-slate-200 dark:border-[#1E2329] font-mono text-sm mb-8">
          <strong>Load Calculation:</strong><br/>
          - <code>10,000 CCU * 1 req/sec = 10,000 RPS</code><br/>
          - <strong>TCP Overhead:</strong> SYN, SYN-ACK, ACK on every connection lifecycle.<br/>
          - <strong>Result:</strong> 99% of requests hit the database just to verify <code>status == "PENDING"</code>. It creates a Thundering Herd that exhausts DB connection pools and OS file descriptors (TIME_WAIT state).
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Design Decision & Alternatives</h2>
        <ul className="list-disc pl-5 space-y-4 mb-8">
          <li><strong>Long Polling:</strong> Cheaper on TCP, but vulnerable to connection drops and complicated timeout logic.</li>
          <li><strong>Server-Sent Events (SSE):</strong> Perfect for unidirectional (Server &rarr; Client), but often runs into browser limits (HTTP/1.1 allows 6 connections max per domain).</li>
          <li><strong>WebSockets (Chosen):</strong> Full-duplex persistent connection. Reduces HTTP header overhead from 800 bytes per request to ~2-10 bytes per frame.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. System Architecture</h2>
        <p className="mb-4">
          Shifting from stateless REST to a Stateful architecture requires an isolation layer. You cannot directly route WebSocket traffic into your backend API without compromising deployments.
        </p>
        <div className="mb-8 w-full overflow-hidden rounded-xl border border-slate-200 dark:border-[#1E2329] max-w-[800px] flex justify-center bg-slate-50 dark:bg-[#0B0F14] p-8">
          <svg width="600" height="360" viewBox="0 0 600 360" className="text-slate-800 dark:text-slate-300 font-sans text-xs">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" className="fill-slate-400 dark:fill-slate-600" />
              </marker>
            </defs>
            
            {/* Clients */}
            <rect x="150" y="20" width="100" height="30" rx="4" className="fill-slate-100 dark:fill-[#1E2329] stroke-slate-300 dark:stroke-[#333]" />
            <text x="200" y="39" textAnchor="middle" className="font-semibold fill-slate-700 dark:fill-slate-300">Client A</text>

            <rect x="350" y="20" width="100" height="30" rx="4" className="fill-slate-100 dark:fill-[#1E2329] stroke-slate-300 dark:stroke-[#333]" />
            <text x="400" y="39" textAnchor="middle" className="font-semibold fill-slate-700 dark:fill-slate-300">Client B</text>

            {/* LB */}
            <rect x="100" y="90" width="400" height="40" rx="4" className="fill-slate-100 dark:fill-[#1E2329] stroke-slate-300 dark:stroke-[#333]" strokeWidth="2" />
            <text x="300" y="115" textAnchor="middle" className="font-bold fill-slate-700 dark:fill-slate-300">L7 Load Balancer (Hash/Sticky)</text>

            <path d="M 200 50 L 200 90" fill="none" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 400 50 L 400 90" fill="none" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" markerEnd="url(#arrow)" />

            <text x="160" y="75" className="fill-slate-500 text-[10px]">ws://</text>
            <text x="410" y="75" className="fill-slate-500 text-[10px]">ws://</text>

            {/* Nodes */}
            <rect x="120" y="170" width="140" height="60" rx="4" className="fill-white dark:fill-[#1E2329] stroke-slate-300 dark:stroke-[#444]" />
            <text x="190" y="195" textAnchor="middle" className="font-bold fill-slate-800 dark:fill-white">Node 1</text>
            <text x="190" y="215" textAnchor="middle" className="fill-[#3B82F6] text-[10px]">(Stateful WS)</text>

            <rect x="340" y="170" width="140" height="60" rx="4" className="fill-white dark:fill-[#1E2329] stroke-slate-300 dark:stroke-[#444]" />
            <text x="410" y="195" textAnchor="middle" className="font-bold fill-slate-800 dark:fill-white">Node 2</text>
            <text x="410" y="215" textAnchor="middle" className="fill-[#3B82F6] text-[10px]">(Stateful WS)</text>

            <path d="M 200 130 L 200 170" fill="none" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 400 130 L 400 170" fill="none" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Redis Backplane */}
            <rect x="100" y="270" width="400" height="40" rx="4" className="fill-slate-100 dark:fill-[#1E2329] stroke-slate-300 dark:stroke-[#333]" strokeWidth="2" />
            <text x="300" y="295" textAnchor="middle" className="font-bold fill-slate-700 dark:fill-slate-300">Redis Pub/Sub Bus</text>

            <path d="M 200 270 L 200 230" fill="none" className="stroke-[#3B82F6]" strokeWidth="2" markerStart="url(#arrow)" />
            <path d="M 400 270 L 400 230" fill="none" className="stroke-[#3B82F6]" strokeWidth="2" markerStart="url(#arrow)" />
            
            <text x="210" y="255" className="fill-slate-500 text-[10px]">Subscribe</text>
            <text x="410" y="255" className="fill-slate-500 text-[10px]">Subscribe</text>

            {/* Background Workers */}
            <rect x="250" y="330" width="100" height="30" rx="4" className="fill-[#071F11] stroke-[#0D2D1A]" />
            <text x="300" y="350" textAnchor="middle" className="font-bold fill-[#22C55E] text-[10px]">Worker (Publisher)</text>

            <path d="M 300 330 L 300 310" fill="none" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" markerEnd="url(#arrow)" />

          </svg>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Core Challenges</h2>
        <div className="space-y-6 mb-8">
          <div>
            <h4 className="font-bold flex items-center gap-2 text-[#F59E0B]">
              <ShieldCheck className="h-4 w-4" /> State Consistency & The Split-Brain
            </h4>
            <p className="text-sm mt-1">
              If Node 1 processes a user's web socket, but the background worker commits the booking on Node 2, Node 1 doesn't know to push the update.
              <br/><strong>Solution:</strong> A Redis Pub/Sub Backplane. The worker dumps the event to Redis. All WS nodes subscribe to Redis. Node 1 sees the event, detects it holds the socket for that user, and fires the frame.
            </p>
          </div>
          <div>
            <h4 className="font-bold flex items-center gap-2 text-[#F59E0B]">
              <ShieldCheck className="h-4 w-4" /> Backpressure Handling
            </h4>
            <p className="text-sm mt-1">
              What if a client connects from a 3G network and cannot drain the TCP buffer fast enough? The server's OS memory starts filling up buffering outbound frames.
              <br/><strong>Solution:</strong> Application-level dropping. We implement a ring-buffer per socket. If the user's outbound queue exceeds 5MB, we drop non-critical "intermediate" status updates and only send the final state, effectively discarding stale ticks.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. Trade-offs Embraced</h2>
        <p className="mb-4">
          Engineering is about pain selection. By picking WebSockets, I chose the pain of <strong>Stateful Deployments</strong>. When we push a new Docker image, terminating a stateless Node.js REST server is easy. Terminating a WebSocket node severs 10,000 active connections simultaneously, causing a reconnection tsunami (Thundering Herd 2.0). 
          <br/><br/>
          We traded horizontal scalability for raw latency, and mitigated the reconnection storm by implementing Jittered Backoff algorithms on the client side.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7. Future Improvements</h2>
        <p className="mb-12">
          As the system scales beyond 1M CCU, Redis Pub/Sub becomes a bottleneck (it broadcasts to all nodes, resulting in <code>O(N)</code> network noise). The logical next step is migrating the backplane from Redis Pub/Sub to a partitioned Apache Kafka topology, allowing Consumer Groups to filter traffic geographically before it reaches the WS nodes.
        </p>

      </div>
    </div>
  );
}
