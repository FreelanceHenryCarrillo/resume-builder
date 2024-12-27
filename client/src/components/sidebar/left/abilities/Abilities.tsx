import { PlusCircle, X } from "lucide-react";
import { v4 as uuid } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Dispatch, SetStateAction } from "react";
import { useArtboardStore } from "@/store/resumeStore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { SkillsSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

type AbilitiesProps = {
  setIsOpenSection: Dispatch<SetStateAction<boolean>>;
};

const AbilitiesEdit = ({ setIsOpenSection }: AbilitiesProps) => {
  const skills = useArtboardStore(
    (state) => state.resume.data.sections.skills.items
  );
  const setValues = useArtboardStore((state) => state.setValues);

  const form = useForm<z.infer<typeof SkillsSchema>>({
    defaultValues: {
      id: uuid(),
      name: "",
      description: "",
      level: "",
    },
  });

  const onClose = () => {
    setIsOpenSection(false);
  };

  const onSubmit = (values: z.infer<typeof SkillsSchema>) => {
    setValues("data.sections.skills.items", [...skills, values]);
    form.reset();
    onClose();
  };

  return (
    <div className=" h-auto w-full flex flex-col px-5 py-10 gap-6 items-center  shadow-xl relative ">
      <X
        className="absolute top-0 right-3 h-7 w-7 hover:bg-gray-200 hover:rounded-full cursor-pointer"
        onClick={onClose}
      />

      <div className="flex  w-full justify-between px-10 items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-10"
          >
            <div className="flex items-center">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <hr className="h-1 w-10 mx-6 bg-black/20" />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} {...field}>
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent {...field}>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex">
              <Button
                variant={"secondary"}
                type="submit"
                className="hover:bg-gray-200 hover:scale-105 flex gap-4 items-center"
              >
                ADD NEW
                <PlusCircle />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AbilitiesEdit;
