"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { PageSizeKey, FitMode } from "@/utils/constants";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (opts: { pageSize: PageSizeKey; fitMode: FitMode; filename: string }) => void;
}

export function GenerateModal({ open, onClose, onConfirm }: Props) {
  const [pageSize, setPageSize] = useState<PageSizeKey>("A4");
  const [fitMode, setFitMode] = useState<FitMode>("fit");
  const [filename, setFilename] = useState("document");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-8 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 8 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl dark:bg-neutral-900"
          >
            <h2 className="mb-4 text-sm font-semibold text-neutral-800 dark:text-neutral-100">
              Generate PDF
            </h2>

            <label className="mb-1 block text-xs font-medium text-neutral-500">Layout</label>
            <div className="mb-4 flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-200">
                <input type="radio" checked={fitMode === "fit"} onChange={() => setFitMode("fit")} />
                Fit inside page (white margins)
              </label>
              <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-200">
                <input
                  type="radio"
                  checked={fitMode === "matchImage"}
                  onChange={() => setFitMode("matchImage")}
                />
                Match page size to image (no border)
              </label>
            </div>

            <AnimatePresence>
              {fitMode === "fit" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-4 overflow-hidden"
                >
                  <label className="mb-1 block text-xs font-medium text-neutral-500">Page size</label>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value as PageSizeKey)}
                    className="w-full rounded-lg border border-neutral-200 px-3 py-1.5 text-sm transition focus:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    <option value="A3">A3</option>
                    <option value="A4">A4</option>
                    <option value="A5">A5</option>
                    <option value="Letter">Letter</option>
                    <option value="Legal">Legal</option>
                    <option value="Tabloid">Tabloid</option>
                    <option value="Executive">Executive</option>
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mb-5">
              <label className="mb-1 block text-xs font-medium text-neutral-500">Filename</label>
              <input
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 px-3 py-1.5 text-sm transition focus:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>

            <div className="flex justify-end gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="rounded-full border border-neutral-200 px-3.5 py-1.5 text-sm dark:border-neutral-700"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  onConfirm({ pageSize, fitMode, filename: filename.trim() || "document" })
                }
                className="rounded-full bg-neutral-900 px-3.5 py-1.5 text-sm text-white dark:bg-white dark:text-neutral-900"
              >
                Generate
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
