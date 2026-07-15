"use client";

import { toast } from "sonner";
import { generatePdf } from "@/lib/pdf";
import { downloadBlob } from "@/utils/download";
import { usePagesStore } from "@/store/usePagesStore";
import type { PageSizeKey, FitMode } from "@/utils/constants";

export function usePdfGenerator() {
  const pages = usePagesStore((s) => s.pages);
  const isGenerating = usePagesStore((s) => s.isGenerating);
  const setGenerating = usePagesStore((s) => s.setGenerating);

  async function generate(opts: { pageSize: PageSizeKey; fitMode: FitMode; filename: string }) {
    if (pages.length === 0) return;
    setGenerating(true);
    try {
      const blob = await generatePdf(pages, opts);
      downloadBlob(blob, `${opts.filename}.pdf`);
      toast.success("PDF generated.");
    } catch {
      toast.error("Failed to generate PDF.");
    } finally {
      setGenerating(false);
    }
  }

  return { generate, isGenerating, canGenerate: pages.length > 0 };
}
