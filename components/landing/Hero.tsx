"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-68px)]">
      <Carousel
        className="w-full h-[calc(100vh-68px)]"
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="h-full">
          {["/hero-banner.jpg", "/hero-banner2.jpg", "/hero-banner3.jpg"].map(
            (image, index) => (
              <CarouselItem key={index} className="h-[calc(100vh-68px)]">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0">
                    <Image
                      src={image}
                      alt={`Flowers ${index + 1}`}
                      fill
                      className="object-cover brightness-[0.5]"
                      priority={index === 0}
                    />
                  </div>
                  <div className="relative container mx-auto h-full flex items-center w-full px-4">
                    <div className="text-center w-full text-white">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">
                        Delivery of fresh flowers in Berlin
                      </h1>
                      <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8">
                        We deliver fresh flowers to make your special moments
                        unforgettable.
                      </p>
                      <Link href="/catalog">
                        <Button
                          size="lg"
                          className="text-base md:text-lg px-6 md:px-8"
                        >
                          Go to Catalog <ArrowRightIcon />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          <CarouselPrevious className="static translate-y-0 left-0" />
          <CarouselNext className="static translate-y-0 right-0" />
        </div>
      </Carousel>
    </section>
  );
}
