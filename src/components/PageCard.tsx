"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import type { Page } from "@/types/page";
import { usePagesStore } from "@/store/usePagesStore";

export function PageCard({ page, index }: { page: Page; index: number }) {
  const removePage = usePagesStore((s) => s.removePage);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: page.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={{ ...style, touchAction: "none" }}
      {...attributes}
      {...listeners}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isDragging ? 0.5 : 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7, rotate: -12, y: 30 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex w-36 cursor-grab flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-2 shadow-sm active:cursor-grabbing dark:border-neutral-800 dark:bg-neutral-900"
    >
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          removePage(page.id);
        }}
        className="absolute right-1.5 top-1.5 z-10 rounded-md bg-white/90 p-1 text-neutral-400 shadow-sm transition hover:bg-red-50 hover:text-red-500 dark:bg-neutral-800/90 dark:hover:bg-red-950"
      >
        <Trash2 size={14} />
      </button>

      <img
        src={page.thumbnail}
        alt={`Page ${index + 1}`}
        draggable={false}
        className="h-40 w-full rounded-lg object-contain"
      />

      <span className="text-xs font-medium text-neutral-500">
        Page {index + 1}
      </span>
    </motion.div>
  );
}
