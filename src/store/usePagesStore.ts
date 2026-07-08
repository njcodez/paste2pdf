import { create } from "zustand";
import type { Page } from "@/types/page";

interface PagesState {
  pages: Page[];
  isGenerating: boolean;
  addPage: (page: Page) => void;
  removePage: (id: string) => void;
  reorderPages: (fromIndex: number, toIndex: number) => void;
  clearPages: () => void;
  setGenerating: (value: boolean) => void;
}

export const usePagesStore = create<PagesState>((set) => ({
  pages: [],
  isGenerating: false,
  addPage: (page) =>
    set((state) => ({ pages: [...state.pages, page] })),
  removePage: (id) =>
    set((state) => ({ pages: state.pages.filter((p) => p.id !== id) })),
  reorderPages: (fromIndex, toIndex) =>
    set((state) => {
      const updated = [...state.pages];
      const [moved] = updated.splice(fromIndex, 1);
      if (moved) updated.splice(toIndex, 0, moved);
      return { pages: updated };
    }),
  clearPages: () => set({ pages: [] }),
  setGenerating: (value) => set({ isGenerating: value }),
}));
