import { CodeBlock } from "@/components/ui/CodeBlock";

export default function SchedulerPage() {
  const codeString = `#include <iostream>
#include <vector>
#include <thread>
#include <queue>
#include <mutex>
#include <condition_variable>
#include <functional>

class TaskScheduler {
private:
    std::vector<std::thread> workers;
    std::queue<std::function<void()>> tasks;
    std::mutex queue_mutex;
    std::condition_variable condition;
    bool stop;

public:
    TaskScheduler(size_t threads) : stop(false) {
        for(size_t i = 0; i < threads; ++i) {
            workers.emplace_back([this] {
                while(true) {
                    std::function<void()> task;
                    {
                        std::unique_lock<std::mutex> lock(this->queue_mutex);
                        this->condition.wait(lock, [this] { 
                            return this->stop || !this->tasks.empty(); 
                        });
                        if(this->stop && this->tasks.empty())
                            return;
                        task = std::move(this->tasks.front());
                        this->tasks.pop();
                    }
                    task();
                }
            });
        }
    }

    template<class F>
    void enqueue(F&& f) {
        {
            std::unique_lock<std::mutex> lock(queue_mutex);
            tasks.emplace(std::forward<F>(f));
        }
        condition.notify_one();
    }

    ~TaskScheduler() {
        {
            std::unique_lock<std::mutex> lock(queue_mutex);
            stop = true;
        }
        condition.notify_all();
        for(std::thread &worker: workers)
            worker.join();
    }
};

int main() {
    TaskScheduler scheduler(4);
    
    // Simulate scheduling tasks
    for(int i = 0; i < 8; ++i) {
        scheduler.enqueue([i] {
            std::cout << "Executing task " << i << " on thread " << std::this_thread::get_id() << "\\n";
        });
    }
    
    return 0;
}`;

  const outputString = `Executing task 0 on thread 140304313501440
Executing task 2 on thread 140304296716032
Executing task 1 on thread 140304305108736
Executing task 3 on thread 140304288323328
Executing task 5 on thread 140304313501440
Executing task 6 on thread 140304296716032
Executing task 4 on thread 140304305108736
Executing task 7 on thread 140304288323328`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 pb-20">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
        C++ Concurrent Task Scheduler
      </h1>
      <p className="text-slate-600 dark:text-[#cccccc] mb-10 leading-relaxed text-lg">
        A highly-concurrent, thread-pool based task scheduling system implemented in Modern C++ (C++11/14), designed to minimize context switching overhead and effectively distribute workloads across multi-core architectures.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">The Problem</h2>
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-[#cccccc]">
          <p>
            Spawning new threads for short-lived tasks is heavily CPU bound and introduces significant overhead from the OS context switching. In high-throughput backend services (like a distributed job runner or database engine), naive thread spawning can quickly exhaust system resources and lead to thrashing.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Architecture</h2>
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-[#cccccc]">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Worker Pool:</strong> A pre-initialized <code className="bg-slate-100 dark:bg-[#33] px-1.5 py-0.5 rounded text-sm text-pink-600 dark:text-pink-400 font-mono">std::vector&lt;std::thread&gt;</code> that continuously polls the task queue.</li>
            <li><strong>Task Queue:</strong> A thread-safe FIFO queue storing heterogeneous callable objects wrapped in <code className="bg-slate-100 dark:bg-[#33] px-1.5 py-0.5 rounded text-sm text-pink-600 dark:text-pink-400 font-mono">std::function&lt;void()&gt;</code>.</li>
            <li><strong>Synchronization:</strong> Condition variables to cleanly wake up sleeping worker threads and a mutex to guard the critical enqueuing/dequeuing paths to prevent data races.</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Execution Flow</h2>
        <div className="pl-4 border-l-2 border-slate-300 dark:border-slate-700 space-y-6">
          <div>
            <h3 className="font-medium text-slate-800 dark:text-slate-300">1. Initialization</h3>
            <p className="text-sm text-slate-600 dark:text-[#cccccc] mt-1">
              Scheduler spins up <code className="bg-slate-100 dark:bg-[#333] px-1 py-0.5 rounded">N</code> threads on boot. They immediately acquire the mutex, check the queue (which is empty), and go to sleep atomically utilizing <code className="bg-slate-100 dark:bg-[#333] px-1 py-0.5 rounded">condition.wait()</code>.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-slate-800 dark:text-slate-300">2. Enqueuing</h3>
            <p className="text-sm text-slate-600 dark:text-[#cccccc] mt-1">
              Main thread locks the mutex, pushes a lambda to the queue, unlocks, and calls <code className="bg-slate-100 dark:bg-[#333] px-1 py-0.5 rounded">notify_one()</code>.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-slate-800 dark:text-slate-300">3. Processing & Tear-down</h3>
            <p className="text-sm text-slate-600 dark:text-[#cccccc] mt-1">
              A single sleeping thread wakes up, extracts the task, and executes it outside the lock scope (maximizing concurrency). On destruction, the <code className="bg-slate-100 dark:bg-[#333] px-1 py-0.5 rounded">stop</code> flag is flipped, and all threads receive <code className="bg-slate-100 dark:bg-[#333] px-1 py-0.5 rounded">notify_all()</code> to exit gracefully.
            </p>
          </div>
        </div>
      </section>

      <CodeBlock 
        code={codeString}
        language="cpp"
        output={outputString}
      />

      <section className="mb-12 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500 text-xs font-bold">!</span>
            Trade-offs & Constraints
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-[#cccccc]">
            <li><strong>Lock Contention:</strong> A single global mutex guards the entire queue, becoming a bottleneck if enqueue/dequeue rates exceed ~1M ops/sec.</li>
            <li><strong>Memory Layout:</strong> <code className="bg-slate-100 dark:bg-[#333] px-1 py-0.5 rounded font-mono text-pink-600 dark:text-pink-400">std::function</code> allocations might heap-allocate depending on the capture size, causing hidden performance hits.</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500 text-xs font-bold">✓</span>
            Future Improvements
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-[#cccccc]">
            <li>Implement work-stealing queues per-thread to eliminate global lock contention.</li>
            <li>Use a lock-free cyclic buffer (MPSC queue) for the central dispatcher.</li>
            <li>Allow returning <code className="bg-slate-100 dark:bg-[#333] px-1 py-0.5 rounded font-mono text-pink-600 dark:text-pink-400">std::future</code> for asynchronous result mapping.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
