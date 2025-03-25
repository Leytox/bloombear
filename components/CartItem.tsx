"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/useCartStore";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Product } from "@prisma/client";
import ProductQuantity from "./ProductQuantity";

export default function CartItem({
  productId,
  product,
  quantity,
  onCartClose,
  compact = false,
}: {
  productId: number;
  product: Product;
  quantity: number;
  onCartClose?: () => void;
  compact?: boolean;
}) {
  const { removeItem } = useCartStore();

  return (
    <div className="flex pb-4 pt-4 border-b last:border-b-0">
      <Link
        href={`/product/${productId}`}
        onClick={onCartClose}
        className={`relative ${compact ? "size-28" : "size-32"} rounded-md overflow-hidden flex-shrink-0`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 112px, 128px"
        />
      </Link>
      <div
        className={`${compact ? "ml-2" : "ml-4"} flex-grow flex flex-col ${compact ? "sm:gap-1" : "gap-1"}`}
      >
        <h4 className="font-medium">{product.name}</h4>
        <div className="flex items-center">
          <Badge variant={!product.inStock ? "destructive" : "secondary"}>
            {product.inStock ? "In stock" : "Out of stock"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {product.discount && product.discount > 0 ? (
            <>
              <p className="font-medium">{product.price} €</p>
              <p className="text-muted-foreground text-sm line-through">
                {Math.round((product.price * 100) / (100 - product.discount))} €
              </p>
              <Badge variant={"default"} className="py-1 px-2 text-xs">
                -{product.discount}%
              </Badge>
            </>
          ) : (
            <p className="font-medium">{product.price} €</p>
          )}
        </div>
        <div className="flex justify-between items-center mt-1">
          <ProductQuantity
            product={product}
            quantity={quantity}
            mode="cart"
            productId={productId}
          />
          <Button
            variant="outline"
            size="icon"
            className="size-9 text-muted-foreground border-destructive"
            onClick={() => {
              toast.info(product.name, {
                description: "Product removed from cart",
              });
              removeItem(productId);
            }}
          >
            <Trash2Icon className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
}
