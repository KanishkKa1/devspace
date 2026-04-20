"use client";

import { CodeBlock } from "@/components/ui/CodeBlock";
import { ArrowRight, Activity, Zap, Cpu, ShieldCheck, Box } from "lucide-react";

export default function CustomVectorPage() {
  const codeString = `#include <iostream>
#include <memory>
#include <algorithm>
#include <utility>

template <typename T>
class Vector {
private:
    T* data = nullptr;
    size_t sz = 0;
    size_t cap = 0;

    void reallocate(size_t new_cap) {
        T* new_data = static_cast<T*>(::operator new(new_cap * sizeof(T)));
        
        for (size_t i = 0; i < sz; ++i) {
            new(&new_data[i]) T(std::move_if_noexcept(data[i]));
        }

        for (size_t i = 0; i < sz; ++i) {
            data[i].~T();
        }
        
        ::operator delete(data);
        data = new_data;
        cap = new_cap;
    }

public:
    Vector() = default;
    
    void push_back(const T& value) {
        if (sz >= cap) {
            reallocate(cap == 0 ? 1 : cap * 2);
        }
        new(&data[sz]) T(value);
        sz++;
    }

    void push_back(T&& value) {
        if (sz >= cap) {
            reallocate(cap == 0 ? 1 : cap * 2);
        }
        new(&data[sz]) T(std::move(value));
        sz++;
    }

    ~Vector() {
        for (size_t i = 0; i < sz; ++i) {
            data[i].~T();
        }
        ::operator delete(data);
    }
    
    size_t size() const { return sz; }
    size_t capacity() const { return cap; }
    T& operator[](size_t index) { return data[index]; }
};`;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 pb-20 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          vector&lt;T&gt;.cpp — Custom Implementation
        </h1>
      </div>

      <p className="text-slate-600 dark:text-[#cccccc] mb-8 leading-relaxed text-lg">
        A from-scratch implementation of <code className="bg-slate-100 dark:bg-[#333] px-1 py-0.5 rounded text-pink-500">std::vector</code> focusing on <strong>Manual Memory Management</strong>, <strong>RAII principles</strong>, and <strong>Strong Exception Guarantees</strong>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
          <Zap className="h-6 w-6 text-amber-500 mb-4" />
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Geometric Growth</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">Uses a 2x growth factor to achieve amortized O(1) push_back performance, minimizing reallocation frequency.</p>
        </div>
        <div className="p-6 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
          <ShieldCheck className="h-6 w-6 text-emerald-500 mb-4" />
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Move Semantics</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">Optimized for efficient transfer of resources via Move semantics, significantly reducing expensive deep copies.</p>
        </div>
        <div className="p-6 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
          <Cpu className="h-6 w-6 text-blue-500 mb-4" />
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Custom Allocator</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">Utilizes <code className="bg-slate-100 dark:bg-[#333] px-1 py-0.5 rounded text-[10px]">::operator new</code> to separate memory allocation from object construction.</p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">The Implementation</h2>
        <div className="mb-8 shadow-xl rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
          <div className="bg-slate-100 dark:bg-[#1e1e1e] px-4 py-3 border-b border-slate-200 dark:border-[#333333] flex items-center gap-2">
            <Box className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">vector.hpp</span>
          </div>
          <div className="[&>div]:!rounded-none [&>div]:!border-none [&>div]:!m-0">
            <CodeBlock 
              code={codeString}
              language="cpp"
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Performance Considerations</h2>
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-[#cccccc]">
          <p>
            One of the critical sections of a vector is the <strong>Reallocation Logic</strong>. When the capacity is reached, we must allocate a new chunk of memory and move the existing elements. 
            By using <code className="bg-slate-100 dark:bg-[#333] px-1 py-0.5 rounded">std::move_if_noexcept</code>, I ensure that if the move constructor might throw, we fallback to a copy to maintain the <strong>Strong Exception Guarantee</strong> (the original vector remains unchanged if reallocation fails).
          </p>
        </div>
      </section>
    </div>
  );
}
