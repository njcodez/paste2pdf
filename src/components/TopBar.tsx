"use client";

import { ImagePlus, FileDown } from "lucide-react";
import { useRef } from "react";
import { useImageLoader } from "@/hooks/useImageLoader";
import { usePdfGenerator } from "@/hooks/usePdfGenerator";

export function TopBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { loadFiles } = useImageLoader();
  const { generate, isGenerating, canGenerate } = usePdfGenerator();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200/70 bg-white/80 px-5 py-3 backdrop-blur-md dark:border-neutral-800/70 dark:bg-neutral-950/80">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600" />
        <span className="text-sm font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
          Snap2PDF
        </span>
      </div>

      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) void loadFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <button
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-3.5 py-1.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          <ImagePlus size={16} />
          Add Images
        </button>

        <button
          onClick={generate}
          disabled={!canGenerate || isGenerating}
          className="flex items-center gap-1.5 rounded-full bg-neutral-900 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          <FileDown size={16} />
          {isGenerating ? "Generating…" : "Generate PDF"}
        </button>
      </div>
    </header>
  );
}
