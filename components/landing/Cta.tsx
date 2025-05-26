import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle, PhoneCall } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-10 md:py-16 bg-primary">
      <div className="container mx-auto text-center text-primary-foreground px-4">
        <div className="inline-flex items-center justify-center size-16 rounded-full bg-accent/90 mb-6">
          <MessageCircle className="size-8 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
          Ready to order a perfect bouquet?
        </h2>
        <p className="text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
          Our florists will help you create an unique composition for any
          occasion
        </p>
        <Link href="/contacts">
          <Button
            size="lg"
            variant="secondary"
            className="h-12 px-6 text-base transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            Contact us <PhoneCall />
          </Button>
        </Link>
      </div>
    </section>
  );
}
