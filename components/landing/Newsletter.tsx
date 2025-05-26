"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MailIcon, PenIcon } from "lucide-react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("You have successfully subscribed to our newsletter!");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 mb-6">
            <MailIcon className="size-8 text-primary" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>

          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and be the first to know about new
            collections, exclusive offers, and flower care tips
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row max-w-md mx-auto max-md:gap-4"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 text-base rounded-r-none transition-all duration-300 focus:ring-2 focus:ring-primary/20 max-md:rounded-r-md"
            />
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="h-12 px-6 text-base rounded-l-none transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 max-md:rounded-l-md"
            >
              <PenIcon className="mr-2 size-5" />
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
