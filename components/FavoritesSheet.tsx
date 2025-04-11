"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, HeartIcon, Trash2Icon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { Product } from "@prisma/client";
import AddToCartButton from "./AddToCartButton";
import { Badge } from "./ui/badge";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Separator } from "./ui/separator";
import { CldImage } from "next-cloudinary";

export function FavoritesSheet({
  open,
  setOpenAction,
}: {
  open: boolean;
  setOpenAction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { favorites, removeFavorite } = useFavoriteStore();

  return (
    <Sheet open={open} onOpenChange={setOpenAction}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex text-xl items-center gap-2">
            <HeartIcon size={24} />
            Favorites
          </SheetTitle>
          <SheetDescription>
            {favorites.items.length}{" "}
            {favorites.items.length === 1 ? "item" : "items"}
          </SheetDescription>
          <Separator className="mt-2 -mb-2" />
        </SheetHeader>
        {favorites.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[80vh]">
            <HeartIcon className="text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Favorites list is empty</p>
            <p className="text-muted-foreground mb-6 text-center">
              Add products to favorites to see them here
            </p>
            <Link href="/catalog">
              <Button>
                Go to Catalog <ArrowRightIcon />
              </Button>
            </Link>
          </div>
        ) : (
          <ScrollArea className="h-[85vh] p-2">
            <div className="flex flex-col gap-2">
              {favorites.items.map((product: Product) => (
                <Card key={product.id} className="overflow-hidden py-2">
                  <CardContent className="p-0">
                    <div className="flex gap-3 p-2">
                      <div className="size-32 relative rounded-md overflow-hidden flex-shrink-0">
                        <Link
                          href={`/product/${product.id}`}
                          onClick={() => setOpenAction(false)}
                        >
                          <CldImage
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </Link>
                      </div>

                      <div className="flex-1 min-w-0 gap-1 flex flex-col">
                        <h3 className="font-medium leading-tight line-clamp-2">
                          {product.name}
                        </h3>
                        <Badge
                          variant={
                            !product.inStock ? "destructive" : "secondary"
                          }
                        >
                          {!product.inStock ? "In stock" : "In stock"}
                        </Badge>
                        <div className="flex gap-1">
                          <p className="text-lg font-semibold">
                            {product.price} €
                          </p>
                          {product.discount > 0 && (
                            <Badge variant={"default"} className="px-2 text-xs">
                              -{product.discount}%
                            </Badge>
                          )}
                        </div>

                        <div className="flex gap-2 mt-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="w-full">
                                  <AddToCartButton
                                    product={product}
                                    quantity={1}
                                  />
                                </div>
                              </TooltipTrigger>
                              {!product.inStock && (
                                <TooltipContent>
                                  <p>Product is out of stock</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                          <Button
                            variant="outline"
                            className="text-destructive border-destructive"
                            size="icon"
                            onClick={() => {
                              removeFavorite(product.id);
                              toast.info("Product removed from favorites");
                            }}
                          >
                            <Trash2Icon className="h-8 w-8" size={96} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}
