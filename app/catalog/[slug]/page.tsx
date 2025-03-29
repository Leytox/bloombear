import CatalogClient from "../catalog-client";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { getCategories } from "@/actions/category";
import { getOccasions } from "@/actions/occasions";
import { getFilteredProducts, getMinMaxPrices } from "@/actions/product";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await prisma.category.findFirst({
    where: { slug },
  });

  if (!category) notFound();

  const [products, categories, occasions, priceRange] = await Promise.all([
    getFilteredProducts({ categoryIds: [category.id] }),
    getCategories(),
    getOccasions(),
    getMinMaxPrices(),
  ]);

  return (
    <CatalogClient
      initialProducts={products}
      categories={categories}
      occasions={occasions}
      title={`${category.name} - Bouquets catalog`}
      currentCategory={category.id}
      minPrice={priceRange.min}
      maxPrice={priceRange.max}
    />
  );
}

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const category = await prisma.category.findFirst({
    where: { slug },
  });

  if (!category)
    return {
      title: "Category Not Found",
      description: "The requested category was not found.",
    };

  return {
    title: `${category.name} - Bouquets catalog`,
    description: `Explore our ${category.name} collection and discover the perfect bouquet for any occasion.`,
  };
}
