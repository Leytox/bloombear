"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRightIcon,
  BanknoteIcon,
  EraserIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import CartItem from "./CartItem";

export function CartSheet() {
  const { cart, isOpen, closeCart, clearItems } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent
        className="px-4 flex flex-col h-full w-full sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader className="px-1 -mb-4">
          <SheetTitle className="flex text-xl items-center gap-2">
            <ShoppingCartIcon size={24} />
            Cart
          </SheetTitle>
          <SheetDescription>
            {isNaN(cart.totalItems)
              ? "Some of items are out of stock"
              : `${cart.totalItems} ${cart.totalItems === 1 ? "item" : "items"} `}
          </SheetDescription>
        </SheetHeader>
        <Separator className="-mb-4" />
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow text-center">
            <ShoppingCartIcon className="text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Add items from the catalog
            </p>
            <Button onClick={closeCart} asChild>
              <Link href="/catalog">
                Go to catalog <ArrowRightIcon />{" "}
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-auto">
              {cart.items
                .sort((a, b) => {
                  if (a.product.inStock && !b.product.inStock) return -1;
                  if (!a.product.inStock && b.product.inStock) return 1;
                  return 0;
                })
                .map((item) => (
                  <CartItem
                    key={item.productId}
                    productId={item.productId}
                    product={item.product}
                    quantity={item.quantity}
                    onCartClose={closeCart}
                  />
                ))}
            </div>

            <div>
              <SheetFooter className="w-full flex flex-col">
                <div className="flex flex-col gap-1 w-full mb-2">
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>
                      {isNaN(cart.totalPrice)
                        ? "Uncorrect quantity"
                        : `${cart.totalPrice} €`}
                    </span>
                  </div>
                </div>
                <div className="w-full flex flex-col sm:flex-row justify-between gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="lg"
                        className="sm:w-auto w-full"
                      >
                        <EraserIcon /> Clear Cart
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Clear Cart</DialogTitle>
                        <DialogDescription>
                          All items will be removed from the cart.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-4">
                        <p>Are you sure you want to clear the cart?</p>
                        <div className="flex justify-end gap-4">
                          <Button
                            variant="destructive"
                            onClick={() => {
                              clearItems();
                              closeCart();
                            }}
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/checkout"
                          className="flex items-center gap-1"
                        >
                          <Button
                            size="lg"
                            className="sm:w-auto w-full"
                            disabled={cart.items.some(
                              (item) => !item.product.inStock,
                            )}
                            onClick={closeCart}
                          >
                            <BanknoteIcon /> Checkout
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      {cart.items.some((item) => !item.product.inStock) && (
                        <TooltipContent>
                          <p>Some items in your cart are out of stock</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
