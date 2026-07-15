"use client";

import { useState, type DragEvent, type MouseEvent } from "react";
import { useImageLoader } from "@/hooks/useImageLoader";

interface Props {
  children: React.ReactNode;
  onAdd: () => void;
}

export function DropZone({ children, onAdd }: Props) {
  const [isOver, setIsOver] = useState(false);
  const { loadFiles } = useImageLoader();

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsOver(false);
    if (e.dataTransfer.files.length > 0) void loadFiles(e.dataTransfer.files);
  }

  function handleBackgroundClick(e: MouseEvent<HTMLDivElement>) {
    // Only trigger when the click lands on the empty background itself,
    // not on a page card, button, or other child element.
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
      className={`min-h-[60vh] flex-1 transition-colors ${
        isOver ? "bg-indigo-50/60 dark:bg-indigo-950/20" : ""
      }`}
    >
      {children}
    </div>
  );
}
