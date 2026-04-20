import { ReactNode } from "react";

export type RouteNode = {
    label: string;
    path?: string;
    tab?: boolean;
    children?: RouteNode[];
    icon?: ReactNode;
    order?: number;
    hidden?: boolean;
};

export const routes: RouteNode[] = [
    {
        label: "devspace",
        children: [
            {
                label: "Home",
                path: "/",
                tab: true,
            },
            {
                label: "experience.md",
                path: "/experience",
                tab: false,
            },
            {
                label: "contact.md",
                path: "/contact",
                tab: false,
            }
        ]
    },
    {
        label: "systems",
        children: [
            {
                label: "scheduler.cpp",
                path: "/systems/scheduler",
                tab: true,
            },
            {
                label: "mcp.cpp",
                path: "/systems/mcp",
                tab: true,
            },
            {
                label: "langgraph.cpp",
                path: "/systems/langgraph",
                tab: true,
            },
        ],
    },
    {
        label: "projects",
        children: [
            {
                label: "vector<T>.cpp",
                path: "/projects/custom-vector",
                tab: true,
            }
        ]
    },
    {
        label: "leetcode",
        children: [
            {
                label: "patterns.ts",
                path: "/leetcode",
                tab: true,
            }
        ]
    },
    {
        label: "blogs",
        children: [
            {
                label: "thinking.md",
                path: "/blog",
                tab: true,
            },
            {
                label: "latency_optimization.md",
                path: "/blog/latency-optimization",
                tab: true,
            },
            {
                label: "workflow_optimization.md",
                path: "/blog/workflow-optimization",
                tab: true,
            }
        ]
    }
];
