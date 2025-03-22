import { getProducts } from "@/actions/product";
import { getCategories } from "@/actions/category";
import { getOccasions } from "@/actions/occasions";
import CallToAction from "@/components/landing/cta";
import Bouquets from "@/components/landing/bouquets";
import Benefits from "@/components/landing/benefits";
import Popular from "@/components/landing/popular";
import Hero from "@/components/landing/hero";
import Testimonials from "@/components/landing/testimonials";
import Occasions from "@/components/landing/occasions";
import Newsletter from "@/components/landing/newsletter";

export default async function Home() {
  const [products, categories, occasions] = await Promise.all([
    getProducts(),
    getCategories(),
    getOccasions(),
  ]);
  return (
    <main>
      <Hero />
      <Benefits />
      <Popular categories={categories} />
      <Bouquets products={products} />
      <Occasions occasions={occasions} />
      <Testimonials />
      <CallToAction />
      <Newsletter />
    </main>
  );
}
