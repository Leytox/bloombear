import { StarIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Product } from "@/generated/prisma";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "./FavoriteButton";
import Image from "next/image";

export default function FlowerCard({ product }: { product: Product }) {
  return (
    <Card key={product.id} className="relative flex flex-col h-full pt-0">
      <div className="z-10 absolute top-2 right-2">
        <FavoriteButton product={product} />
      </div>
      <Link
        href={`/product/${product.id}`}
        className="hover:text-primary flex flex-col flex-grow"
      >
        <div className="relative w-full pt-[100%] mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={false}
          />
        </div>

        <CardHeader className="px-4 flex-grow">
          {/* Rating display */}
          <div className="flex items-center mb-2">
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`size-4 ${i < (product.rating || 0) ? "fill-yellow-500" : "fill-none"}`}
                />
              ))}
            </div>
            <span className="text-xs ml-2 text-muted-foreground">
              {product.rating ? `${product.rating.toFixed(1)}` : "No rating"}
            </span>
          </div>

          <CardTitle className="text-base line-clamp-2">
            {product.name}
          </CardTitle>

          <CardDescription className="text-sm text-muted-foreground line-clamp-3 mt-1">
            {product.description}
          </CardDescription>
        </CardHeader>
      </Link>

      <CardFooter className="px-4 py-3 mt-auto">
        <div className="w-full flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex flex-col">
                {product.discount > 0 && (
                  <div>
                    <span className="text-sm text-muted-foreground line-through">
                      {Math.round(
                        product.price + (product.discount * product.price) / 100
                      )}{" "}
                      €
                    </span>
                    <Badge
                      variant={"default"}
                      className="ml-2 py-1 px-2 text-xs"
                    >
                      -{product.discount}%
                    </Badge>
                  </div>
                )}
                <span className="text-lg font-bold">{product.price} €</span>
              </div>
              {/* Stock information */}
              <Badge variant={!product.inStock ? "destructive" : "secondary"}>
                {!product.inStock ? "Out of stock" : "In stock"}
              </Badge>
            </div>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full">
                  <AddToCartButton product={product} quantity={1} />
                </div>
              </TooltipTrigger>
              {!product.inStock && (
                <TooltipContent>
                  <p>Product out of stock</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
}
