import { getFilteredProducts, getMinMaxPrices } from "@/actions/product";
import CatalogClient from "./catalog-client";
import { getCategories } from "@/actions/category";
import { getOccasions } from "@/actions/occasions";
import { Metadata } from "next";

export default async function CatalogPage() {
  const [products, categories, occasions, priceRange] = await Promise.all([
    getFilteredProducts(),
    getCategories(),
    getOccasions(),
    getMinMaxPrices(),
  ]);

  return (
    <CatalogClient
      initialProducts={products}
      categories={categories}
      occasions={occasions}
      minPrice={priceRange.min}
      maxPrice={priceRange.max}
    />
  );
}

export const metadata: Metadata = {
  title: "Bouquets catalog",
  description:
    "Explore our collection and discover the perfect bouquet for any occasion.",
};
