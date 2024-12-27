import { Button } from "../ui/button";
import {
  ArrowDownToLine,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useControls } from "react-zoom-pan-pinch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type PaginationProps = {
  current?: number;
  handleNextPage?: () => void;
  handlePreviousPage?: () => void;
  page?: number;
  donwload?: () => void;
};

const Pagination = ({
  donwload,
}: PaginationProps) => {
  const {  zoomIn, zoomOut, centerView } = useControls();

  return (
    <div className="absolute bottom-[10px] h-10 text-white  gap-4 bg-black/90 w-auto flex items-center justify-center p-2 rounded-full">
      <TooltipProvider>
        <div className="flex px-2 py-4 gap-8 ">
          <Tooltip>
            <TooltipContent className="bg-black/80 border-none text-white">
              <p>Zoom in</p>
            </TooltipContent>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                className="flex justify-center items-center  rounded-full hover:bg-gray-200 hover:text-black "
                onClick={() => zoomIn()}
              >
                <ZoomIn />
              </Button>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                onClick={() => zoomOut()}
                className="flex justify-center items-center  rounded-full shadow-xl hover:bg-gray-200 hover:text-black"
              >
                <ZoomOut />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-black/80 border-none text-white">
              <p>Zoom Out</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                onClick={() => centerView(0.7, 500, "easeOut")}
                className="flex justify-center cursor-pointer items-center rounded-full shadow-xl hover:bg-gray-200 hover:text-black"
              >
                <RotateCcw />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-black/80 border-none text-white ">
              <p>Restart Page</p>
            </TooltipContent>
          </Tooltip>
          <Button
            variant={"outline"}
            className="rounded-full flex gap-2 text-black hover:bg-gray-200 hover:text-black"
            onClick={donwload}
          >
            <ArrowDownToLine />
          </Button>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Pagination;
