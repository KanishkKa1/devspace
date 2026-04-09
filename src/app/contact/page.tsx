export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 pb-20">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Contact</h1>
      <p className="text-slate-600 dark:text-[#cccccc] mb-10 leading-relaxed text-lg">
        Feel free to reach out to me below. You can also find me on <a href="https://github.com/kanishk" className="text-blue-600 hover:underline">GitHub</a> and <a href="https://linkedin.com/in/kanishk" className="text-blue-600 hover:underline">LinkedIn</a>.
      </p>

      <div className="mt-10">
        <section>
          <h2 className="text-xl font-semibold mb-6 text-slate-800 dark:text-slate-200 flex items-center gap-2">
            Send a Message
          </h2>
          <form action="https://formspree.io/f/YOUR_FORM_ENDPOINT_HERE" method="POST" className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full rounded-md border border-slate-300 dark:border-[#333333] bg-white dark:bg-[#1e1e1e] px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
                placeholder="Your Name"
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
                required
                rows={5}
                className="w-full rounded-md border border-slate-300 dark:border-[#333333] bg-white dark:bg-[#1e1e1e] px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none shadow-sm"
                placeholder="What would you like to discuss?"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-md bg-blue-600 dark:bg-[#3794ff] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 dark:hover:bg-[#2081f2] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#1e1e1e] transition-colors shadow-sm"
            >
              Send Message
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}
