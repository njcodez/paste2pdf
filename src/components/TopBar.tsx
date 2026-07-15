"use client";

import { FileDown } from "lucide-react";
import { useState } from "react";
import { usePdfGenerator } from "@/hooks/usePdfGenerator";
import { GenerateModal } from "./GenerateModal";

export function TopBar() {
  const { generate, isGenerating, canGenerate } = usePdfGenerator();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="sticky top-3 z-20 mx-3 flex items-center justify-between rounded-2xl border border-neutral-200/70 bg-white/85 px-5 py-3 shadow-md backdrop-blur-md dark:border-neutral-800/70 dark:bg-neutral-950/85">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600" />
        <span className="text-sm font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
          Snap2PDF
        </span>
      </div>

      <button
        onClick={() => setModalOpen(true)}
        disabled={!canGenerate || isGenerating}
        className="flex items-center gap-1.5 rounded-full bg-neutral-900 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        <FileDown size={16} />
        {isGenerating ? "Generating…" : "Generate PDF"}
      </button>

      <GenerateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={(opts) => {
          setModalOpen(false);
          void generate(opts);
        }}
      />
    </div>
  );
}
