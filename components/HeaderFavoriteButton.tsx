"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { FavoritesSheet } from "./FavoritesSheet";

export default function HeaderFavoriteButton() {
  const [open, setOpen] = useState<boolean>(false);
  const favorites = useFavoriteStore((state) => state.favorites);

  return (
    <>
      <Button
        title="Favorites"
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setOpen(true)}
      >
        <HeartIcon />
        {favorites.items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full size-5 flex items-center justify-center text-xs font-bold">
            {favorites.items.length}
          </span>
        )}
      </Button>
      <FavoritesSheet open={open} setOpenAction={setOpen} />
    </>
  );
}
