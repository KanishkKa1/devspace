"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5 0-1.4-.5-2.5-1.5-3.4.1-.3.6-1.6-.1-3.3 0 0-1.2-.4-3.9 1.4a12.3 12.3 0 0 0-7 0C4.3 1.4 3 1.8 3 1.8c-.7 1.7-.2 3-.1 3.3-1 1-1.5 2-1.5 3.4 0 5 3 6.2 6 6.5-.4.4-.7 1.1-.8 2.2-.7.3-2.5.9-3.6-1-1-.5-1.8-.7-1.8-.7-.9-.1-.2.2-.2.2.8.5 1.4 1.7 1.4 1.7.9 1.8 2.5 1.5 3.2 1.2v3.3" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (status === 'success') {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center animate-fade-in-up">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Message Sent!</h2>
        <p className="text-slate-600 dark:text-[#cccccc] mb-8 max-w-md mx-auto italic">
          "The fastest communication is clarity."
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 pb-20 animate-fade-in-up">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Contact</h1>
      <p className="text-slate-600 dark:text-[#cccccc] mb-10 leading-relaxed text-lg">
        I'm always open to discussing system architecture, low-latency performance, or interesting creative projects. Feel free to reach out via the form below or through my socials.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Info */}
        <div className="md:col-span-1 space-y-6 text-sm">
          <div className="flex flex-col gap-4">
            <a 
              href="mailto:agarwalkanisk12345@gmail.com" 
              className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>Email Me</span>
            </a>
            <a 
              href="https://github.com/KanishkKa1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/kanishkaga/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <LinkedinIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-slate-300 dark:border-[#333333] bg-white dark:bg-[#1e1e1e] px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
                placeholder="How should I address you?"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-slate-300 dark:border-[#333333] bg-white dark:bg-[#1e1e1e] px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-md border border-slate-300 dark:border-[#333333] bg-white dark:bg-[#1e1e1e] px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none shadow-sm"
                placeholder="What's on your mind? Systems, Graphics, or just a hello?"
              />
            </div>

            {status === 'error' && (
              <p className="text-rose-500 text-sm italic">Something went wrong. Please try again or email me directly.</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="group flex items-center justify-center gap-2 w-full rounded-md bg-blue-600 dark:bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Send className={`h-4 w-4 transform transition-transform ${status === 'submitting' ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
              <span>{status === 'submitting' ? "Sending..." : "Send Message"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
