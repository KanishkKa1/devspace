"use client";

import { usePathname } from "next/navigation";
import { Bell, Moon, Sun, CheckCircle, FileCode } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function StatusBar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Initial theme check based on system preference if no class is present,
    // otherwise fallback to the class. We'll implement a clean system-matching here.
    const root = window.document.documentElement;
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // We force the class based on system pref on mount if desired
    if (isSystemDark && !root.classList.contains("dark")) {
      root.classList.add("dark");
      setIsDark(true);
    } else if (!isSystemDark && root.classList.contains("dark")) {
      root.classList.remove("dark");
      setIsDark(false);
    } else {
      setIsDark(root.classList.contains("dark"));
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <div className="relative flex h-6 w-full items-center justify-between bg-[#007acc] px-3 text-[11px] text-white dark:bg-[#007acc]">
      {/* Left section */}
      <div className="flex h-full items-center gap-4">
        <div className="flex h-full items-center gap-1.5 hover:bg-white/10 px-1.5 cursor-pointer">
          <FileCode className="h-3.5 w-3.5" />
          <span>{pathname === "/" ? "kanishk-workspace" : pathname}</span>
        </div>
        <div className="flex h-full items-center gap-1.5 hover:bg-white/10 px-1.5 cursor-pointer">
          <CheckCircle className="h-3 w-3" />
          <span>Prettier</span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex h-full items-center gap-2">
        <button
          onClick={toggleTheme}
          className="flex h-full items-center gap-1 hover:bg-white/10 px-1.5"
          title="Toggle Theme"
        >
          {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
        </button>
        <button 
          className="flex h-full items-center hover:bg-white/10 px-1.5"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Notification popover mock */}
      {showNotifications && (
        <div className="absolute bottom-6 right-2 w-64 rounded bg-white shadow-xl border border-slate-200 dark:bg-[#252526] dark:border-[#454545] p-2 text-slate-800 dark:text-[#cccccc] z-50">
          <div className="font-semibold text-xs border-b border-slate-100 dark:border-[#333] pb-2 mb-2">Notifications</div>
          <div className="text-[11px] text-slate-500 dark:text-[#999999] py-2 text-center">
            No new notifications
          </div>
        </div>
      )}
    </div>
  );
}
