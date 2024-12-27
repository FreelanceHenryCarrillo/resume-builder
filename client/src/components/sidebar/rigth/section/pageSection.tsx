import { Label } from "@/components/ui/label";
import { useArtboardStore } from "@/store/resumeStore";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PageSection = () => {
  const setValues = useArtboardStore((state) => state.setValues);
  const format = useArtboardStore((state) => state.resume?.data.metadata.page.format);
  const margin = useArtboardStore((state) => state.resume?.data.metadata.page.margin);

  return (
    <section id="Theme" className="grid gap-y-6">
      <header>
        <h2 className="font-bold text-3xl">Theme</h2>
      </header>
      <div className="flex flex-col gap-10 w-full">
        <div className="flex flex-col gap-4 ">
          <div className="w-full flex flex-col gap-4 ">
            <div className="w-full flex flex-col gap-4 justify-between">
              <Label className="font-semibold ">Format</Label>
              <Select value={format}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Format" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value={format ?? 'a4'}>{format}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 ">
            <div className="w-full flex items-center justify-between">
              <Label className="font-semibold ">Margin</Label>
              <span className="text-lg font-bold text-slate-600">
                {margin}
              </span>
            </div>
            <Slider
              min={1}
              max={25}
              step={1}
              value={[margin ?? 15]}
              onValueChange={(value) =>
                setValues("data.metadata.page.margin", value[0])
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageSection;
