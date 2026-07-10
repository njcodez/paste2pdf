"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { extractImageFromClipboard } from "@/lib/clipboard";
import { fileToPage } from "@/lib/image";
import { usePagesStore } from "@/store/usePagesStore";

export function useClipboard() {
  const addPage = usePagesStore((s) => s.addPage);

  useEffect(() => {
    function handlePaste(event: ClipboardEvent) {
      const file = extractImageFromClipboard(event);
      if (!file) {
        toast.error("No image found in clipboard.");
        return;
      }
      fileToPage(file)
        .then(addPage)
        .catch(() => toast.error("Could not read clipboard image."));
    }

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [addPage]);
}
