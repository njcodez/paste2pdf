"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Thumbnail } from "./Thumbnail";
import type { Page } from "@/types/page";
import { usePagesStore } from "@/store/usePagesStore";

export function PageCard({ page, index }: { page: Page; index: number }) {
  const removePage = usePagesStore((s) => s.removePage);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: page.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-neutral-400 active:cursor-grabbing"
      >
        <GripVertical size={18} />
      </button>

      <Thumbnail src={page.thumbnail} alt={`Page ${index + 1}`} />

      <span className="text-sm font-medium text-neutral-500">
        Page {index + 1}
      </span>

      <button
        onClick={() => removePage(page.id)}
        className="ml-auto rounded-full p-2 text-neutral-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
