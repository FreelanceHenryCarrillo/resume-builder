import { v4 as uuid } from "uuid";

import { useForm } from "react-hook-form";
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
import { EducationSchema } from "@/schemas";
import Tiptap from "../../../text-editor/TextEditor";
import { Dispatch, SetStateAction, useState } from "react";
import { useArtboardStore } from "@/store/resumeStore";
import { X } from "lucide-react";
import { IEducationItem } from "@/interfaces/SResume";

type EducationProps<T> = {
  setIsOpenSection: Dispatch<SetStateAction<boolean>>;
  mode: "edit" | "created";
  itemEditSection?: T | null;
  onConfirm: (values: IEducationItem) => void;
  onClosed: () => void;
};

const Education = ({
  setIsOpenSection,
  mode = "created",
  itemEditSection,
  onConfirm,
  onClosed,
}: EducationProps<IEducationItem>) => {
  const [content, setContent] = useState<string>("");
  const setValues = useArtboardStore((state) => state.setValues);
  const education = useArtboardStore(
    (state) => state.resume.data.sections.education.items
  );

  const form = useForm<z.infer<typeof EducationSchema>>({
    defaultValues: {
      id: itemEditSection ? itemEditSection.id : uuid(),
      name: itemEditSection ? itemEditSection.institution : "",
      institution: itemEditSection ? itemEditSection.institution : "",
      area: itemEditSection ? itemEditSection.area : "",
      studyType: itemEditSection ? itemEditSection.studyType : "",
      date: itemEditSection ? itemEditSection.date : "",
      summary: itemEditSection ? itemEditSection.summary : "",
      url: {
        label: itemEditSection ? itemEditSection.url.label : "",
        href: itemEditSection ? itemEditSection.url.href : "",
      },
    },
  });

  const onClose = () => {
    setIsOpenSection(false);
  };

  const onSubmit = (values: z.infer<typeof EducationSchema>) => {
    if (mode === "edit") {
      onConfirm(values as IEducationItem);
    } else {
      if (values) {
        values.summary = content;
        values.name = values.institution;
      }
      setValues(`data.sections.education.items`, [...education, values]);
      form.reset();
      setContent("");
      onClose();
    }
  };

  const handleContentChange = (reason: string) => {
    setContent(reason);
  };

  return (
    <div className="w-full flex px-4 py-4 shadow-xl relative">
      {mode === "created" && (
        <X
          className="absolute top-0 right-3 h-7 w-7 hover:bg-gray-200 hover:rounded-full cursor-pointer"
          onClick={onClose}
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex w-full flex-col space-x-4 items-center"
        >
          <div className="flex flex-col w-full flex-wrap gap-6 items-center">
            <div className="flex-1 gap-6 w-full ">
              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution</FormLabel>
                    <FormControl>
                      <Input placeholder="institution" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Area</FormLabel>
                    <FormControl>
                      <Input placeholder="Area" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studyType"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Study Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Area" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1  gap-6 w-full ">
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
              <FormField
                control={form.control}
                name="url.href"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                      <Input placeholder="Url" type="url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1 w-full">
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

          <div className="flex  gap-10">
            <Button type="submit" className="w-44">
              {mode === "created" ? "Submit" : "Edit"}
            </Button>
            {mode === "edit" && (
              <Button type="submit" className="w-44" onClick={onClosed}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Education;
