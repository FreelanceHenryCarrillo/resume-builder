import AbilitiesEdit from "@/components/sidebar/left/abilities/Abilities";
import Education from "@/components/sidebar/left/education/Education";
import LanguagesEdit from "@/components/sidebar/left/languages/Languages";
import WorkExperience from "@/components/sidebar/left/work-experience/WorkExperience";
import PersonalDetails from "@/components/sidebar/left/personal-details/PersonalDetails";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useArtboardStore } from "@/store/resumeStore";
import {
  ISections,
  SectionItem,
  SectionKeys,
} from "@/interfaces/SResume";
import { Button } from "@/components/ui/button";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableSection from "./_components/sortableSection";

const SidebarLeft = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenSection, setIsOpenSection] = useState(false);
  const listSections = useArtboardStore((state) => state.resume?.data.sections);
  const setValues = useArtboardStore((state) => state.setValues);
  const [isSectionOpen, setIsSectionOpen] = useState<null | SectionKeys>(null);
  const [activeId, setActiveId] = useState<null | string>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onConfirm = (values: SectionItem) => {
    console.log(values);
  };

  const onClosed = () => {};

  //WIP: terminated searchSection open
  const searchSectionOpen = (key: SectionKeys) => {
    switch (key) {
      case "education":
        return (
          <Education
            setIsOpenSection={setIsOpenSection}
            mode="created"
            onConfirm={onConfirm}
            onClosed={onClosed}
          />
        );
      case "languages":
        return (
          <LanguagesEdit
            setIsOpenSection={setIsOpenSection} /* mode="created" */
          />
        );
      case "experience":
        return (
          <WorkExperience
            setIsOpenSection={setIsOpenSection} /* mode="created" */
          />
        );
      case "skills":
        return (
          <AbilitiesEdit
            setIsOpenSection={setIsOpenSection} /* mode="created" */
          />
        );
      default:
        return null;
    }
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || !active.data.current) return;

    if (active.id === over.id) return;

    let containIndex: number = -1;
    let ItemIndex: number = -1;
    let containName: string = "";
    let ItemOIndex: number = -1;

    listSections &&
      Object.values(listSections).forEach((element, containIdx) => {
        element.items.forEach((children: { id: string }, itemIndex: number) => {
          if (children.id === active.id) {
            containName = element.name;
            containIndex = containIdx;
            ItemIndex = itemIndex;
          } else if (children.id === over.id) {
            ItemOIndex = itemIndex;
          }
        });
      });

    const newArray = arrayMove(
      Object.values(listSections as unknown as SectionItem)[containIndex].items,
      ItemIndex,
      ItemOIndex
    );

    setValues(`data.sections.${containName.toLowerCase()}.items`, newArray);
    setActiveId(null);
  };

  const onDragCancel = () => {
    setActiveId(null);
  };
  const onDragStart = (e: DragStartEvent) => {
    setActiveId(e.active.id as string);
  };

  useEffect(() => {
    isSectionOpen && searchSectionOpen(isSectionOpen);
  }, [isSectionOpen]);

  return (
    <div
      className={cn(
        "top-0 h-full w-[550px] absolute bg-white border-xl border-t-4 shadow-lg z-50 rounded-2xl transition-all ease-out duration-300",
        isOpen ? "-left-2" : "-left-[550px]"
      )}
    >
      <div className="px-5 py-5 h-[96%] m-5 overflow-scroll flex flex-col gap-5 scroll-custom">
        <div className="">
          <p className="text-2xl font-bold mb-8">Personal Details</p>
          <PersonalDetails />
        </div>
        <hr className="w-full bg-black" />
        <DndContext
          collisionDetection={closestCenter}
          sensors={sensors}
          onDragCancel={onDragCancel}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
        >
          {listSections &&
            Object.values(listSections).map((list) => {
              return (
                <div key={list.id} className="flex flex-col gap-4">
                  <div className="h-auto flex w-full gap-4 flex-col">
                    <SortableContext
                      id={list.id}
                      items={list.items}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="relative w-full">
                        <div className="absolute inset-0  rounded bg-blue-200 w-full" />

                        <div className="relative z-10 p-3 pb-8 w-full">
                          <p className="mb-3 text-xs font-bold">{list.name}</p>
                          <div className="flex gap-2 flex-col">
                            {list.items.map(
                              (section: ISections<SectionItem>) => (
                                <SortableSection
                                  key={section.id}
                                  id={section.id}
                                  name={list.name}
                                  section={list}
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </SortableContext>
                  </div>
                  {isOpenSection &&
                    isSectionOpen === list.name.toLowerCase() &&
                    searchSectionOpen(isSectionOpen as SectionKeys)}
                  <Button
                    onClick={() => {
                      setIsSectionOpen(list.name.toLowerCase() as SectionKeys);
                      setIsOpenSection(!isOpenSection);
                    }}
                  >
                    Add {list.name}
                  </Button>
                </div>
              );
            })}
        </DndContext>
      </div>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "absolute -right-14 top-[45%] text-black  hover:text-white scale-105 ",
          isOpen === false ? "text-gray-200" : "bg-white w-12"
        )}
      >
        <DragOverlay>
          {activeId && <SortableSection id={activeId} />}
        </DragOverlay>
        <ChevronLeft className={cn(isOpen === false && "rotate-180")} />
      </Button>
    </div>
  );
};

export default SidebarLeft;
