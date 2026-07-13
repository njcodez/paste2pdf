"use client";

import { useState, type DragEvent } from "react";
import { useImageLoader } from "@/hooks/useImageLoader";

export function DropZone({ children }: { children: React.ReactNode }) {
  const [isOver, setIsOver] = useState(false);
  const { loadFiles } = useImageLoader();

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsOver(false);
    if (e.dataTransfer.files.length > 0) void loadFiles(e.dataTransfer.files);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      className={`min-h-[60vh] flex-1 transition-colors ${
        isOver ? "bg-indigo-50/60 dark:bg-indigo-950/20" : ""
      }`}
    >
      {children}
    </div>
  );
}
