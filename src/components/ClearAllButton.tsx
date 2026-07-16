"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { usePagesStore } from "@/store/usePagesStore";

export function ClearAllButton() {
  const pages = usePagesStore((s) => s.pages);
  const clearPages = usePagesStore((s) => s.clearPages);

  function handleClear() {
    clearPages();
    toast("All pages cleared.");
  }

  return (
    <AnimatePresence>
      {pages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="flex justify-center pb-3 pt-5"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleClear}
            className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-3.5 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-neutral-800 dark:hover:bg-red-950"
          >
            <Trash size={13} />
            Clear all
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
