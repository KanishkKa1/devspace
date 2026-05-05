"use client";

import { Activity, Zap, RefreshCw, Gauge, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";

export default function LatencyOptimization() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 pb-24 animate-fade-in-up">
      {/* Header Section */}
      <div className="mb-12 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-mono text-sm mb-4">
            <Activity className="h-4 w-4" />
            <span className="tracking-widest uppercase">System Thinking Case Study</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            Destroying Latency: <br/>From 7.5s to 0.8s in Booking Systems
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Gauge className="h-3.5 w-3.5" /> High Performance</span>
            <span className="flex items-center gap-1"><Layers className="h-3.5 w-3.5" /> Event-Driven Arch</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>
        <Link 
          href="/blog/workflow-optimization"
          className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 px-4 py-2 rounded-md transition-colors w-fit border border-slate-200 dark:border-slate-700 shrink-0 mt-2 sm:mt-0"
        >
          <span>Next: Fault Tolerance</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        
        {/* Abstract/Intro */}
        <p className="text-xl leading-relaxed text-slate-600 dark:text-[#b4b4b4] border-l-4 border-blue-500/20 pl-6 mb-12 italic">
          Architecture is a series of trade-offs. In this case, the trade-off was between the simplicity of REST polling and the performance of an asynchronous, event-driven engine.
        </p>

        {/* The Impact Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-8 rounded-2xl bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30">
            <div className="text-rose-600 dark:text-rose-400 font-mono text-xs uppercase mb-2 tracking-widest">Legacy State</div>
            <div className="text-4xl font-bold text-rose-700 dark:text-rose-500 mb-1">7.5s</div>
            <div className="text-sm text-rose-600/80 dark:text-rose-400/60 font-medium">Average Booking Latency</div>
            <p className="mt-4 text-xs text-rose-800 dark:text-rose-300/80 leading-relaxed">
              Polling-heavy REST APIs creating "Thundering Herd" problems. Servers spent more time handling HTTP handshakes than processing business logic.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase mb-2 tracking-widest">Optimized State</div>
            <div className="text-4xl font-bold text-emerald-700 dark:text-emerald-500 mb-1">0.8s</div>
            <div className="text-sm text-emerald-600/80 dark:text-emerald-400/60 font-medium">87% Reduction in Latency</div>
            <p className="mt-4 text-xs text-emerald-800 dark:text-emerald-300/80 leading-relaxed">
              Real-time WebSocket streaming with an event-driven backend. Instant state propagation without the overhead of repeated request-response cycles.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6">
          <RefreshCw className="h-6 w-6 text-blue-500" />
          The Mental Model: Polling vs. Push
        </h2>
        <p className="mb-6">
          The biggest bottleneck in the legacy system was <strong>Competitive Polling</strong>. When thousands of users are "waiting" for a booking confirmation, their clients spam the server with REST requests every 500ms. 
        </p>
        <p className="mb-8 bg-slate-50 dark:bg-neutral-900 p-6 rounded-xl border border-slate-200 dark:border-neutral-800 font-mono text-sm">
          // The Anti-pattern: High-Frequency Polling<br/>
          GET /api/booking/status?id=123 (600ms RTT)<br/>
          GET /api/booking/status?id=123 (600ms RTT)<br/>
          GET /api/booking/status?id=123 <span className="text-blue-500">{"->"} [Found!]</span>
        </p>
        <p className="mb-12">
          This creates a massive "Thundering Herd" where the server is bombarded with redundant queries. The fix wasn't "faster code"—it was a **Fundamental Shift in Communication**.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6">
          <Zap className="h-6 w-6 text-amber-500" />
          Event-Driven WebSocket Architecture
        </h2>
        <p className="mb-6">
          Instead of the client asking <em>"Are we there yet?"</em>, we moved to a model where the server says <em>"It's ready, here's the data."</em>
        </p>
        <div className="flex flex-col gap-4 mb-12">
          <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-200 dark:border-neutral-800">
             <div className="h-8 w-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
               <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
             </div>
             <div>
               <h4 className="font-bold text-slate-800 dark:text-slate-200">Asynchronous API Chaining</h4>
               <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Clients fire a single booking request and immediately get a "Processing" ACK (20ms), freeing up the main thread.</p>
             </div>
          </div>
          <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-200 dark:border-neutral-800">
             <div className="h-8 w-8 rounded bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
               <span className="text-amber-600 dark:text-amber-400 font-bold">2</span>
             </div>
             <div>
               <h4 className="font-bold text-slate-800 dark:text-slate-200">Stateful WebSocket Connections</h4>
               <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">The client opens a single persistent socket. No more TCP/TLS handshake overhead for every status check.</p>
             </div>
          </div>
          <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-200 dark:border-neutral-800">
             <div className="h-8 w-8 rounded bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
               <span className="text-emerald-600 dark:text-emerald-400 font-bold">3</span>
             </div>
             <div>
               <h4 className="font-bold text-slate-800 dark:text-slate-200">Internal Event Bus (Pub/Sub)</h4>
               <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Once the worker completes the booking logic, it publishes an event. The WebSocket gateway catches this and "pushes" the update to the specific client instantly.</p>
             </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6">
          The Engineering Trade-off
        </h2>
        <p className="mb-12">
          This transition reduced perceived transaction latency from <strong>7.5s to 0.8s</strong>. However, it introduced complexity: We now had to manage **Stateful Connections** and **Sticky Sessions**. This required a load balancer that understood the WebSocket protocol (L7) and a distributed Redis layer for session tracking. But for the end-user, the experience went from "clunky and slow" to "instantaneous."
        </p>

        {/* Footer Navigation */}
        <Link href="/blog/workflow-optimization" className="block pt-12 border-t border-slate-200 dark:border-neutral-800 flex justify-between items-center hover:opacity-80 transition-opacity cursor-pointer group">
          <div>
             <span className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Context</span>
             <h4 className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Workflow Optimization</h4>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
