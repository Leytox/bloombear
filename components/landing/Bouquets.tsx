"use client";
import { Product } from "@/generated/prisma";
import { Flower2Icon } from "lucide-react";
import FlowerCard from "@/components/FlowerCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Bouquets({ products }: { products: Product[] }) {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 mb-6">
            <Flower2Icon className="size-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular Bouquets
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved floral arrangements, crafted with care and
            creativity
          </p>
        </div>

        {products.length > 0 ? (
          <Carousel
            className="w-full mx-auto"
            opts={{
              loop: true,
              align: "start",
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
              }),
            ]}
          >
            <CarouselContent className="-ml-4">
              {products.map((product: Product) => (
                <CarouselItem
                  key={product.id}
                  className="basis-full sm:basis-1/2 lg:basis-1/3 pl-4 transition-all duration-300"
                >
                  <div className="h-full">
                    <FlowerCard key={product.id} product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="max-[1650px]:hidden block mt-8">
              <CarouselPrevious className="size-12" />
              <CarouselNext className="size-12" />
            </div>
          </Carousel>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg">
              No products found at the moment.
            </div>
            <p className="text-sm text-muted-foreground/70 mt-2">
              Please check back later for our beautiful arrangements
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
