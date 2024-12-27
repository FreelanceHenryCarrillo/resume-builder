import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useSignIn from "@/hooks/resume/onSignIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const SignInPage = () => {
  const { onSignIn, loading, errorMessage } = useSignIn();
  const formSchema = z.object({
    email: z
      .string()
      .min(2, { message: "El email debe tener al menos 2 caracteres" })
      .email("Debe ser un email válido"),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (data.email && data.password) onSignIn(data.email, data.password);
  };

  return (
    <div className=" mx-auto h-screen flex items-center justify-center ">
      <div className="w-screen sm:w-[400px]  items-center justify-center h-full ">
        <div
          className=" flex flex-col  mx-auto h-full items-center justify-center
        bg-black
         "
        >
          <div className="flex flex-col gap-4 bg-gray-200 px-4 py-10 h-auto w-80 items-center justify-center rounded-xl">
            <div className="flex flex-col w-full">
              <h2 className="text-xl font-bold">Sign In</h2>

              <p className="text-sm">
                Don't have an account?{" "}
                <Link to={"/auth/sign-up"} className="text-blue-700">
                  Create one now
                </Link>
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm text-black">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="joe@ibm.cl" {...field} />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-black">Paswword</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="************"
                          {...field}
                          type="password"
                        />
                      </FormControl>

                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <Button variant={"default"} type="submit">
                  {loading ? <Loader className="animate-spin" /> : "Sign In"}
                </Button>
              </form>
            </Form>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            <div className="flex flex-col gap-2">
              <p></p> or continue with
              <Button variant={"outline"} type="submit">
                Google
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden flex-1 bg-[url(/backgroundLogin.jpeg)] bg-no-repeat bg-cover items-center justify-center w-full h-full sm:inline-block"></div>
    </div>
  );
};

export default SignInPage;
