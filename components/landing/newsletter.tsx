"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { MailIcon, PenIcon } from "lucide-react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("You have successfully subscribed to our newsletter!");
    setEmail("");
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex justify-center items-center gap-2">
            <MailIcon />
            <span>Contact us</span>
          </h2>
          <p className="text-muted-foreground mb-6">
            Get the latest discounts, new collections, and tips on caring for
            your flowers
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit">
              <PenIcon /> Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
