"use client";

import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Product } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";

interface ProductQuantityProps {
  product: Product;
  quantity: number;
  mode: "local" | "cart";
  // For local state mode
  setQuantityAction?: React.Dispatch<React.SetStateAction<number>>;
  // For cart store mode
  productId?: number;
}

export default function ProductQuantity({
  product,
  quantity,
  mode,
  setQuantityAction,
  productId,
}: ProductQuantityProps) {
  const { updateQuantity } = useCartStore();

  function handleQuantityChange(newQuantity: number) {
    if (newQuantity > 50) {
      toast.error("Maximum quantity allowed is 50", {
        description: "Please enter a quantity between 1 and 50",
      });
      return;
    }

    if (newQuantity < 1) {
      toast.error("Minimum quantity allowed is 1", {
        description: "Please enter a quantity between 1 and 50",
      });
      return;
    }

    if (mode === "local" && setQuantityAction) setQuantityAction(newQuantity);
    else if (mode === "cart" && productId !== undefined)
      updateQuantity(productId, newQuantity);
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        title="Decrease quantity"
        variant="outline"
        size="icon"
        className="size-9"
        onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1 || !product.inStock}
      >
        <MinusIcon className={mode === "local" ? "h-4 w-4" : "h-3 w-3"} />
      </Button>
      <Input
        type="number"
        min={1}
        max={50}
        value={quantity}
        disabled={!product.inStock}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          handleQuantityChange(value);
        }}
        onBlur={(e) => {
          const value = parseInt(e.target.value);
          if (isNaN(value)) {
            handleQuantityChange(1);
            return;
          }
        }}
        className="w-12 text-center text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <Button
        title="Increase quantity"
        variant="outline"
        size="icon"
        className="size-9"
        onClick={() => handleQuantityChange(quantity + 1)}
        disabled={!product.inStock}
      >
        <PlusIcon className={mode === "local" ? "size-4" : "size-3"} />
      </Button>
    </div>
  );
}
