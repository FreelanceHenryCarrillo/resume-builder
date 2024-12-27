import { useState, useEffect, useMemo } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { pageSizeMap } from "@/lib/namespaces/page";
import { getTemplate } from "@/lib/utils";
import { useArtboardStore } from "@/store/resumeStore";
import Page from "@/components/page/page";
import Pagination from "@/components/pagination/Pagination";
import SidebarLeft from "@/components/sidebar/left/sidebarLeft";
import SidebarRigth from "@/components/sidebar/rigth/sidebarRigth";
import InputTouch from "./_components/InputTouch";

export const MM_TO_PX = 3.78;

const BuildResume = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const resume = useArtboardStore((state) => state.resume);
  const Template = useMemo(
    () => getTemplate(resume.data.metadata.template),
    [resume.data.metadata.template]
  );
  const page = resume.data.metadata.page;
  const layout = useArtboardStore(
    (state) => state.resume?.data.metadata.layout
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const contentWidth = useMemo(() => {
    if (layout && page) {
      return layout.length * (pageSizeMap[page.format].width * MM_TO_PX + 42);
    }
    return 0;
  }, [layout, page]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden bg-black relative">
      <InputTouch />
      <div className="w-full h-full flex items-center justify-center overflow-hidden bg-black relative">
        <SidebarLeft />
        <SidebarRigth />

        <TransformWrapper
          initialScale={0.7}
          minScale={0.1}
          centerOnInit
          centerZoomedOut
          limitToBounds={false}
        >
          {() => (
            <>
              <TransformComponent
                wrapperClass="flex items-center justify-center "
                contentClass="!w-screen"
              >
                <div
                  className="mx-auto grid gap-10"
                  style={{
                    width: `${Math.min(contentWidth, screenWidth)}px`,
                    gridTemplateColumns: `repeat(${
                      layout && layout.length
                    }, 1fr)`,
                  }}
                >
                  {layout?.map((columns, pageIndex) => (
                    <Page pageNumber={pageIndex + 1} key={pageIndex}>
                      {Template && (
                        <Template
                          isFirstPage={pageIndex === 0}
                          columns={columns}
                        />
                      )}
                    </Page>
                  ))}
                </div>
              </TransformComponent>
              <Pagination />
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
};

export default BuildResume;
