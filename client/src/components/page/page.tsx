import { MM_TO_PX } from "@/components/DashBoard/[id]/resume";
import { pageSizeMap } from "@/lib/namespaces/page";
import { cn } from "@/lib/utils";
import { useArtboardStore } from "@/store/resumeStore";
import { ReactNode} from "react";

type Prop = {
  pageNumber: number;
  children: ReactNode;
};
const Page = ({ children, pageNumber }: Prop) => {
  const page = useArtboardStore((state) => state.resume.data.metadata.page);
  const fontFamily = useArtboardStore(
    (state) => state.resume.data.metadata.typography?.font.family
  );

  return (
    <div
      data-page={pageNumber}
      className={cn("relative bg-background text-foreground flex ")}
      style={{
        fontFamily,
        width: `${pageSizeMap[page.format].width * MM_TO_PX}px`,
        minHeight: `${pageSizeMap[page.format].height * MM_TO_PX}px`,
      }}
    >
      {children}
    </div>
  );
};

export default Page;
