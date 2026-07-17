"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { AnimatePresence } from "framer-motion";
import { PageCard } from "./PageCard";
import { PreviewModal } from "./PreviewModal";
import { usePagesStore } from "@/store/usePagesStore";
import type { Page } from "@/types/page";

export function PageList() {
  const pages = usePagesStore((s) => s.pages);
  const reorderPages = usePagesStore((s) => s.reorderPages);
  const setDragging = usePagesStore((s) => s.setDragging);
  const [previewPage, setPreviewPage] = useState<Page | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragStart(_event: DragStartEvent) {
    setDragging(true);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = pages.findIndex((p) => p.id === active.id);
      const newIndex = pages.findIndex((p) => p.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderPages(oldIndex, newIndex);
      }
    }

    setTimeout(() => setDragging(false), 80);
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={pages.map((p) => p.id)} strategy={rectSortingStrategy}>
          <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4 px-5 pb-5 pt-12">
            <AnimatePresence mode="popLayout">
              {pages.map((page, index) => (
                <PageCard key={page.id} page={page} index={index} onPreview={setPreviewPage} />
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>

      <PreviewModal page={previewPage} onClose={() => setPreviewPage(null)} />
    </>
  );
}
