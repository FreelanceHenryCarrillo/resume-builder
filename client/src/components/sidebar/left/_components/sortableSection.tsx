import { CSS } from "@dnd-kit/utilities";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useSortable } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import { EllipsisVertical, Grip, Pencil, Trash2, EyeOff } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useArtboardStore } from "@/store/resumeStore";
import { ISections, SectionItem, SectionKeys } from "@/interfaces/SResume";
import { useDialogStore } from "@/store/dialog";
import { toast } from "@/components/ui/use-toast";
import { useCallback, useMemo } from "react";

type SortableSectionProps = {
  id: string;
  name?: string;
  section?: ISections<SectionItem>;
};

const SortableSection = ({ id, name, section }: SortableSectionProps) => {
  const { openDialog } = useDialogStore((state) => ({
    openDialog: state.openDialog,
  }));
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
  const items = useArtboardStore((state) => state.resume?.data.sections);
  const setValues = useArtboardStore((state) => state.setValues);
  const foundItem = useMemo(() => {
    return Object.values(items as unknown as SectionItem)
      .flatMap((section) => section.items)
      .find((item) => item.id === id).name;
  }, [items, id]);

  const onDelete = useCallback(
    (id: string) => {
      openDialog({
        title: "¿Estás seguro?",
        type: "delete",
        content: "Esta acción no se puede deshacer.",
        confirmText: "Confirmar",
        cancelText: "Cancelar",
        onConfirm: () => {
          toast({
            title: "¡Sección eliminada con éxito!",
            description: `Se eliminó el elemento ${name} / ${foundItem}`,
            variant: "success",
          });
          const newUpdateSection = section?.items.filter(
            (item) => item.id !== id
          );
          setValues(
            `data.sections.${name?.toLowerCase()}.items`,
            newUpdateSection
          );
        },
      });
    },
    [openDialog, name, foundItem, section, setValues]
  );

  const onEdit = useCallback(
    (id: string) => {
      openDialog({
        title: "¿Estás seguro?",
        type: "update",
        section: name?.toLocaleLowerCase() as SectionKeys,
        itemEditSection:
          section && section.items.filter((item) => item.id === id)[0],
        content: "¡Esta acción actualizará el elemento!",
        confirmText: "Confirmar",
        cancelText: "Cancelar",
        onConfirm: (values) => {
          toast({
            title: "¡Sección actualizada con éxito!",
            description: `Se actualizó el elemento ${name} / ${foundItem}`,
            variant: "success",
          });
          const newUpdateSection = section?.items.map((item) => {
            if (item.id === values?.id) {
              return {
                ...item,
                ...values,
              };
            }
            return item
          });

           setValues(
            `data.sections.${name?.toLowerCase()}.items`,
            newUpdateSection
          );
        },
      });
    },
    [openDialog, name, foundItem, section, setValues]
  );

  return (
    <div className="flex w-full justify-between">
      <div
        className={cn(
          "cursor-grab h-full w-[90%] justify-between rounded text-center bg-gray-800 p-4 flex text-primary-foreground transition-colors hover:bg-white hover:text-black",
          isDragging && "cursor-grabbing"
        )}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        <div className="w-full">
          <div className="flex items-center gap-x-2 justify-between w-full h-full ">
            <div className="h-full flex gap-x-2">
              <Grip />
              <hr className="h-full w-[2px] bg-gray-200 " />
            </div>
            <p className=" w-full truncate text-xs font-medium text-center">
              {foundItem}
            </p>
          </div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical className="hover:scale-[1.03] " size={30} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center justify-between">
            Not Visible <EyeOff size={15} />{" "}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center justify-between"
            onClick={() => onEdit(id)}
          >
            Edit <Pencil size={15} />
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center justify-between text-red-400 cursor-pointer"
            onClick={() => onDelete(id)}
          >
            Delete
            <Trash2 className="text-red-300" size={20} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortableSection;
