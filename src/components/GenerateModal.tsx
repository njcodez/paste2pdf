"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { PageSizeKey, FitMode } from "@/utils/constants";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (opts: { pageSize: PageSizeKey; fitMode: FitMode; filename: string }) => void;
}

export function GenerateModal({ open, onClose, onConfirm }: Props) {
  const [pageSize, setPageSize] = useState<PageSizeKey>("A4");
  const [fitMode, setFitMode] = useState<FitMode>("fit");
  const [filename, setFilename] = useState("document");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-8">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl dark:bg-neutral-900">
        <h2 className="mb-4 text-sm font-semibold text-neutral-800 dark:text-neutral-100">
          Generate PDF
        </h2>

        <label className="mb-1 block text-xs font-medium text-neutral-500">Layout</label>
        <div className="mb-4 flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-200">
            <input type="radio" checked={fitMode === "fit"} onChange={() => setFitMode("fit")} />
            Fit inside page (white margins)
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-200">
            <input
              type="radio"
              checked={fitMode === "matchImage"}
              onChange={() => setFitMode("matchImage")}
            />
            Match page size to image (no border)
          </label>
        </div>

        {fitMode === "fit" && (
          <div className="mb-4">
            <label className="mb-1 block text-xs font-medium text-neutral-500">Page size</label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value as PageSizeKey)}
              className="w-full rounded-lg border border-neutral-200 px-3 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-800"
            >
              <option value="A3">A3</option>
              <option value="A4">A4</option>
              <option value="A5">A5</option>
              <option value="Letter">Letter</option>
              <option value="Legal">Legal</option>
              <option value="Tabloid">Tabloid</option>
              <option value="Executive">Executive</option>
            </select>
          </div>
        )}

        <div className="mb-5">
          <label className="mb-1 block text-xs font-medium text-neutral-500">Filename</label>
          <input
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 px-3 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-800"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-full border border-neutral-200 px-3.5 py-1.5 text-sm dark:border-neutral-700"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onConfirm({ pageSize, fitMode, filename: filename.trim() || "document" })
            }
            className="rounded-full bg-neutral-900 px-3.5 py-1.5 text-sm text-white dark:bg-white dark:text-neutral-900"
          >
            Generate
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
