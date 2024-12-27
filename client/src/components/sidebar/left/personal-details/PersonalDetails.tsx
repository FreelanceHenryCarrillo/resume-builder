import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PersonalDetailsSchema } from "@/schemas";
import { usePostFile } from "@/services/file/postFile";
import { useArtboardStore } from "@/store/resumeStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const PersonalDetails = () => {
  const setValues = useArtboardStore((state) => state.setValues);
  const profileImage = useArtboardStore((state) => state.resume.image);
  const [Image, setImage] = useState<File | undefined>(undefined);
  const { fileResponse, loading } = usePostFile(Image, "user", 28);
  useEffect(() => {
    if (fileResponse) {
      setValues("image", fileResponse);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ profileImage, fileResponse]);

  const form = useForm<z.infer<typeof PersonalDetailsSchema>>({
    resolver: zodResolver(PersonalDetailsSchema),
    defaultValues: {
      photo: "",
      name: "",
      email: "",
      headline: "",
      phone: "",
      location: "",
    },
  });

  const onSubmit = (values: z.infer<typeof PersonalDetailsSchema>) => {
    for (const element in values) {
      const key = element as keyof typeof values;
      setValues(`data.basics.${key}`, values[key]);
    }
  };

  const onUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles =
      event?.target?.files && (event?.target?.files[0] as File);

    if (selectedFiles) {
      setImage(selectedFiles);
      form.resetField("photo");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex w-full flex-wrap space-x-4 items-center"
      >
        <div className="flex w-full flex-wrap gap-6 items-center">
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel className="self-start">Photo </FormLabel>

                {loading ? (
                  <Loader className="animate-spin " size={30} />
                ) : (
                  <img
                    loading={"lazy"}
                    src={profileImage || fileResponse || "https://cdn-icons-png.flaticon.com/512/16/16363.png" }
                    alt="user-profile"
                    width={150}
                    height={100}
                    className="cursor-pointer hover:scale-105"
                  />
                )}
                <FormControl>
                  <Input
                    type="file"
                    {...field}
                    onChange={(e) => onUploadImage(e)}
                    accept="image/png,image/jpeg,image/jpg"
                  />
                </FormControl>
                <FormDescription>This is your public Photo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="headline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Headline</FormLabel>
                <FormControl>
                  <Input placeholder="Headline" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-44">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PersonalDetails;
