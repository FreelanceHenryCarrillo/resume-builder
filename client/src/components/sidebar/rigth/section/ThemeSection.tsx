import { HexColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";
import {  useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropletIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useArtboardStore } from "@/store/resumeStore";

const ThemeSection = () => {
  const setValues = useArtboardStore((state) => state.setValues);
  const background = useArtboardStore((state) => state.resume?.data.metadata.theme?.background);
  const color = useArtboardStore((state) => state.resume?.data.metadata.theme?.color);
  const [isActiveBackground, setIsActiveBackground] = useState(false);
  const [isActiveColor, setIsActiveColor] = useState(false);

  return (
    <section id="Theme" className="grid gap-y-6">
      <header>
        <h2 className="font-bold text-3xl">Theme</h2>
      </header>
      <div className="flex flex-col gap-10 w-full">
        <div className="flex gap-4 ">
          <div className="w-full">
            <Label className="font-semibold ">Background</Label>
            <Input type="text" value={background} />
          </div>
          <div className="flex items-center justify-center relative">
            <Button
              className={cn(
                !isActiveBackground
                  ? "block mt-4"
                  : "absolute -top-10 right-0 z-50"
              )}
              onClick={() => setIsActiveBackground(!isActiveBackground)}
            >
              {isActiveBackground ? <X size={20} /> : <DropletIcon />}
            </Button>
            {isActiveBackground && (
              <HexColorPicker
                color={background}
                onChange={(value) =>
                  setValues(`data.metadata.theme.background`, value)
                }
              />
            )}
          </div>
        </div>
        <div className="flex gap-4 ">
          <div className="w-full">
            <Label className="font-semibold ">Color</Label>
            <Input type="text" value={color} />
          </div>
          <div className="flex items-center justify-center relative">
            <Button
              className={cn(
                !isActiveColor
                  ? "block mt-4"
                  : "absolute -top-10 right-0 z-50"
              )}
              onClick={() => setIsActiveColor(!isActiveColor)}
            >
              {isActiveColor ? <X size={20} /> : <DropletIcon />}
            </Button>
            {isActiveColor && (
              <HexColorPicker
                color={color}
                onChange={(value) =>
                  setValues(`data.metadata.theme.color`, value)
                }
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThemeSection;
