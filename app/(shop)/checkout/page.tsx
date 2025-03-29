"use client";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { CheckCircleIcon, ArrowRightIcon, ShoppingBagIcon } from "lucide-react";
import CheckoutForm from "./checkout-form";
import OrderSummary from "./order-summary";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CheckoutPage() {
  const { cart } = useCartStore();

  if (!cart.items.length)
    return (
      <main className="container min-h-[calc(100vh-68px)] flex items-center justify-center mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8">
        <div className="text-center py-6">
          <ShoppingBagIcon className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="font-medium text-xl mb-1">Your cart is empty</h3>
          <p className="text-base text-muted-foreground mb-4">
            Add items to your cart to place an order
          </p>
          <Button asChild>
            <Link href="/catalog">
              Go to catalog <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    );

  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/checkout">Checkout</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <CheckoutForm />
            </CardContent>
          </Card>
        </div>

        <div>
          <OrderSummary />
          <Card className="mt-6 bg-muted/50">
            <CardContent>
              <h3 className="font-medium text-lg mb-4 flex items-start gap-2">
                <CheckCircleIcon className="h-5 w-5 mt-1 flex-shrink-0" />
                <span>Our Guarantees</span>
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Guarantee freshness of flowers up to 7 days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Free replacement if quality is not satisfactory</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Confidentiality of your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Safe and convenient payment</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
