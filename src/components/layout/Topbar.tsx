"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

interface TopbarProps {
  toggleSidebar: () => void;
}

export function Topbar({ toggleSidebar }: TopbarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-10 w-full flex-shrink-0 items-center justify-between bg-white px-4 dark:bg-[#333333] border-b border-transparent dark:border-[#1e1e1e] transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-md p-1 hover:bg-slate-100 md:hidden dark:hover:bg-[#4a4a4a] transition-all duration-200"
        >
          <Menu className="h-5 w-5 fill-current text-slate-800 dark:text-gray-200" />
        </button>
        <div className="hidden md:flex items-center gap-4 text-[13px] text-slate-600 dark:text-[#cccccc] select-none ml-2">
          <span className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">File</span>
          <span className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">Edit</span>
          <span className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">Selection</span>
          <span className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">View</span>
          <span className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">Go</span>
          <span className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">Run</span>
        </div>
      </div>

      <div className="flex items-center justify-center flex-1 md:hidden">
        <span className="text-xs font-semibold truncate text-slate-500 dark:text-[#cccccc] select-none">
          {pathname.split("/").pop() || "Home"}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-[#888888]">
        <span>⌘ P</span>
      </div>
    </div>
  );
}
