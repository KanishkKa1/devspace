"use client";

import { routes, RouteNode } from "@/lib/constants/routes";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FileCode, Menu, Cpu, BookOpen, User, Box, Trophy, Settings, Terminal, FileText, FileJson, Layout } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function SidebarItem({ node, indent = 0, isSidebarOpen }: { node: RouteNode; indent?: number; isSidebarOpen: boolean }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = !!node.children && node.children.length > 0;
  const isActive = pathname === node.path;

  const getFolderIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l === "systems") return <Cpu className="h-4 w-4 shrink-0 text-blue-500 fill-blue-500/10 group-hover:scale-110 transition-transform duration-200" />;
    if (l === "blogs" || l === "blog") return <BookOpen className="h-4 w-4 shrink-0 text-emerald-500 fill-emerald-500/10 group-hover:scale-110 transition-transform duration-200" />;
    if (l === "devspace") return <User className="h-4 w-4 shrink-0 text-indigo-500 fill-indigo-500/10 group-hover:scale-110 transition-transform duration-200" />;
    if (l === "projects") return <Box className="h-4 w-4 shrink-0 text-amber-500 fill-amber-500/10 group-hover:scale-110 transition-transform duration-200" />;
    if (l === "leetcode") return <Trophy className="h-4 w-4 shrink-0 text-orange-500 fill-orange-500/10 group-hover:scale-110 transition-transform duration-200" />;
    return <Folder className="h-4 w-4 shrink-0 text-slate-400 group-hover:scale-110 transition-transform duration-200" />;
  };

  const getFileIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.endsWith(".cpp")) return <FileCode className="h-4 w-4 shrink-0 text-blue-500 group-hover:scale-110 transition-transform duration-200" />;
    if (l.endsWith(".ts") || l.endsWith(".tsx")) return <FileJson className="h-4 w-4 shrink-0 text-yellow-500 group-hover:scale-110 transition-transform duration-200" />;
    if (l.endsWith(".md")) return <FileText className="h-4 w-4 shrink-0 text-slate-400 group-hover:scale-110 transition-transform duration-200" />;
    if (l === "home") return <Layout className="h-4 w-4 shrink-0 text-indigo-400 group-hover:scale-110 transition-transform duration-200" />;
    return <FileCode className="h-4 w-4 shrink-0 text-slate-400 group-hover:scale-110 transition-transform duration-200" />;
  };

  if (isFolder) {
    return (
      <div className="flex flex-col w-full">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isSidebarOpen) return;
            setIsOpen((prev) => !prev);
          }}
          title={!isSidebarOpen ? node.label : undefined}
          className={cn(
            "flex flex-1 items-center gap-1.5 py-1 px-2 text-sm text-slate-700 hover:bg-neutral-200 dark:text-[#cccccc] dark:hover:bg-neutral-800 select-none transition-colors duration-200 group whitespace-nowrap",
            !isSidebarOpen && "border-l-2 border-transparent hover:border-blue-500/50"
          )}
          style={{ 
            paddingLeft: isSidebarOpen ? `${indent * 12 + 8}px` : '0px', 
            justifyContent: isSidebarOpen ? 'flex-start' : 'center',
          }}
        >
          {isSidebarOpen && (isOpen ? <ChevronDown className="h-3.5 w-3.5 shrink-0" /> : <ChevronRight className="h-3.5 w-3.5 shrink-0" />)}
          {getFolderIcon(node.label)}
          {isSidebarOpen && <span className="truncate">{node.label}</span>}
        </button>
        {isOpen && isSidebarOpen && (
          <div className="flex flex-col">
            {node.children!.map((child) => (
              <SidebarItem key={child.label} node={child} indent={indent + 1} isSidebarOpen={isSidebarOpen} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={node.path || "/"}
      className={cn(
        "flex flex-1 items-center gap-1.5 py-1 px-2 text-sm select-none transition-colors duration-200 group relative whitespace-nowrap border-l-2",
        isActive
          ? "bg-neutral-200 text-blue-700 dark:bg-neutral-700 dark:text-white font-medium border-blue-500"
          : "text-slate-700 hover:bg-neutral-200 dark:text-[#cccccc] dark:hover:bg-neutral-800 border-transparent"
      )}
      style={{ 
        paddingLeft: isSidebarOpen ? `${indent * 12 + 8}px` : '0px', 
        justifyContent: isSidebarOpen ? 'flex-start' : 'center',
      }}
    >
      {isSidebarOpen && <span className="w-3.5 shrink-0" />} {/* Spacer aligning with chevron */}
      {getFileIcon(node.label)}
      {isSidebarOpen && <span className="truncate">{node.label}</span>}
    </Link>
  );
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <div className="flex h-full flex-col w-full relative">
      <div className={cn(
        "flex items-center py-3 text-xs font-semibold tracking-wider text-slate-500 dark:text-[#969696] border-b border-transparent dark:border-neutral-800 transition-all duration-300",
        isOpen ? "justify-between px-4" : "justify-center px-0 flex-col gap-2"
      )}>
        {isOpen && <span className="uppercase truncate w-full flex-1">Kanishk's Devspace</span>}
        <button 
           onClick={() => setIsOpen(!isOpen)} 
           className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md transition-colors text-slate-600 dark:text-[#cccccc]"
        >
           <Menu className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden pt-2 pb-4 flex flex-col items-center sidebar-scroll">
        <div className="flex flex-col w-full">
          {routes.map((route) => (
            <SidebarItem key={route.label} node={route} isSidebarOpen={isOpen} />
          ))}
        </div>
      </div>
    </div>
  );
}
