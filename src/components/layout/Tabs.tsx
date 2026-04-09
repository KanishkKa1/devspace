"use client";

import { useStore } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { routes, RouteNode } from "@/lib/constants/routes";
import { X, FileCode } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function flattenRoutes(nodes: RouteNode[]): RouteNode[] {
  let result: RouteNode[] = [];
  for (const node of nodes) {
    if (node.path) result.push(node);
    if (node.children) result = result.concat(flattenRoutes(node.children));
  }
  return result;
}

export function Tabs() {
  const pathname = usePathname();
  const router = useRouter();
  const { tabs, addTab, removeTab } = useStore();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allRoutes = flattenRoutes(routes);
    const activeRoute = allRoutes.find((r) => r.path === pathname && r.tab !== false);

    if (activeRoute && activeRoute.path) {
      addTab({
        id: activeRoute.path,
        label: activeRoute.label,
      });
    }
  }, [pathname, addTab]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeItem = container.querySelector('[data-active="true"]');
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'center' });
      }
    }
  }, [pathname, tabs]);

  const handleClose = (e: React.MouseEvent, tabId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (pathname === tabId && tabs.length > 1) {
      const idx = tabs.findIndex(t => t.id === tabId);
      const nextTab = idx > 0 ? tabs[idx - 1] : tabs[idx + 1];
      router.push(nextTab.id);
    } else if (pathname === tabId && tabs.length === 1) {
      router.push("/");
    }

    removeTab(tabId);
  };

  if (tabs.length === 0) return null;

  return (
    <div
      ref={scrollContainerRef}
      className="flex h-10 w-full overflow-x-auto bg-[#ECECEC] scrollbar-hide dark:bg-[#252526] custom-scrollbar"
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.id;
        return (
          <Link
            key={tab.id}
            href={tab.id}
            data-active={isActive}
            className={cn(
              "group relative flex min-w-[140px] max-w-[200px] shrink-0 items-center justify-between border-r border-[#ECECEC] px-3 py-2 text-sm select-none dark:border-[#1e1e1e]",
              isActive
                ? "bg-white text-blue-600 dark:bg-[#1e1e1e] dark:text-[#ce9178]"
                : "bg-[#ECECEC] text-slate-500 hover:bg-slate-200 dark:bg-[#2d2d2d] dark:text-[#969696] dark:hover:bg-[#2b2d2e]"
            )}
          >
            <div className="flex items-center gap-2 truncate pr-2">
              <FileCode className="h-4 w-4 shrink-0" />
              <span className="truncate">{tab.label}</span>
            </div>
            <button
              onClick={(e) => handleClose(e, tab.id)}
              className={cn(
                "rounded-sm p-0.5 opacity-0 hover:bg-slate-300 group-hover:opacity-100 dark:hover:bg-[#444444]",
                isActive && "opacity-100"
              )}
            >
              <X className="h-3 w-3" />
            </button>
            {isActive && (
              <div className="absolute top-0 left-0 h-[2px] w-full bg-blue-500 dark:bg-[#5ce4ce]" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
