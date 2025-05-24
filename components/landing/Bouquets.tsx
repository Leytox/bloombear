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
    <section className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl flex items-center justify-center gap-2 md:text-3xl font-bold text-center mb-8 md:mb-12">
          <Flower2Icon /> Popular Bouquets
        </h2>
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
              }),
            ]}
          >
            <CarouselContent>
              {products.map((product: Product) => (
                <CarouselItem
                  key={product.id}
                  className="basis-full sm:basis-1/2 lg:basis-1/3 pl-4"
                >
                  <FlowerCard key={product.id} product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="max-[1650px]:hidden block">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        ) : (
          <div className="col-span-3 text-center text-muted-foreground">
            No products found.
          </div>
        )}
      </div>
    </section>
  );
}
