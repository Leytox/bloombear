import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-10 md:py-16 bg-primary">
      <div className="container mx-auto text-center text-primary-foreground px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
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
            className="text-sm md:text-lg px-6 md:px-8"
          >
            Contact a florist <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </section>
  );
}
