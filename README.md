🚀 Developer Portfolio

A modern, scalable portfolio built with Next.js App Router, focused on clean architecture, performance, and extensibility.

📌 Description

This project is a structured developer portfolio designed to demonstrate:

Strong frontend architecture
Scalable routing patterns
Clean component design
Performance-first thinking

It is built as a system, not just a UI project.

🏗️ Project Structure
src/
├── app/
│   ├── layout.tsx        # Global layout (Navbar, Footer, metadata)
│   ├── page.tsx          # Home page
│   ├── blog/
│   │   ├── page.tsx      # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx  # Dynamic blog post
│   └── contact/
│       └── page.tsx      # Contact page
⚙️ Tech Stack
Framework: Next.js (App Router)
Language: TypeScript
Styling: Tailwind CSS
Routing: File-based (App Directory)
🧠 Features
App Router Architecture
Nested layouts
Scalable routing structure
Dynamic Blog System
Route-based content via [slug]
Designed for static generation (SSG)
Reusable Layout
Centralized layout system
Shared UI components
Clean Code Structure
Separation of concerns
Maintainable and extensible design