"use client";

import { routes, RouteNode } from "@/lib/constants/routes";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FileCode } from "lucide-react";

function SidebarItem({ node, indent = 0 }: { node: RouteNode; indent?: number }) {
  const pathname = usePathname();
  const setSidebarOpen = useStore((state) => state.setSidebarOpen);
  const [isOpen, setIsOpen] = useState(true);

  const isFolder = !!node.children;
  const isActive = node.path === pathname;

  if (isFolder) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 py-1 px-2 text-sm text-slate-700 hover:bg-slate-200 dark:text-[#cccccc] dark:hover:bg-[#2a2d2e] select-none"
          style={{ paddingLeft: `${indent * 12 + 8}px` }}
        >
          {isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          <Folder className="h-4 w-4 shrink-0 text-blue-500 fill-blue-500/20 dark:text-[#5ce4ce] dark:fill-[#5ce4ce]/20" />
          <span className="truncate">{node.label}</span>
        </button>
        {isOpen && (
          <div className="flex flex-col">
            {node.children!.map((child) => (
              <SidebarItem key={child.label} node={child} indent={indent + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={node.path || "/"}
      onClick={() => setSidebarOpen(false)}
      className={cn(
        "flex items-center gap-1.5 py-1 px-2 text-sm select-none",
        isActive 
          ? "bg-blue-100 text-blue-700 dark:bg-[#37373d] dark:text-white" 
          : "text-slate-700 hover:bg-slate-200 dark:text-[#cccccc] dark:hover:bg-[#2a2d2e]"
      )}
      style={{ paddingLeft: `${indent * 12 + 8}px` }}
    >
      <span className="w-3.5 shrink-0" /> {/* Spacer aligning with chevron */}
      {/* Assuming mostly code files for IDE feel, though could make it dynamic based on label extension */}
      <FileCode className="h-4 w-4 shrink-0 text-yellow-500" />
      <span className="truncate">{node.label}</span>
    </Link>
  );
}

export function Sidebar() {
  return (
    <div className="flex h-full flex-col bg-[#f3f3f3] dark:bg-[#252526]">
      <div className="flex items-center justify-between px-4 py-3 text-xs font-semibold tracking-wider text-slate-500 dark:text-[#969696]">
        <span className="uppercase">Kanishk' Lobby</span>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden pt-1 pb-4">
        <div className="flex flex-col">
          {routes.map((route) => (
            <SidebarItem key={route.label} node={route} />
          ))}
        </div>
      </div>
    </div>
  );
}
