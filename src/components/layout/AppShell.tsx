"use client";

import { useStore } from "@/lib/store";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Tabs } from "./Tabs";
import { StatusBar } from "./StatusBar";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const sidebarOpen = useStore((state) => state.sidebarOpen);
  const setSidebarOpen = useStore((state) => state.setSidebarOpen);

  return (
    <div className="flex h-full w-full bg-white dark:bg-[#1e1e1e]">
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Drawer on Mobile, Fixed on Desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-[#f3f3f3] transition-transform duration-200 ease-in-out md:relative md:translate-x-0 dark:border-[#333333] dark:bg-[#252526]",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Topbar />
        <Tabs />
        
        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-auto bg-white dark:bg-[#1e1e1e]">
          {children}
        </main>

        <StatusBar />
      </div>
    </div>
  );
}
