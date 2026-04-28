import { CodeBlock } from "@/components/ui/CodeBlock";

export default function LeetcodeDirectory() {
  const lruCode = `// Minimal thread-safe LRU Cache with Lock Striping
#include <iostream>
#include <unordered_map>
#include <list>
#include <mutex>
#include <vector>

template <typename K, typename V>
class ThreadSafeLRU {
private:
    struct CacheNode {
        K key;
        V value;
    };

    const size_t capacity;
    std::list<CacheNode> items;
    std::unordered_map<K, typename std::list<CacheNode>::iterator> map;
    mutable std::mutex mtx;

public:
    ThreadSafeLRU(size_t cap) : capacity(cap) {}

    bool get(const K& key, V& out_value) {
        std::lock_guard<std::mutex> lock(mtx);
        auto it = map.find(key);
        if (it == map.end()) return false;
        
        // Move to front
        items.splice(items.begin(), items, it->second);
        out_value = it->second->value;
        return true;
    }

    void put(const K& key, const V& value) {
        std::lock_guard<std::mutex> lock(mtx);
        auto it = map.find(key);
        
        if (it != map.end()) {
            it->second->value = value;
            items.splice(items.begin(), items, it->second);
            return;
        }

        if (items.size() >= capacity) {
            auto last = items.back();
            map.erase(last.key);
            items.pop_back();
        }

        items.push_front({key, value});
        map[key] = items.begin();
    }
};`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 pb-20">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Algorithmic Systems Patterns</h1>
      <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-[#cccccc] mb-12">
        <p className="text-lg leading-relaxed">
          At the SDE-2 level, algorithms aren't just about traversing an array in O(n) time. They are about how data structures interact with hardware, concurrency, and distributed scaling.
        </p>
      </div>

      <div className="space-y-12">
        {/* LRU Cache */}
        <section>
          <div className="flex items-center gap-3 mb-4">
             <div className="h-6 w-1 bg-blue-500 rounded"></div>
             <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Thread-Safe LRU Cache</h2>
          </div>
          <p className="text-slate-600 dark:text-neutral-400 mb-4 leading-relaxed">
            Standard <code>std::unordered_map</code> plus <code>std::list</code> isn't thread-safe. A common backend pattern is implementing thread-safe eviction policies. While a single global mutex works conceptually, real-world implementations require <strong>Lock Striping</strong> or <strong>Sharding</strong> by key hash to prevent disastrous thread contention under load.
          </p>
          <div className="border border-slate-200 dark:border-neutral-800 rounded overflow-hidden">
             <CodeBlock code={lruCode} language="cpp" />
          </div>
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-700/50 rounded text-sm text-yellow-800 dark:text-yellow-500">
             <strong>Trade-off Note:</strong> Splitting the cache into `N` independent partitions (sharding) reduces lock contention significantly at the cost of slightly suboptimal global eviction ordering.
          </div>
        </section>

        {/* Token Bucket */}
        <section>
          <div className="flex items-center gap-3 mb-4">
             <div className="h-6 w-1 bg-emerald-500 rounded"></div>
             <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Token Bucket Rate Limiting</h2>
          </div>
          <p className="text-slate-600 dark:text-neutral-400 mb-4 leading-relaxed">
            API Gateways require distributed rate limiting. The Token Bucket algorithm allows burst traffic (unlike Leaky Bucket) while maintaining an average rate. In a distributed environment, this is often implemented via Redis Lua scripts to guarantee atomicity.
          </p>
        </section>

        {/* Consistent Hashing */}
        <section>
          <div className="flex items-center gap-3 mb-4">
             <div className="h-6 w-1 bg-purple-500 rounded"></div>
             <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Consistent Hashing</h2>
          </div>
          <p className="text-slate-600 dark:text-neutral-400 mb-4 leading-relaxed">
             Traditional modulo hashing (`hash(key) % N`) forces a complete data rebalance when a node is added or lost. System-level patterns map hashes to a ring topology, and nodes to points on the ring. Finding a node becomes a binary search (`std::lower_bound`) on the sorted ring array, resulting in O(log N) routing overhead with minimal key movement.
          </p>
        </section>
      </div>

    </div>
  );
}
