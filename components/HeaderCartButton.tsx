"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "./ui/button";
import { CartSheet } from "./CartSheet";

export default function HeaderCartButton() {
  const { cart, openCart } = useCartStore();

  return (
    <>
      <Button
        title="Cart"
        variant="ghost"
        size="icon"
        className="relative"
        onClick={openCart}
      >
        <ShoppingCart className="text-foreground" />
        {cart.totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs size-5 rounded-full flex items-center justify-center">
            {cart.totalItems}
          </span>
        )}
      </Button>
      <CartSheet />
    </>
  );
}
