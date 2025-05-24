"use client";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ShoppingCartIcon } from "lucide-react";
import { Product } from "@/generated/prisma";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

export default function AddToCartButton({
  product,
  quantity = 1,
}: {
  product: Product;
  quantity: number;
}) {
  const { addItem, openCart, isItemInCart } = useCartStore();

  function handleAddToCart() {
    if (isItemInCart(product.id)) {
      openCart();
    } else {
      toast.info("Product added to cart", {
        description: product.name,
        action: {
          label: (
            <h1 className="flex items-center">
              Cart <ArrowRightIcon size={12} />
            </h1>
          ),
          onClick: openCart,
        },
      });
      addItem(product, quantity || 1);
    }
  }

  return (
    <Button
      disabled={!product.inStock}
      className="flex-1 w-full"
      onClick={handleAddToCart}
      variant={isItemInCart(product.id) ? "outline" : "default"}
      title={isItemInCart(product.id) ? "Go to cart" : "Add to cart"}
    >
      <ShoppingCartIcon className="mr-2 size-4" />
      {isItemInCart(product.id) ? "In cart" : "Add to cart"}
    </Button>
  );
}
