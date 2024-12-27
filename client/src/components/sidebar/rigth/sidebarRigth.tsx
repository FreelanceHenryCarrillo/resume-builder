import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import LayoutSection from "./section/LayoutSection";
import TemplateSection from "./section/TemplateSection";
import TypographySection from "./section/TypographySection";
import ThemeSection from "./section/ThemeSection";
import PageSection from "./section/pageSection";

const SidebarRigth = () => {
  const [isOpen, setisOpen] = useState(true);

  return (
    <div
      className={cn(
        "top-0 right-0 h-full py-4 px-4 w-[400px] absolute bg-white border-xl border-t-4 shadow-lg z-50 rounded-2xl transition-all ease-out duration-300 ",
        isOpen ? "-right-2" : "-right-[400px]"
      )}
    >
      <div className="flex  flex-col gap-10 mt-4 mb-10 py-5 px-5 w-auto h-full shadow-md  scroll-m-2 overflow-scroll scroll-custom" >
        <TemplateSection />
        <hr />
        <LayoutSection />
        <hr />
        <TypographySection />
        <hr />
        <ThemeSection/>
        <hr />
        <PageSection/>
      </div>

      <Button
        onClick={() => setisOpen(!isOpen)}
        className={cn(
          "absolute -left-14  top-[45%]  ",
          isOpen === false ? "text-gray-200" : "bg-white w-12 text-black"
        )}
      >
        <ChevronRight className={cn(isOpen === false && "rotate-180")} />
      </Button>
    </div>
  );
};

export default SidebarRigth;
