"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import type { Page } from "@/types/page";

interface Props {
  page: Page | null;
  onClose: () => void;
}

export function PreviewModal({ page, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!page) {
      setObjectUrl(null);
      return;
    }
    const url = URL.createObjectURL(page.file);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [page]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {page && objectUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] max-w-[90vw] rounded-2xl bg-white p-3 shadow-2xl dark:bg-neutral-900"
          >
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute -right-3 -top-3 rounded-full bg-white p-1.5 text-neutral-600 shadow-md dark:bg-neutral-800 dark:text-neutral-200"
            >
              <X size={18} />
            </motion.button>

            <Image
              src={objectUrl}
              alt="Page preview"
              width={page.width}
              height={page.height}
              unoptimized
              className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
              style={{ height: "auto", maxHeight: "80vh" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
