"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createComment } from "@/actions/comments";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  content: z.string().min(1),
  recommended: z.boolean().default(true),
});

export default function NewComment({ productId }: { productId: number }) {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      content: "",
      recommended: true,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      await createComment({
        ...values,
        productId: productId,
      });
      toast.success(
        "Thank you for your comment! It will be visible after moderation."
      );
      form.reset();
    } catch (error) {
      console.error("Failed to create comment:", error);
      toast.error("Sorry, we couldn't submit your comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col gap-4 p-4 border rounded-md shadow-sm"
        aria-label="Leave a comment"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Your name"
                  aria-required="true"
                  aria-invalid={!!fieldState.error}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="you@email.com"
                  type="email"
                  aria-required="true"
                  aria-invalid={!!fieldState.error}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Write your comment here..."
                  rows={4}
                  aria-required="true"
                  aria-invalid={!!fieldState.error}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recommended"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  id="recommended"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-checked={field.value}
                />
              </FormControl>
              <label
                htmlFor="recommended"
                className="cursor-pointer select-none"
              >
                I recommend this product
              </label>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={submitting || form.formState.isSubmitting}
          aria-busy={submitting || form.formState.isSubmitting}
        >
          {submitting ? (
            <span className="animate-spin mr-2 w-4 h-4 border-2 border-t-transparent border-current rounded-full inline-block" />
          ) : (
            <Send className="mr-2" />
          )}
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
