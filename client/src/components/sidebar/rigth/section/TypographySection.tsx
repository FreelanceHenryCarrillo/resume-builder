/* eslint-disable @typescript-eslint/no-unused-vars */
import { Slider } from "@/components/ui/slider";
import { fonts } from "@/lib/fonts";
import { useArtboardStore } from "@/store/resumeStore";
import { useEffect, useState } from "react";

const fontSuggestions = [
  "Open Sans",
  "Merriweather",
  "Roboto Condensed",
  "Playfair Display",
  "Lato",
  "Lora",
  "PT Sans",
  "PT Serif",
  "IBM Plex Sans",
  "IBM Plex Serif",
];

const loadFont = (font: string) => {
  const selectedFont = fonts.find((f) => f.family === font);

  if (selectedFont) {
    const fontStyleId = "dynamic-font-style";

    const existingStyle = document.getElementById(fontStyleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = document.createElement("style");
    style.id = fontStyleId;
    style.textContent = `
      @font-face {
        font-family: '${selectedFont.family}';
        src: url('${selectedFont.files.regular}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    document.head.appendChild(style);
  }
};

const TypographySection = () => {

  // WIP: add multiple Fonts
 /*  const [subsets, setSubsets] = useState<[]>([]);
  const [variants, setVariants] = useState<[]>([]); */

  const setValues = useArtboardStore((state) => state.setValues);
  const typography = useArtboardStore(
    (state) => state.resume?.data.metadata.typography
  );

  const onSetFont = (font: string) => {
    loadFont(font);
    setValues("data.metadata.typography.font.family", font);
  };

  useEffect(() => {
    if (typography?.font.family) {
      loadFont(typography.font.family);
    }
  }, [typography?.font.family]);

  return (
    <section id="Fonts" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <h2 className="line-clamp-1 text-3xl font-bold">{`Fonts`}</h2>
        </div>
      </header>
      <main className="flex w-full flex-wrap gap-4">
        {fontSuggestions.map((font, idx) => (
          <div
            key={idx}
            className="flex px-4 py-2 bg-primary rounded-sm text-white cursor-pointer hover:scale-[1.1]"
            onClick={() => onSetFont(font)}
          >
            {font}
          </div>
        ))}

        <div className="mt-5 w-full flex  flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="line-clamp-1 text-lg font-bold">Font Size</h2>
            <span className="text-lg font-bold text-slate-600">
              {typography?.font.size}
            </span>
          </div>
          <div className="w-full ">
            <Slider
              min={9}
              max={25}
              step={1}
              value={[typography?.font.size ?? 14]}
              onValueChange={(value) => {
                setValues("data.metadata.typography.font.size", value[0]);
              }}
            />
          </div>
        </div>
        <div className="mt-5 w-full flex  flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="line-clamp-1 text-lg font-bold">Line Height</h2>
            <span className="text-lg font-bold text-slate-600">
              {typography?.lineHeight}
            </span>
          </div>
          <div className="w-full ">
            <Slider
              min={0}
              max={3}
              step={0.05}
              value={[typography?.lineHeight ?? 1.3]}
              onValueChange={(value) => {
                setValues("data.metadata.typography.lineHeight", value[0]);
              }}
            />
          </div>
        </div>
      </main>
    </section>
  );
};

export default TypographySection;
