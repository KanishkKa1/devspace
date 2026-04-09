"use client";

import { useStore } from "@/lib/store";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export function Topbar() {
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  const pathname = usePathname();

  return (
    <div className="flex h-10 w-full items-center justify-between bg-white px-4 dark:bg-[#333333] border-b border-transparent dark:border-[#1e1e1e]">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-md p-1 hover:bg-slate-100 md:hidden dark:hover:bg-[#4a4a4a]"
        >
          <Menu className="h-5 w-5 fill-current text-slate-800 dark:text-gray-200" />
        </button>
        <span className="hidden md:flex text-xs font-semibold text-slate-500 dark:text-[#cccccc] select-none items-center gap-2">
          kanishk-workspace <span className="opacity-50">—</span> {pathname === "/" ? "Home" : pathname.split("/").pop()}
        </span>
      </div>

      <div className="flex items-center justify-center flex-1 md:hidden">
        <span className="text-xs font-semibold truncate text-slate-500 dark:text-[#cccccc] select-none">
          {pathname.split("/").pop() || "Home"}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-[#888888]">
        {/* We can put layout toggle or just empty space here */}
        <span>⌘ P</span>
      </div>
    </div>
  );
}
