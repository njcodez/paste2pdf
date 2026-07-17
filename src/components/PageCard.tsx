"use client";

import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import type { Page } from "@/types/page";
import { usePagesStore } from "@/store/usePagesStore";

interface Props {
  page: Page;
  index: number;
  onPreview: (page: Page) => void;
}

export function PageCard({ page, index, onPreview }: Props) {
  const removePage = usePagesStore((s) => s.removePage);
  const isDragging = usePagesStore((s) => s.isDragging);
  const { attributes, listeners, setNodeRef, transform, isDragging: isDraggingThis } =
    useSortable({ id: page.id });

  function handleClick() {
    if (isDragging) return;
    onPreview(page);
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={{
        x: transform?.x ?? 0,
        y: transform?.y ?? 0,
        touchAction: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
        zIndex: isDraggingThis ? 50 : "auto",
      }}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isDraggingThis ? 0.85 : 1, scale: isDraggingThis ? 1.05 : 1 }}
      exit={{ opacity: 0, scale: 0.7, rotate: -12, y: 30 }}
      whileHover={{ y: -3, boxShadow: "0 10px 24px -8px rgba(0,0,0,0.18)" }}
      whileTap={{ scale: 0.97 }}
      transition={isDraggingThis ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
      className="group relative flex w-36 cursor-grab select-none flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-2 shadow-sm active:cursor-grabbing dark:border-neutral-800 dark:bg-neutral-900"
    >
      <motion.button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          removePage(page.id);
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-1.5 top-1.5 z-10 rounded-md bg-white/90 p-1 text-neutral-400 shadow-sm transition-colors hover:bg-red-50 hover:text-red-500 dark:bg-neutral-800/90 dark:hover:bg-red-950"
      >
        <Trash2 size={14} />
      </motion.button>

      <div className="pointer-events-none relative h-40 w-full select-none">
        <Image
          src={page.thumbnail}
          alt={`Page ${index + 1}`}
          fill
          draggable={false}
          unoptimized
          className="select-none rounded-lg object-contain"
        />
      </div>

      <span className="pointer-events-none select-none text-xs font-medium text-neutral-500">
        Page {index + 1}
      </span>
    </motion.div>
  );
}
