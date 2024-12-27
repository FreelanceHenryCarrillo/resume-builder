import { Toaster } from "@/components/ui/toaster";
import ResumeBuilder from "./_components/resume-builder";
import SignatureDigital from "./_components/signature-digital";
import { BrickWall, Signature } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Header from "../nav/Header";
import { useState } from "react";

type viewDashboard = "resume-builder" | "signature-digital" | "onboarding";

const DashBoard = () => {
  const [setDashboard, setActiveDashboard] =
    useState<viewDashboard>("onboarding");

  const viewDashboardActive = (key: string) => {
    switch (key) {
      case "resume-builder":
        return <ResumeBuilder />;
      case "signature-digital":
        return <SignatureDigital />;
      case "onboarding":
        // WIP: add component OMBOARDING
        return <div className="  h-full flex items-center justify-center">OMBOARDING</div>;
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center  sm:items-start sm:justify-start">
      <Header />
      <div className="flex w-full h-full">
        <div className="h-full shadow-lg w-16 flex justify-start py-20 flex-col items-center gap-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"outline"}
                  onClick={() => setActiveDashboard("resume-builder")}
                >
                  <BrickWall />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-black/80 border-none text-white">
                <p>Resume builder</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"outline"}
                  onClick={() => setActiveDashboard("signature-digital")}
                >
                  <Signature />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-black/80 border-none text-white">
                <p>Signature Digital</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="w-full h-full px-5 py-6">
          {setDashboard && viewDashboardActive(setDashboard)}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default DashBoard;
