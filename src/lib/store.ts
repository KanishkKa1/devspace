import { create } from "zustand";

export interface TabType {
  id: string;
  label: string;
}

interface LayoutStore {
  tabs: TabType[];
  addTab: (tab: TabType) => void;
  removeTab: (id: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useStore = create<LayoutStore>((set) => ({
  tabs: [],
  addTab: (tab) =>
    set((state) => {
      // Don't add duplicate tabs
      if (state.tabs.find((t) => t.id === tab.id)) return state;
      return { tabs: [...state.tabs, tab] };
    }),
  removeTab: (id) =>
    set((state) => ({
      tabs: state.tabs.filter((t) => t.id !== id),
    })),
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
