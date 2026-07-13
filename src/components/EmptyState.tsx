import { Clipboard } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-24 text-center">
      <div className="rounded-2xl border border-dashed border-neutral-300 p-5 dark:border-neutral-700">
        <Clipboard className="text-neutral-400" size={28} />
      </div>
      <p className="text-sm text-neutral-500">
        Press <kbd className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs dark:bg-neutral-800">Ctrl</kbd> + <kbd className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs dark:bg-neutral-800">V</kbd> to paste a screenshot, or add images from your device.
      </p>
    </div>
  );
}
