"use client";

import { Toaster } from "sonner";
import { TopBar } from "@/components/TopBar";
import { EmptyState } from "@/components/EmptyState";
import { PageList } from "@/components/PageList";
import { DropZone } from "@/components/DropZone";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { useClipboard } from "@/hooks/useClipboard";
import { usePagesStore } from "@/store/usePagesStore";

export default function Home() {
  useClipboard();
  const pages = usePagesStore((s) => s.pages);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-950">
      <TopBar />
      <DropZone>
        {pages.length === 0 ? <EmptyState /> : <PageList />}
      </DropZone>
      <LoadingOverlay />
      <Toaster richColors position="bottom-center" />
    </div>
  );
}
