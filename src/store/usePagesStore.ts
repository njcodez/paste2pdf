import { create } from "zustand";
import { get as idbGet, set as idbSet } from "idb-keyval";
import type { Page } from "@/types/page";
import { createThumbnail } from "@/lib/canvas";

const STORAGE_KEY = "snap2pdf-pages";

interface StoredPage {
  id: string;
  blob: Blob;
  width: number;
  height: number;
  thumbnail: string;
}

interface PagesState {
  pages: Page[];
  isGenerating: boolean;
  hydrated: boolean;
  addPage: (page: Page) => void;
  removePage: (id: string) => void;
  reorderPages: (fromIndex: number, toIndex: number) => void;
  clearPages: () => void;
  setGenerating: (value: boolean) => void;
  hydrate: () => Promise<void>;
}

async function persist(pages: Page[]) {
  const stored: StoredPage[] = pages.map((p) => ({
    id: p.id,
    blob: p.file,
    width: p.width,
    height: p.height,
    thumbnail: p.thumbnail,
  }));
  await idbSet(STORAGE_KEY, stored);
}

export const usePagesStore = create<PagesState>((set, getState) => ({
  pages: [],
  isGenerating: false,
  hydrated: false,

  addPage: (page) => {
    const pages = [...getState().pages, page];
    set({ pages });
    void persist(pages);
  },

  removePage: (id) => {
    const pages = getState().pages.filter((p) => p.id !== id);
    set({ pages });
    void persist(pages);
  },

  reorderPages: (fromIndex, toIndex) => {
    const updated = [...getState().pages];
    const [moved] = updated.splice(fromIndex, 1);
    if (moved) updated.splice(toIndex, 0, moved);
    set({ pages: updated });
    void persist(updated);
  },

  clearPages: () => {
    set({ pages: [] });
    void persist([]);
  },

  setGenerating: (value) => set({ isGenerating: value }),

  hydrate: async () => {
    const stored = (await idbGet(STORAGE_KEY)) as StoredPage[] | undefined;
    if (!stored || stored.length === 0) {
      set({ hydrated: true });
      return;
    }

    const pages: Page[] = [];
    for (const item of stored) {
      const file = new File([item.blob], `${item.id}.jpg`, { type: item.blob.type });
      const bitmap = await createImageBitmap(file);
      pages.push({
        id: item.id,
        file,
        imageBitmap: bitmap,
        width: item.width,
        height: item.height,
        thumbnail: item.thumbnail,
      });
    }
    set({ pages, hydrated: true });
  },
}));

