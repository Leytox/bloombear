import { Category } from "@/generated/prisma";
import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/actions/category";

export default async function Popular() {
  const categories = await getCategories();
  return (
    <section className="py-16 md:py-24 bg-muted relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 mb-6">
            <MoveUpRightIcon className="size-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated collection of floral arrangements for
            every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories && categories.length > 0 ? (
            categories.map((category: Category) => (
              <Link
                href={`/catalog/${category.slug}`}
                key={category.name}
                className="group relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-xl transition-all duration-300 border-2 border-transparent"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6 md:p-8">
                  <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <div className="text-muted-foreground text-lg">
                No categories found at the moment.
              </div>
              <p className="text-sm text-muted-foreground/70 mt-2">
                Please check back later for our beautiful collections
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
