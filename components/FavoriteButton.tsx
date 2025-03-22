"use client";

import { HeartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { Product } from "@prisma/client";
import { toast } from "sonner";

export default function FavoriteButton({ product }: { product: Product }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();

  function handleFavorite() {
    if (isFavorite(product.id)) {
      toast.info("Product removed from favorites", {
        cancel: {
          label: "Cancel",
          onClick: () => {
            addFavorite(product);
          },
        },
      });
      removeFavorite(product.id);
    } else {
      toast.success("Product added to favorites");
      addFavorite(product);
    }
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={handleFavorite}
      title={
        isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"
      }
    >
      {isFavorite(product.id) ? (
        <HeartIcon fill="red" stroke="red" strokeWidth={2} />
      ) : (
        <HeartIcon />
      )}
    </Button>
  );
}
