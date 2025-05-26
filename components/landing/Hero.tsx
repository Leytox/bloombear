"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRightIcon, HeartIcon, Flower2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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
            stopOnInteraction: true,
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
                      className="object-cover brightness-[0.4] transition-transform duration-[5000ms] group-hover:scale-105"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
                  </div>
                  <div className="relative container mx-auto h-full flex items-center w-full px-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-center w-full text-white"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="inline-flex items-center justify-center size-16 rounded-full bg-white/10 backdrop-blur-sm mb-6"
                      >
                        <Flower2Icon className="size-8 text-white" />
                      </motion.div>

                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight"
                      >
                        Bloom with Love in{" "}
                        <span className="text-white relative">
                          Berlin
                          <motion.span
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 1.2 }}
                            className="absolute -bottom-2 left-0 h-1 bg-white/30"
                          />
                        </span>
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 max-w-3xl mx-auto text-white/90"
                      >
                        Experience the magic of fresh, handcrafted bouquets
                        delivered to your doorstep. Perfect for every occasion,
                        from birthdays to anniversaries.
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                      >
                        <Link href="/catalog">
                          <Button
                            size="lg"
                            className="text-base md:text-lg px-8 md:px-10 bg-white text-black hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
                          >
                            Explore Collection{" "}
                            <ArrowRightIcon className="ml-2 size-5" />
                          </Button>
                        </Link>
                        <Link href="/contacts">
                          <Button
                            size="lg"
                            variant="outline"
                            className="text-base md:text-lg px-8 md:px-10 border-white text-white hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
                          >
                            Custom Order <HeartIcon className="ml-2 size-5" />
                          </Button>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
          <CarouselPrevious className="static translate-y-0 left-0 bg-white/20 hover:bg-white/30 border-none transition-all duration-300 hover:shadow-lg hover:shadow-white/20" />
          <CarouselNext className="static translate-y-0 right-0 bg-white/20 hover:bg-white/30 border-none transition-all duration-300 hover:shadow-lg hover:shadow-white/20" />
        </div>
      </Carousel>
    </section>
  );
}
