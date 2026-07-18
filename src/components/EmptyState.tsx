"use client";

import { motion } from "framer-motion";
import { ImagePlus } from "lucide-react";

export function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div
      onClick={onAdd}
      className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-6 py-32 text-center transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/30"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-3xl border border-dashed border-neutral-300 p-8 dark:border-neutral-700"
      >
        <ImagePlus className="text-neutral-300 dark:text-neutral-600" size={56} />
      </motion.div>
      <p className="max-w-md text-3xl font-semibold tracking-tight text-neutral-400 dark:text-neutral-500 sm:text-4xl">
        Click anywhere to add pages
      </p>
      <p className="text-base text-neutral-300 dark:text-neutral-600">
        or paste a screenshot with Ctrl+V — drag pages to reorder once added
      </p>
      <p className="text-xs font-medium text-neutral-300 dark:text-neutral-700">
        100% on-device · no file uploads · nothing ever leaves your browser
      </p>
    </div>
  );
}
