import { getProducts } from "@/actions/product";
import CallToAction from "@/components/landing/Cta";
import Bouquets from "@/components/landing/Bouquets";
import Benefits from "@/components/landing/Benefits";
import Popular from "@/components/landing/Popular";
import Hero from "@/components/landing/Hero";
import Testimonials from "@/components/landing/Testimonials";
import Occasions from "@/components/landing/Occasions";
import Newsletter from "@/components/landing/Newsletter";

export default async function Home() {
  const products = await getProducts();
  return (
    <main>
      <Hero />
      <Benefits />
      <Popular />
      <Bouquets products={products || []} />
      <Occasions />
      <Testimonials />
      <CallToAction />
      <Newsletter />
    </main>
  );
}
