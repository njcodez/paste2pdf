"use client";

import { usePagesStore } from "@/store/usePagesStore";

export function LoadingOverlay() {
  const isGenerating = usePagesStore((s) => s.isGenerating);
  if (!isGenerating) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm dark:bg-neutral-950/70">
      <div className="flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-5 py-3 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800 dark:border-neutral-700 dark:border-t-white" />
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Generating PDF…
        </span>
      </div>
    </div>
  );
}
