import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { Button } from "../../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Input } from "../../../ui/input";
import { z } from "zod";
import { WorkExperienceSchema } from "@/schemas";
import Tiptap from "../../../text-editor/TextEditor";
import { Dispatch, SetStateAction, useState } from "react";
import { X } from "lucide-react";
import { useArtboardStore } from "@/store/resumeStore";

type WorkExperienceProps = {
  setIsOpenSection: Dispatch<SetStateAction<boolean>>;
};

const WorkExperience = ({ setIsOpenSection }: WorkExperienceProps) => {
  const experience = useArtboardStore(
    (state) => state.resume.data.sections.experience.items
  );
  const setValues = useArtboardStore((state) => state.setValues);
  const [content, setContent] = useState<string>("");

  const form = useForm<z.infer<typeof WorkExperienceSchema>>({
    defaultValues: {
      id: uuid(),
      name: "",
      position: "",
      company: "",
      date: "",
      location: "",
      url: {
        label: "",
        href: "",
      },
      summary: "",
    },
  });

  const onSubmit = (values: z.infer<typeof WorkExperienceSchema>) => {
    if (values) {
      values.summary = content;
      values.name = values.company;
    }
    setValues("data.sections.experience.items", [...experience, values]);
    form.reset();
    onClose();
  };

  const onClose = () => {
    setIsOpenSection(false);
  };

  const handleContentChange = (reason: string) => {
    setContent(reason);
  };

  return (
    <div className="w-full flex px-4 py-4 shadow-xl relative ">
      <X
        className="absolute top-0 right-3 h-7 w-7 hover:bg-gray-200 hover:rounded-full cursor-pointer"
        onClick={onClose}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex w-full flex-col space-x-4 items-center"
        >
          <div className="flex flex-col w-full flex-wrap gap-6 items-center">
            <div className="flex-1 gap-6 w-full ">
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="position" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1  gap-6 w-full ">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Headline" type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1 w-full">
              <FormField
                control={form.control}
                name="url.href"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                      <Input placeholder="Headline" type="url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="summary"
                render={() => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Tiptap
                        onChange={(newContent: string) =>
                          handleContentChange(newContent)
                        }
                        content={content}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="w-44">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default WorkExperience;
