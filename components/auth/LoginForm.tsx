"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signInCredentials } from "@/actions/auth";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  login: z.string().min(1),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50, { message: "Password must be at most 50 characters" }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signInCredentials(values.login, values.password);
      router.push("/dashboard");
      toast.success("Logged in successfully");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
      console.error(error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div>
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl text-center font-bold">Welcome back</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="login">Login</FormLabel>
                    <FormControl>
                      <Input
                        id="login"
                        type="text"
                        placeholder="Login"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter your login.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="dalKSJDf$W@43"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                Continue{" "}
                {form.formState.isSubmitting ? (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRightIcon />
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
