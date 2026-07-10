"use client";

import { toast } from "sonner";
import { isSupportedImage, filesFromFileList } from "@/lib/file";
import { fileToPage } from "@/lib/image";
import { usePagesStore } from "@/store/usePagesStore";

export function useImageLoader() {
  const addPage = usePagesStore((s) => s.addPage);

  async function loadFiles(fileList: FileList) {
    const files = filesFromFileList(fileList);
    if (files.length === 0) {
      toast.error("This file type isn't supported.");
      return;
    }

    for (const file of files) {
      if (!isSupportedImage(file)) continue;
      try {
        const page = await fileToPage(file);
        addPage(page);
      } catch {
        toast.error("Could not load one of the images.");
      }
    }
  }

  return { loadFiles };
}
