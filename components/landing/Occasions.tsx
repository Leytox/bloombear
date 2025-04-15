import { Occasion } from "@prisma/client";
import { BookImageIcon } from "lucide-react";
import Image from "next/image";
import { getOccasions } from "@/actions/occasions";

export default async function Occasions() {
  const occasions = await getOccasions();
  return (
    <section className="py-10 md:py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl flex items-center justify-center gap-2 md:text-3xl font-bold text-center mb-8 md:mb-12">
          <BookImageIcon /> Special Occasions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {occasions && occasions.length > 0 ? (
            occasions.map((occasion: Occasion) => (
              <div
                key={occasion.name}
                className="group relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-lg"
              >
                <Image
                  src={occasion.image}
                  alt={occasion.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 md:p-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">
                      {occasion.name}
                    </h3>
                    <p className="text-white/80 text-sm md:text-base">
                      {occasion.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-muted-foreground">
              No occasions found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
