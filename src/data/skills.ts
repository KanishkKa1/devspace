export interface Skill {
  name: string;
  context: string;
  impact: string;
  isRecent?: boolean;
}

export interface Domain {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

export interface SystemExperience {
  name: string;
  href?: string;
  environment: string;
  problem: string;
  constraints: string;
  architectureDecisions: string;
  tradeOffs: string;
  failureHandling: string;
  debugging: string;
  outcome: string;
  businessImpact: string;
}

export interface EngineeringDecision {
  title: string;
  context: string;
  decision: string;
  consequence: string;
}

export interface FailureLesson {
  title: string;
  whatBroke: string;
  impact: string;
  fix: string;
}

export const SKILL_DOMAINS: Domain[] = [
  {
    id: "systems-low-level",
    title: "Systems & Low-Level",
    description: "Memory management, concurrent execution, and hardware-sympathetic code.",
    skills: [
      { name: "C++20", context: "Primary systems language", impact: "Used for writing custom allocators, lock-free data structures, and SIMD optimizations.", isRecent: true },
      { name: "Concurrency", context: "Multi-threaded execution", impact: "Implemented work-stealing thread pools using memory barriers to avoid false sharing." },
      { name: "Memory Management", context: "RAII & Smart Pointers", impact: "Eliminated heap allocations on hot paths via pre-allocated memory pools." },
      { name: "SIMD", context: "Vectorized operations", impact: "Accelerated cosine similarity calculations for custom vector engine." }
    ]
  },
  {
    id: "backend-distributed",
    title: "Backend & Distributed Systems",
    description: "Network communication, asynchronous boundaries, and decoupled architectures.",
    skills: [
      { name: "Event-Driven Arch", context: "Asynchronous boundaries", impact: "Designed decoupled architectures for resilience." },
      { name: "Kafka", context: "Event streaming & messaging", impact: "Decoupled heavy background processing from critical path.", isRecent: true },
      { name: "REST / gRPC", context: "Service communication", impact: "Designed high-throughput internal RPCs." },
      { name: "WebSockets", context: "Bi-directional streaming", impact: "Powered low-latency real-time data feeds." },
      { name: "RBAC", context: "Security & authorization", impact: "Implemented fine-grained role-based access control for internal services." },
      { name: "Idempotency", context: "Idempotent API design", impact: "Prevented duplicate processing during network retries." },
    ]
  },
  {
    id: "ai-systems",
    title: "AI Infrastructure",
    description: "Building the infrastructure to reliably execute and orchestrate LLMs.",
    skills: [
      { name: "Python", context: "AI Orchestration", impact: "Built reliable multi-agent workflows using LangGraph and MCP for tool execution." },
      { name: "Vector Search", context: "Semantic search pipelines", impact: "Powered high-accuracy Retrieval-Augmented Generation (RAG)." },
      { name: "LangGraph", context: "State machine orchestration", impact: "Built reliable multi-agent workflows with retries.", isRecent: true },
    ]
  },
  {
    id: "data-layer",
    title: "Data Layer",
    description: "Schema design, consistency guarantees, and access optimization.",
    skills: [
      { name: "MySQL", context: "Primary relational datastore", impact: "Designed normalized schemas and optimized multi-join queries via B-Tree indexing.", isRecent: true },
      { name: "PostgreSQL", context: "Secondary datastore", impact: "Managed read-replicas for heavy aggregation reporting." },
      { name: "Redis", context: "Distributed caching", impact: "Implemented cache-aside strategies to shield the primary database during traffic spikes." },
      { name: "SQLite", context: "Embedded datastore", impact: "Provided lightweight, persistent local storage for edge-deployed agents." }
    ]
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Observability",
    description: "Deployment, telemetry, and keeping the system alive.",
    skills: [
      { name: "Docker", context: "Containerization", impact: "Ensured strictly reproducible builds across dev, CI, and production environments." },
      { name: "Prometheus", context: "Metrics collection", impact: "Instrumented critical paths to track P95/P99 latency and error rates." },
      { name: "Nginx", context: "Reverse proxy", impact: "Configured TLS termination, rate limiting, and L7 load balancing." },
      { name: "AWS", context: "Cloud deployment", impact: "Deployed highly-available architectures utilizing EC2 and basic VPC networking." }
    ]
  }
];

export const SYSTEMS_EXPERIENCE: SystemExperience[] = [
  {
    name: "High-Throughput Order Matching Engine",
    href: "/systems/distribution-layer",
    environment: "Simulated/Benchmarked Locally (32-core AMD)",
    problem: "Real-time order matching requires deterministic execution and minimal latency. Standard concurrent queues introduced unacceptable lock contention.",
    constraints: "Required sub-millisecond P99 latency while processing 10k transactions per second (TPS). Cannot pause for garbage collection.",
    architectureDecisions: "Built entirely in C++20. Chose a single-threaded execution loop for the core matching engine, offloading I/O and risk checks to a custom lock-free work-stealing thread pool.",
    tradeOffs: "Sacrificed horizontal scalability of the core matching engine for ultra-low vertical latency. Sharding by trading pair was required to scale beyond single-core limits.",
    failureHandling: "Implemented a journaling system to append-only disk before acking to the client, allowing full state reconstruction on crash without distributed consensus overhead.",
    debugging: "Used perf and flamegraphs to identify cache-line bouncing (false sharing) between worker threads. Padded critical atomic structs to align with 64-byte cache lines.",
    outcome: "Achieved sustained 10k TPS with P99 latency of 0.8ms in local benchmarks.",
    businessImpact: "Enabled highly competitive, sub-millisecond market execution capable of handling extreme trading volume spikes without degradation."
  },
  {
    name: "Distributed Task Scheduler",
    href: "/systems/scheduler",
    environment: "Deployed to limited AWS EC2 Cluster",
    problem: "Background jobs were being dropped or duplicated during worker node deployments or unpredictable traffic spikes.",
    constraints: "Must guarantee at-least-once delivery for 500k+ jobs/day. Needed to support job retries with exponential backoff without overloading the DB.",
    architectureDecisions: "Re-architected the pipeline using Python and a Redis-backed queue for fast ingestion, with a PostgreSQL persistent store for job metadata and audit logs.",
    tradeOffs: "Chose at-least-once delivery over exactly-once, forcing all downstream job consumers to implement strict idempotency. This increased consumer complexity but vastly simplified the scheduler's scaling.",
    failureHandling: "Integrated a circuit breaker pattern on outgoing webhook calls. If an external API degraded, the scheduler applied backpressure and temporarily halted dispatching specific job types.",
    debugging: "Diagnosed a recurring Redis OOM issue by identifying unbounded retry loops. Enforced a hard limit on max retries and moved dead jobs to a persistent Dead Letter Queue (DLQ).",
    outcome: "Eliminated dropped tasks and stabilized worker node CPU utilization during deployments.",
    businessImpact: "Ensured strict SLA compliance by preventing the loss of critical background jobs during severe infrastructure and downstream API outages."
  },
  {
    name: "Agentic AI Orchestration Platform",
    href: "/systems/ai-orchestration",
    environment: "Cloud Deployment (Internal Tooling)",
    problem: "LLM agent workflows frequently failed mid-execution due to external API timeouts or model hallucinations, forcing users to restart complex tasks.",
    constraints: "LLM API latency is highly unpredictable (2s to 30s). Workflows involved up to 10 sequential tool calls.",
    architectureDecisions: "Adopted LangGraph to model the multi-agent workflow as a persistent state machine. Used the Model Context Protocol (MCP) to sandbox tool execution.",
    tradeOffs: "Increased the complexity of the Python backend by introducing a graph-based state machine, sacrificing the simplicity of linear scripts for robustness.",
    failureHandling: "Implemented granular state checkpointing. If an LLM hallucinated a malformed JSON response, the system caught the parse error, injected a correction prompt, and retried only that specific node.",
    debugging: "Traced workflow stalls to long-running synchronous tool calls blocking the async event loop. Refactored tool execution into separate worker threads.",
    outcome: "Enabled resumption of failed AI tasks, reducing API token waste by 40% and drastically improving UX reliability.",
    businessImpact: "Reduced expensive third-party LLM API costs by 40% and prevented workflow abandonment by seamlessly recovering from mid-task hallucinations."
  },
  {
    name: "Custom STL-Compatible Vector",
    href: "/projects/custom-vector",
    environment: "Core Library Component (Local)",
    problem: "Needed a deeper understanding of C++ memory semantics, allocator models, and exception safety beyond just using std::vector.",
    constraints: "Must provide zero-overhead abstractions, support custom allocators, and strictly adhere to the Rule of 5 and strong exception guarantees.",
    architectureDecisions: "Implemented dynamic array growth using geometric expansion. Utilized placement new and explicit destructor calls to manage object lifetimes manually, bypassing default initialization overhead.",
    tradeOffs: "Manual memory management increases code verbosity and risk of leaks, but is essential for bypassing standard library overhead in critical paths.",
    failureHandling: "Implemented strong exception safety for operations like `push_back`. If a reallocation throws during element copying/moving, the vector state is rolled back completely to prevent memory corruption.",
    debugging: "Used Valgrind and AddressSanitizer extensively to catch memory leaks caused by incorrect move semantics during reallocation.",
    outcome: "Built a fully functional, STL-compliant vector that matched std::vector performance in benchmarks, proving deep systems-level competence.",
    businessImpact: "Provided a zero-overhead core library component that allows applications to bypass standard memory allocation bottlenecks in latency-critical paths."
  }
];

export const ENGINEERING_DECISIONS: EngineeringDecision[] = [
  {
    title: "Idempotency over Exactly-Once Delivery",
    context: "In the Distributed Task Scheduler, guaranteeing exactly-once delivery across network boundaries required complex distributed transactions (2PC).",
    decision: "Mandated that all task consumers must be idempotent (e.g., using UPSERTs or tracking processed message IDs). The scheduler only guaranteed at-least-once delivery.",
    consequence: "Shifted complexity to the downstream consumers, but allowed the scheduler itself to scale linearly and handle network partitions without deadlocking."
  },
  {
    title: "Eventual Consistency for Performance",
    context: "User session and caching layers required high throughput, but the primary MySQL database was becoming a bottleneck for read-heavy operations.",
    decision: "Implemented a Redis cache-aside pattern. Accepted that reads might be stale by up to 5 seconds during heavy mutation loads.",
    consequence: "Drastically reduced load on the primary DB, preventing connection pool exhaustion. Required careful UI design to mask eventual consistency from end-users."
  }
];

export const FAILURES_LESSONS: FailureLesson[] = [
  {
    title: "The Thundering Herd Cache Stampede",
    whatBroke: "When a popular, computationally expensive query result expired in Redis, hundreds of concurrent requests hit the database simultaneously to recalculate it, causing connection timeouts.",
    impact: "Cascading failure bringing down the reporting service for 15 minutes.",
    fix: "Implemented jittered TTLs (adding random +/- 10% to expiration times) and a caching mutex (only letting one request recalculate while others wait for the new cache value)."
  },
  {
    title: "Unbounded Retries and Resource Exhaustion",
    whatBroke: "A third-party webhook endpoint went down permanently. Our scheduler kept retrying the failed jobs indefinitely with high frequency.",
    impact: "Exhausted connection pools and filled the Redis memory limit, stalling healthy jobs.",
    fix: "Enforced strict exponential backoff, a hard cap on retry attempts (max 5), and implemented a Dead Letter Queue (DLQ) for manual inspection of permanently failed jobs."
  }
];
