import { getProducts } from "@/actions/product";
import { getCategories } from "@/actions/category";
import { getOccasions } from "@/actions/occasions";
import CallToAction from "@/components/landing/Cta";
import Bouquets from "@/components/landing/Bouquets";
import Benefits from "@/components/landing/Benefits";
import Popular from "@/components/landing/Popular";
import Hero from "@/components/landing/Hero";
import Testimonials from "@/components/landing/Testimonials";
import Occasions from "@/components/landing/Occasions";
import Newsletter from "@/components/landing/Newsletter";

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
      <Popular categories={categories || []} />
      <Bouquets products={products || []} />
      <Occasions occasions={occasions || []} />
      <Testimonials />
      <CallToAction />
      <Newsletter />
    </main>
  );
}
