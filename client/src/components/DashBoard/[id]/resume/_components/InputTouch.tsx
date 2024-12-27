import { Input } from "@/components/ui/input";
import { useArtboardStore } from "@/store/resumeStore";
import { House, Pencil } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const InputTouch = () => {
  const router = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const title = useArtboardStore((state) => state.resume?.title);
  const setValues = useArtboardStore((state) => state.setValues);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues("title", e.target.value);
  };
  const onBlur = () => {
    setIsOpen(false);
  };

  return (
    <div className=" w-full flex items-center justify-center gap-3 mt-3">
      <House onClick={() => router("/resume/dashboard")} color="white" />
      <hr className="bg-white h-[80%] w-[1px]" />
      {isOpen ? (
        <Input
          className="w-auto bg-transparent border-none  text-white"
          onBlur={onBlur}
          autoFocus
          onChange={onChange}
          defaultValue={title}
        />
      ) : (
        <h2 className="text-white font-bold w-auto ">{title}</h2>
      )}
      <Pencil
        className="text-gray-400"
        size={20}
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default InputTouch;
