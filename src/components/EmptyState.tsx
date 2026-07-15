import { ImagePlus } from "lucide-react";

export function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div
      onClick={onAdd}
      className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-3 py-24 text-center transition hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
    >
      <div className="rounded-2xl border border-dashed border-neutral-300 p-5 dark:border-neutral-700">
        <ImagePlus className="text-neutral-400" size={28} />
      </div>
      <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
        Click anywhere to add images
      </p>
      <p className="text-xs text-neutral-400">
        or paste a screenshot with Ctrl+V
      </p>
    </div>
  );
}
