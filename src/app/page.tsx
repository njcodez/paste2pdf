"use client";

import { useEffect, useRef } from "react";
import { Toaster } from "sonner";
import { TopBar } from "@/components/TopBar";
import { EmptyState } from "@/components/EmptyState";
import { PageList } from "@/components/PageList";
import { DropZone } from "@/components/DropZone";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { ClearAllButton } from "@/components/ClearAllButton";
import { useClipboard } from "@/hooks/useClipboard";
import { useImageLoader } from "@/hooks/useImageLoader";
import { usePagesStore } from "@/store/usePagesStore";

export default function Home() {
  useClipboard();
  const pages = usePagesStore((s) => s.pages);
  const hydrate = usePagesStore((s) => s.hydrate);
  const { loadFiles } = useImageLoader();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  function openPicker() {
    inputRef.current?.click();
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-neutral-50 dark:bg-neutral-950">
      <TopBar />

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        multiple
        hidden
        onChange={(e) => {
          if (e.target.files) void loadFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {pages.length > 0 && <ClearAllButton />}

      <DropZone onAdd={openPicker}>
        {pages.length === 0 ? <EmptyState onAdd={openPicker} /> : <PageList />}
      </DropZone>

      <LoadingOverlay />
      <Toaster richColors position="bottom-center" />
    </div>
  );
}
