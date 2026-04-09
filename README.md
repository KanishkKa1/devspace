# 🚀 DevSpace - System Design Driven Developer's Portfolio

---

## 📌 Problem Statement

Most fail at scale due to:

- Tight coupling between UI and logic
- No modular separation (everything in pages/components)
- Poor extensibility for features (projects, blogs, systems)
- Lack of state architecture for complex UI/UX.

This project solves that by implementing:

- **Feature-based architecture**
- **Centralized layout system**
- **Reusable UI primitives**
- **Isolated state management**

---

## 🧠 Design Goals

- **Modularity** → Feature isolation (`features/*`)
- **Scalability** → Add domains (projects, systems, blog) independently
- **Maintainability** → Clear separation of concerns
- **Performance** → Static-first rendering
- **System Design Thinking** → UI behaves like an application, not a page

---

## 🏗️ Architecture Overview

```bash
src/
├── app/                     
│   ├── layout.tsx            
│   ├── page.tsx              
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── leetcode/page.tsx
│   ├── contact/page.tsx
│   └── systems/              
│       ├── langgraph/page.tsx
│       ├── mcp/page.tsx
│       └── scheduler/page.tsx
│
├── components/               
│   ├── layout/               
│   │   ├── AppShell.tsx      
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   └── Tabs.tsx          
│   │
│   ├── shared/               
│   └── ui/                   
│
├── features/                 
│   ├── projects/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types.ts
│   │
│   └── tabs/
│       ├── context/            
│       │   ├── TabsProvider.tsx
│       │   └── useTabs.ts
│       ├── types.ts
│       └── utils.ts
│
└── lib/
    └── constants/
        └── routes.ts         
```

---

## ⚙️ Core Architectural Decisions

### 1. Feature-Based Architecture

Instead of grouping by type (components, hooks), the project uses:

- `features/projects`
- `features/tabs`

Each feature owns:
- Components
- Hooks
- Types

➡️ Improves **scalability and ownership boundaries**

---

### 2. Layout System (AppShell)

- `AppShell` acts as the **composition root**
- Injects:
  - Sidebar
  - Topbar
  - Tabs system

➡️ UI behaves like a **multi-view application**, not static pages

---

### 3. Tabs System (Stateful UI Layer)

- Centralized via `TabsProvider`
- Custom hook: `useTabs`
- Enables:
  - Multi-tab navigation
  - Persistent UI state

➡️ Demonstrates **real-world state management design**

---

### 4. Separation of Concerns

--------------------------------------------------
| Layer        | Responsibility                  |
|--------------|---------------------------------|
| `app/`       | Routing & page composition      |
| `features/`  | Business logic & domain modules |
| `components/`| Reusable UI                     |
| `lib/`       | Constants & utilities           |
--------------------------------------------------

---

### 5. Static-First Rendering Strategy

- Pages are designed to be **statically generated (SSG)**
- Reduces runtime cost
- Improves performance & SEO

---

## 🔄 Data Flow Strategy

### Current
- Static / placeholder data

### Planned
- MDX-based blog system
- Project metadata system
- Optional API layer

---

## ⚙️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript  
- **Styling:** Tailwind CSS  
- **Deployment Target:** Vercel (planned)

---

## 📈 Performance Considerations

- Static generation minimizes server load
- Reduced client-side JavaScript
- Optimized routing via App Router

---

## 📈 What Makes This Different

- Implements **feature-driven architecture**
- Includes a **custom tab system (like an IDE)**
- Demonstrates **state management patterns**
- Designed as a **scalable frontend system**

---

## 🔥 Engineering Philosophy

> UI is temporary. Architecture scales.  
> This project is built to reflect **long-term engineering thinking**, not short-term visuals.
