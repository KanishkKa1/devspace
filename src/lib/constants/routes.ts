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
                label: "profile.md",
                path: "/",
                tab: false,
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
            },
            {
                label: "projects",
                children: [
                    {
                        label: "index.ts",
                        path: "/projects",
                        tab: true,
                    }
                ]
            },
            {
                label: "leetcode",
                children: [
                    {
                        label: "hub.ts",
                        path: "/leetcode",
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
                label: "blogs",
                children: [
                    {
                        label: "posts.md",
                        path: "/blog",
                        tab: true,
                    }
                ]
            }
        ]
    }
];
