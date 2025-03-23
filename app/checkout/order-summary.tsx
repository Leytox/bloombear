"use client";

import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/useCartStore";
import { ArrowRightIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderSummary() {
  const { cart } = useCartStore();
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalWithDelivery, setTotalWithDelivery] = useState(
    cart.totalPrice + deliveryCost,
  );

  useEffect(() => {
    setDeliveryCost(
      cart.totalPrice >= 250 ? 0 : Math.floor(cart.totalPrice / 4),
    );
    setTotalWithDelivery(cart.totalPrice + deliveryCost);
  }, [cart, deliveryCost]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Order</span>
          <span className="text-sm font-normal text-muted-foreground">
            {cart.totalItems} {cart.totalItems === 1 ? "item" : "items"}
          </span>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-2 pt-0">
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow text-center">
            <ShoppingCartIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Add items from the catalog
            </p>
            <Button>
              <Link href="/catalog">
                Go to catalog <ArrowRightIcon />
              </Link>
            </Button>
          </div>
        ) : (
          <div>
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
                    compact={true}
                  />
                ))}
            </div>

            <Separator />

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span>{cart.totalPrice} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span>{deliveryCost === 0 ? "Free" : `${deliveryCost} €`}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{totalWithDelivery} €</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
