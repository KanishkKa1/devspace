import { CodeBlock } from "@/components/ui/CodeBlock";
import { ArrowRight, Activity, Zap, Cpu, ShieldCheck, Box } from "lucide-react";

export default function CustomVectorPage() {
  const codeString = `#include <iostream>
#include <memory>
#include <algorithm>
#include <utility>
#include <stdexcept>

template <typename T, typename Allocator = std::allocator<T>>
class Vector {
private:
    T* data_ = nullptr;
    size_t sz_ = 0;
    size_t cap_ = 0;
    Allocator alloc_;

    using AllocTraits = std::allocator_traits<Allocator>;

    void reallocate(size_t new_cap) {
        T* new_data = AllocTraits::allocate(alloc_, new_cap);
        size_t constructed = 0;
        
        try {
            // Strong Exception Guarantee: Move if noexcept, else copy.
            for (size_t i = 0; i < sz_; ++i) {
                AllocTraits::construct(alloc_, &new_data[i], std::move_if_noexcept(data_[i]));
                constructed++;
            }
        } catch (...) {
            // Rollback on construction failure
            for(size_t i = 0; i < constructed; ++i) {
                AllocTraits::destroy(alloc_, &new_data[i]);
            }
            AllocTraits::deallocate(alloc_, new_data, new_cap);
            throw;
        }

        // Destroy old data
        for (size_t i = 0; i < sz_; ++i) {
            AllocTraits::destroy(alloc_, &data_[i]);
        }
        
        if (data_) {
            AllocTraits::deallocate(alloc_, data_, cap_);
        }
        
        data_ = new_data;
        cap_ = new_cap;
    }

public:
    // Iterator Interface Support
    using iterator = T*;
    using const_iterator = const T*;
    
    iterator begin() { return data_; }
    iterator end() { return data_ + sz_; }
    const_iterator cbegin() const { return data_; }
    const_iterator cend() const { return data_ + sz_; }

    // --- Rule of 5 ---
    Vector() noexcept = default;
    
    // 1. Destructor
    ~Vector() {
        for (size_t i = 0; i < sz_; ++i) {
            AllocTraits::destroy(alloc_, &data_[i]);
        }
        if (data_) AllocTraits::deallocate(alloc_, data_, cap_);
    }

    // 2. Copy Constructor
    Vector(const Vector& other) : sz_(other.sz_), cap_(other.sz_) {
        data_ = AllocTraits::allocate(alloc_, cap_);
        for(size_t i = 0; i < sz_; ++i) {
            AllocTraits::construct(alloc_, &data_[i], other.data_[i]);
        }
    }

    // 3. Move Constructor
    Vector(Vector&& other) noexcept : data_(other.data_), sz_(other.sz_), cap_(other.cap_) {
        other.data_ = nullptr;
        other.sz_ = 0;
        other.cap_ = 0;
    }

    // 4. Copy Assignment
    Vector& operator=(const Vector& other) {
        if (this != &other) {
            Vector temp(other); // Copy-and-swap idiom
            std::swap(data_, temp.data_);
            std::swap(sz_, temp.sz_);
            std::swap(cap_, temp.cap_);
        }
        return *this;
    }

    // 5. Move Assignment
    Vector& operator=(Vector&& other) noexcept {
        if (this != &other) {
            for (size_t i = 0; i < sz_; ++i) AllocTraits::destroy(alloc_, &data_[i]);
            if (data_) AllocTraits::deallocate(alloc_, data_, cap_);
            
            data_ = std::exchange(other.data_, nullptr);
            sz_ = std::exchange(other.sz_, 0);
            cap_ = std::exchange(other.cap_, 0);
        }
        return *this;
    }

    void push_back(const T& value) {
        if (sz_ == cap_) {
            reallocate(cap_ == 0 ? 1 : cap_ * 2);
        }
        AllocTraits::construct(alloc_, &data_[sz_], value);
        sz_++;
    }

    void push_back(T&& value) {
        if (sz_ == cap_) {
            reallocate(cap_ == 0 ? 1 : cap_ * 2);
        }
        AllocTraits::construct(alloc_, &data_[sz_], std::move(value));
        sz_++;
    }
};`;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          C++ Custom Vector (System-Level Design)
        </h1>
      </div>

      <p className="text-slate-600 dark:text-[#cccccc] mb-8 leading-relaxed text-lg">
        A production-grade implementation of <code className="bg-slate-100 dark:bg-[#333] px-1 py-0.5 rounded text-pink-500">std::vector</code> focusing on <strong>Allocator Type Traits</strong>, the <strong>Rule of 5</strong>, and <strong>Strong Exception Guarantees</strong>. Designed to handle OS-level memory constraints and complex resource ownership.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">The Problem</h2>
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-[#cccccc]">
          <p>
            Standard dynamic arrays often fail to separate allocation from construction, leading to severe performance penalties when dealing with non-trivial objects. Furthermore, naive reallocations can corrupt system state if an exception is thrown mid-copy.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

        <div className="p-6 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-neutral-800">
          <Zap className="h-6 w-6 text-amber-500 mb-4" />
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Allocator Paradigm</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Uses <code className="bg-slate-100 dark:bg-[#333] px-1 rounded">std::allocator_traits</code> to meticulously decouple raw memory allocation from object initialization, preventing default-constructor overhead.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-neutral-800">
          <ShieldCheck className="h-6 w-6 text-emerald-500 mb-4" />
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Exception Safety</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            During reallocation, if an object throws, the buffer strictly rolls back. Implements <code className="bg-slate-100 dark:bg-[#333] px-1 rounded">std::move_if_noexcept</code> to fall back to copy-semantics for risky types.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-neutral-800">
          <Cpu className="h-6 w-6 text-blue-500 mb-4" />
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">The Rule of 5</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Strictly enforces Destructor, Copy/Move Constructors, and Copy/Move Assignments via the idiomatic <em>copy-and-swap</em> technique to ensure leak-free operations.
          </p>
        </div>

        {/* C++ Iterators */}
        <div className="p-6 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-neutral-800">
          <Activity className="h-6 w-6 text-purple-500 mb-4" />
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Iterator Compatibility</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Provides `begin()`, `end()`, `cbegin()`, and `cend()` pointers satisfying requirements for range-based for-loops and standard library `&lt;algorithm&gt;` headers.
          </p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">The Implementation</h2>
        <div className="mb-8 shadow-xl rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
          <div className="bg-slate-100 dark:bg-[#1e1e1e] px-4 py-3 border-b border-slate-200 dark:border-[#333333] flex items-center gap-2">
            <Box className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">vector_impl.hpp</span>
          </div>
          <div className="[&>div]:!rounded-none [&>div]:!border-none [&>div]:!m-0">
            <CodeBlock
              code={codeString}
              language="cpp"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
