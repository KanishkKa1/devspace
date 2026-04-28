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
                label: "home",
                path: "/",
                tab: true,
            },
            {
                label: "skills.md",
                path: "/skills",
                tab: true,
            },
            {
                label: "experience.md",
                path: "/experience",
                tab: true,
            },
            {
                label: "contact.md",
                path: "/contact",
                tab: true,
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
                label: "distribution_layer.cpp",
                path: "/systems/distribution-layer",
                tab: true,
            },
            {
                label: "orchestrator.py",
                path: "/systems/ai-orchestration",
                tab: true,
            }
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
        label: "algorithms",
        children: [
            {
                label: "system_patterns.cpp",
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
                label: "websockets_scaling.md",
                path: "/blog/websockets-case-study",
                tab: true,
            },
            {
                label: "async_workflow.md",
                path: "/blog/async-workflow-case-study",
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
