"use client";

import { FileDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePdfGenerator } from "@/hooks/usePdfGenerator";
import { GenerateModal } from "./GenerateModal";

export function TopBar() {
  const { generate, isGenerating, canGenerate } = usePdfGenerator();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="sticky top-3 z-20 mx-3 flex items-center justify-between rounded-2xl border border-neutral-200/70 bg-white/85 px-5 py-3 shadow-md backdrop-blur-md dark:border-neutral-800/70 dark:bg-neutral-950/85"
    >
      <div className="flex items-center gap-2">
        <motion.span
          whileHover={{ rotate: -6, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="font-serif text-2xl italic text-neutral-800 dark:text-neutral-100"
        >
          P
        </motion.span>
        <span className="text-sm font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
          Paste2PDF
        </span>
      </div>

      <motion.button
        onClick={() => setModalOpen(true)}
        disabled={!canGenerate || isGenerating}
        whileHover={canGenerate && !isGenerating ? { scale: 1.04 } : {}}
        whileTap={canGenerate && !isGenerating ? { scale: 0.96 } : {}}
        className="flex items-center gap-1.5 rounded-full bg-neutral-900 px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        <FileDown size={16} />
        {isGenerating ? "Generating…" : "Generate PDF"}
      </motion.button>

      <GenerateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={(opts) => {
          setModalOpen(false);
          void generate(opts);
        }}
      />
    </motion.div>
  );
}
