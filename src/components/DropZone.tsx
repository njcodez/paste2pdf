"use client";

import { useState, type DragEvent, type MouseEvent } from "react";
import { useImageLoader } from "@/hooks/useImageLoader";
import { usePagesStore } from "@/store/usePagesStore";

interface Props {
  children: React.ReactNode;
  onAdd: () => void;
}

export function DropZone({ children, onAdd }: Props) {
  const [isOver, setIsOver] = useState(false);
  const { loadFiles } = useImageLoader();
  const hasPages = usePagesStore((s) => s.pages.length > 0);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsOver(false);
    if (e.dataTransfer.files.length > 0) void loadFiles(e.dataTransfer.files);
  }

  function handleBackgroundClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onAdd();
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      onClick={handleBackgroundClick}
      className={`relative min-h-[60vh] flex-1 transition-colors ${
        isOver ? "bg-indigo-50/60 dark:bg-indigo-950/20" : ""
      }`}
    >
      {hasPages && (
        <p className="pointer-events-none absolute inset-x-0 top-2 select-none text-center text-xs text-neutral-300 dark:text-neutral-700">
          Click anywhere to add more · Drag pages to reorder
        </p>
      )}
      {children}
    </div>
  );
}
