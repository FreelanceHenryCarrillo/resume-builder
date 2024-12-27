/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { moveItemInLayout } from "@/lib/array";
import { parseLayoutLocator } from "@/lib/string";
import { LayoutLocator, SortablePayload } from "@/lib/types";
import { cn } from "@/lib/utils";
import get from "lodash.get";
import { useArtboardStore } from "@/store/resumeStore";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useDialogStore } from "@/store/dialog";

type ColumnProps = {
  id: string;
  name: string;
  items: string[];
};

export const Column = ({ id, name, items }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div className="relative">
        <div className="absolute inset-0 w-3/4 rounded bg-blue-200" />

        <div className="relative z-10 p-3 pb-8">
          <p className="mb-3 text-xs font-bold">{name}</p>

          <div ref={setNodeRef} className="space-y-3">
            {items.map((section) => (
              <SortableSection key={section} id={section} />
            ))}
          </div>
        </div>
      </div>
    </SortableContext>
  );
};

export type SortableSectionProps = {
  id: string;
};
export const SortableSection = ({ id }: SortableSectionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const style = {
    transition,
    opacity: isDragging ? 0.5 : 1,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Section id={id} />
    </div>
  );
};

export type SectionProps = {
  id: string;
  isDragging?: boolean;
};

export const Section = ({ id, isDragging = false }: SectionProps) => {
  const name = useArtboardStore((state) =>
    get(state.resume?.data.sections, `${id}.name`, id)
  ) as string;

  return (
    <div
      className={cn(
        "cursor-grab rounded bg-gray-800 p-2 text-primary-foreground transition-colors hover:bg-white hover:text-black",
        isDragging && "cursor-grabbing"
      )}
    >
      <div className="flex items-center gap-x-2">
        {/* <DotsSixVertical size={12} weight="bold" /> */}
        <p className="flex-1 truncate text-xs font-medium">{name}</p>
      </div>
    </div>
  );
};

const LayoutSection = () => {
  const setValues = useArtboardStore((state) => state.setValues);
  const layout = useArtboardStore(
    (state) => state.resume?.data.metadata.layout
  );
  const { openDialog } = useDialogStore((state) => ({
    openDialog: state.openDialog,
  }));
  const [activeId, setActiveId] = useState<string | null>(null);

  const onDragEvent = ({ active, over }: DragOverEvent | DragEndEvent) => {
    if (!over || !active.data.current) return;

    const currentPayload = active.data.current
      .sortable as SortablePayload | null;
    const current = parseLayoutLocator(currentPayload);

    if (active.id === over.id) return;

    if (!over.data.current) {
      const [page, column] = (over.id as string).split(".").map(Number);
      const target = { page, column, section: 0 } as LayoutLocator;

      const newLayout = moveItemInLayout(current, target, layout ?? []);
      setValues("data.metadata.layout", newLayout);
      return;
    }

    const targetPayload = over.data.current.sortable as SortablePayload | null;
    const target = parseLayoutLocator(targetPayload);

    const newLayout = moveItemInLayout(current, target, layout ?? []);

    setValues("data.metadata.layout", newLayout);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onAddPage = () => {
    const layoutCopy = JSON.parse(JSON.stringify(layout));

    layoutCopy.push([[], []]);

    setValues("data.metadata.layout", layoutCopy);
  };

  const onDragEnd = (e: DragEndEvent) => {
    onDragEvent(e);
    setActiveId(null);
  };

  const onDragCancel = () => {
    setActiveId(null);
  };
  const onDragStart = (e: DragStartEvent) => {
    setActiveId(e.active.id as string);
  };

  const onRemovePage = (page: number) => {
    openDialog({
      title: "Are you sure?",
      content: "This action cannot be undone.",
      type: "delete",
      confirmText: "Confirm",
      cancelText: "Cancel",
      onConfirm: () => {
        const layoutCopy = JSON.parse(JSON.stringify(layout));

        layoutCopy[0][0].push(...layoutCopy[page][0]);
        layoutCopy[0][1].push(...layoutCopy[page][1]);

        layoutCopy.splice(page, 1);

        setValues("data.metadata.layout", layoutCopy);
      },
    });
  };

  return (
    <section id="layout" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <h2 className="line-clamp-1 text-3xl font-bold">{`Layout`}</h2>
        </div>
      </header>

      <main className="grid gap-y-4">
        {/* Pages */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          onDragCancel={onDragCancel}
        >
          {layout?.map((page, pageIndex) => {
            const mainIndex = `${pageIndex}.0`;
            const sidebarIndex = `${pageIndex}.1`;

            const main = page[0];
            const sidebar = page[1];

            return (
              <div key={pageIndex} className="rounded border p-3 pb-4">
                <div className="flex items-center justify-between">
                  <p className="mb-3 text-xs font-bold">Page {pageIndex + 1}</p>

                  {pageIndex !== 0 && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8"
                      onClick={() => {
                        onRemovePage(pageIndex);
                      }}
                    >
                      <Trash size={12} className="text-error" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 items-start gap-x-4">
                  <Column id={mainIndex} name={`Main`} items={main} />
                  <Column id={sidebarIndex} name={`Sidebar`} items={sidebar} />
                </div>
              </div>
            );
          })}

          <DragOverlay>
            {activeId && <Section isDragging id={activeId} />}
          </DragOverlay>
        </DndContext>

        <Button variant="outline" className="ml-auto" onClick={onAddPage}>
          <Plus />
          <span className="ml-2">{`Add New Page`}</span>
        </Button>
      </main>
    </section>
  );
};

export default LayoutSection;
