"use client";

import { Trash } from "lucide-react";
import { toast } from "sonner";
import { usePagesStore } from "@/store/usePagesStore";

export function ClearAllButton() {
  const pages = usePagesStore((s) => s.pages);
  const clearPages = usePagesStore((s) => s.clearPages);

  if (pages.length === 0) return null;

  function handleClear() {
    clearPages();
    toast("All pages cleared.");
  }

  return (
    <div className="flex justify-center pt-4">
      <button
        onClick={handleClear}
        className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-3.5 py-1.5 text-xs font-medium text-neutral-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-neutral-800 dark:hover:bg-red-950"
      >
        <Trash size={13} />
        Clear all
      </button>
    </div>
  );
}
