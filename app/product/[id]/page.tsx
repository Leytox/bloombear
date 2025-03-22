import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon, StarIcon, TruckIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts, getSimilarProducts } from "@/actions/product";
import { Badge } from "@/components/ui/badge";
import FlowerCard from "@/components/FlowerCard";
import { Button } from "@/components/ui/button";
import CopyLinkButton from "@/components/CopyLinkButton";
import { SiFacebook, SiInstagram, SiX } from "@icons-pack/react-simple-icons";
import AddProduct from "@/components/AddProduct";
import FavoriteButton from "@/components/FavoriteButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = parseInt((await params).id);
  if (isNaN(id)) notFound();

  const product = await getProduct(id);
  if (!product) notFound();
  const similarProducts = await getSimilarProducts(product.categoryId);
  const filteredSimilarProducts = similarProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const originalPrice = Math.round(
    product.price * (1 + product.discount / 100),
  );
  const hasDiscount = product.discount > 0;

  return (
    <main className="container min-h-[calc(100vh-68px)] mx-auto py-6 md:py-10 px-4 md:px-8">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="text-sm text-muted-foreground mb-6 md:mb-8"
      >
        <ol className="flex flex-wrap items-center">
          <li className="flex items-center">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link
              href="/catalog"
              className="hover:text-foreground transition-colors"
            >
              Catalog
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li
            className="text-foreground font-medium truncate max-w-[200px] sm:max-w-md"
            aria-current="page"
          >
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <div className="absolute z-10 top-2 right-2">
            <FavoriteButton product={product} />
          </div>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 1024px) 90vw, 45vw"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col h-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            {product.name}
          </h1>

          <div className="flex gap-2 items-center mb-5">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`size-4 ${i < (product.rating || 0) ? "fill-yellow-500" : "fill-none"}`}
                />
              ))}
            </div>
            {product.rating && (
              <span className="text-sm font-medium text-muted-foreground">
                {product.rating.toFixed(1)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-5">
            <Badge variant={!product.inStock ? "destructive" : "secondary"}>
              {!product.inStock ? "Out of stock" : "In stock"}
            </Badge>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl font-bold text-primary">
              {product.price} €
            </span>
            {hasDiscount && (
              <span className="text-muted-foreground line-through text-lg">
                {originalPrice} €
              </span>
            )}
            {hasDiscount && (
              <Badge variant={"default"} className="py-1 px-2 text-base">
                -{product.discount}%
              </Badge>
            )}
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-muted-foreground">
            <p className="text-base leading-relaxed">{product.description}</p>
          </div>

          {product.inStock && <AddProduct product={product} />}
          <Card className="mt-8 border-muted shadow-sm">
            <CardHeader className="p-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TruckIcon className="h-5 w-5 text-primary" />
                Delivery Information
              </CardTitle>
              <CardDescription className="text-base">
                Delivery within 2-3 hours in Berlin
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0">
              <ul className="text-base space-y-4">
                <li className="flex items-start gap-3">
                  <CheckIcon className="size-6 text-primary" />
                  <span>Free delivery for orders over 25 €</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="size-6 text-primary" />
                  <span>Free delivery within the city limits of Berlin</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="size-6 text-primary" />
                  <span>Delivery 24/7</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <div className="mt-4">
            <h1 className="text-xl md:text-2xl font-bold mb-4">Share</h1>
            <div className="flex flex-col w-full gap-3 sm:flex-row sm:gap-4">
              <CopyLinkButton text="Link to product" />
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant={"outline"} size="lg" className="w-full">
                  <SiFacebook className="mr-2" /> Facebook
                </Button>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant={"outline"} size="lg" className="w-full">
                  <SiX className="mr-2" /> Twitter (X)
                </Button>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant={"outline"} size="lg" className="w-full">
                  <SiInstagram className="mr-2" /> Instagram
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {filteredSimilarProducts.length > 0 && (
        <section className="mt-16 md:mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Similar Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSimilarProducts.map((product) => (
              <FlowerCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = parseInt((await params).id);
  if (isNaN(id)) return { title: "Product Not Found" };

  const product = await getProduct(id);

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | BloomBear`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    id: String(product.id),
  }));
}
