"use client";
import AddToCartButton from "@/components/AddToCartButton";
import ProductQuantity from "@/components/ProductQuantity";
import { Product } from "@prisma/client";
import { useState } from "react";

export default function AddProduct({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-4 mb-6 w-full max-md:flex-col max-md:items-start">
      <ProductQuantity
        product={product}
        quantity={quantity}
        setQuantityAction={setQuantity}
        mode={"local"}
      />
      <AddToCartButton product={product} quantity={quantity} />
    </div>
  );
}
