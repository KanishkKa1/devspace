"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Tabs } from "./Tabs";
import { StatusBar } from "./StatusBar";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-full w-full bg-white dark:bg-[#1e1e1e] overflow-hidden">
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-300 ease-in-out"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Drawer on Mobile, Fixed on Desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 transform border-r bg-[#f3f3f3] transition-all duration-300 ease-in-out md:relative dark:border-[#333333] dark:bg-neutral-900 flex-shrink-0",
          sidebarOpen ? "w-64 translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16"
        )}
      >
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 transition-all duration-300 ease-in-out">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
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
