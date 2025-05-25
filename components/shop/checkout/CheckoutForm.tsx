"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";
import { BanknoteIcon, CalendarIcon, Loader2Icon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { createPaymentIntent, CheckoutFormData } from "@/actions/payment";
import StripeProvider from "@/components/StripeProvider";
import StripeCheckoutForm from "@/components/CheckoutForm";
import { format } from "date-fns";
import { createOrder } from "@/actions/order";

const phoneRegex = /^\+?[0-9]{10,15}$/;

const formSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "Name is required",
    }),
    phone: z.string().regex(phoneRegex, {
      message: "Please enter a valid phone number",
    }),
    email: z.string().email({
      message: "Input a valid email",
    }),
    place: z.string().min(1, {
      message: "Delivery location is required",
    }),
    locationDetails: z.string().optional(),
    address: z.string().min(5, {
      message: "Address is required",
    }),
    deliveryDate: z.date({
      required_error: "Delivery date is required",
    }),
    deliveryTime: z.string().min(1, {
      message: "Delivery time is required",
    }),
    paymentMethod: z.enum(["card", "cash", "online"]),
    comment: z.string().optional(),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: "Agreement with terms is required" }),
    }),
  })
  .refine(
    (data) => {
      if (
        data.place === "Nearby Berlin" &&
        (!data.locationDetails || data.locationDetails.trim() === "")
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Please provide details about your location",
      path: ["locationDetails"],
    }
  );

export default function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showStripeForm, setShowStripeForm] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const { cart, clearItems } = useCartStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      place: "Berlin",
      locationDetails: "",
      address: "",
      deliveryTime: "10:00-14:00",
      paymentMethod: "online",
      comment: "",
      agreeToTerms: true,
    },
  });

  const watchPlace = form.watch("place");
  const watchPaymentMethod = form.watch("paymentMethod");

  const getDeliveryPrice = useCallback(
    (place: string): number => {
      return cart.totalPrice >= 250 && place === "Berlin"
        ? 0
        : (place === "Berlin" ? 0 : place === "Berlin Outskirts" ? 10 : 20) +
            cart.totalPrice / 4;
    },
    [cart.totalPrice]
  );

  useEffect(() => {
    const fee = getDeliveryPrice(watchPlace);
    setDeliveryFee(fee);

    const calculatedTotal = fee + cart.totalPrice;

    setTotalPrice(calculatedTotal);
  }, [watchPlace, cart.totalPrice, getDeliveryPrice]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (cart.items.length === 0) {
      toast.error("Your cart is empty", {
        description: "Add items to your cart before placing an order",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedValues: CheckoutFormData = {
        ...values,
        deliveryDate:
          values.deliveryDate instanceof Date
            ? values.deliveryDate.toISOString()
            : String(values.deliveryDate),
        deliveryAddress: values.address,
        deliveryArea: values.place,
      };

      // If payment method is cash or card, skip Stripe and go straight to success
      if (values.paymentMethod === "cash" || values.paymentMethod === "card") {
        // Here you would typically save the order to your database
        // without processing payment through Stripe
        await createOrder({
          customerName: formattedValues.fullName,
          customerEmail: formattedValues.email,
          customerPhone: formattedValues.phone,
          deliveryArea: formattedValues.deliveryArea,
          deliveryAddress: formattedValues.deliveryAddress,
          deliveryDate: formattedValues.deliveryDate,
          deliveryTime: formattedValues.deliveryTime,
          paymentMethod: formattedValues.paymentMethod,
          comment: formattedValues.comment,
          totalAmount: totalPrice,
          items: cart.items,
        });
        clearItems();
        toast.success("Order successfully created!", {
          description: "We will contact you shortly to confirm your order",
        });
        router.push("/checkout/success");
        return;
      }

      // Only create payment intent for online payments
      const result = await createPaymentIntent(
        cart.items,
        totalPrice, // Use calculated total with delivery fee
        formattedValues
      );

      if (!result.success) {
        throw new Error(result.error || "Error creating payment intent");
      }

      // Set the client secret and show Stripe form
      setClientSecret(result.clientSecret!);
      setShowStripeForm(true);
    } catch (error) {
      console.error("Payment setup error:", error);
      toast.error("Payment processing failed", {
        description: "Please try again or contact support",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handlePaymentSuccess = () => {
    clearItems();
    toast.success("Order successfully placed!", {
      description: "We will contact you shortly to confirm your order",
    });
    router.push("/checkout/success");
  };

  // Get today's date for the min date of the date picker
  const today = new Date();
  // Get date 14 days from now for the max date
  const twoWeeksLater = new Date();
  twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);

  return (
    <>
      {showStripeForm && clientSecret ? (
        <div className="space-y-6">
          <h3 className="text-xl font-medium">Payment Details</h3>
          <StripeProvider>
            <StripeCheckoutForm
              clientSecret={clientSecret}
              onSuccessAction={handlePaymentSuccess}
              amount={totalPrice}
              currency="EUR"
            />
          </StripeProvider>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Contact Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+49 123 456 7890"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@email.de"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Delivery Location</h3>

              <FormField
                control={form.control}
                name="place"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Area</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select delivery area" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Berlin">Berlin</SelectItem>
                        <SelectItem value="Berlin Outskirts">
                          Berlin Outskirts (+10€)
                        </SelectItem>
                        <SelectItem value="Nearby Berlin">
                          Nearby Berlin (+20€)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchPlace === "Nearby Berlin" && (
                <FormField
                  control={form.control}
                  name="locationDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide specific details about your location"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Street, house, apartment"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Delivery Date and Time</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < today || date > twoWeeksLater
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliveryTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="10:00-14:00">
                            10:00-14:00
                          </SelectItem>
                          <SelectItem value="12:00-16:00">
                            12:00-16:00
                          </SelectItem>
                          <SelectItem value="14:00-18:00">
                            14:00-18:00
                          </SelectItem>
                          <SelectItem value="16:00-20:00">
                            16:00-20:00
                          </SelectItem>
                          <SelectItem value="18:00-22:00">
                            18:00-22:00
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Payment Method</h3>

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="online" id="online" />
                          <Label htmlFor="online">Online Payment</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cash" id="cash" />
                          <Label htmlFor="cash">Cash on Delivery</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card">Card on Delivery</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Order Summary Section */}
            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="font-medium text-lg">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{cart.totalPrice.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery ({watchPlace}):</span>
                  <span>{deliveryFee.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{totalPrice.toFixed(2)}€</span>
                </div>
                {watchPlace !== "Berlin" && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Note: Delivery outside Berlin always incurs a delivery fee
                  </p>
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Special instructions or information for the courier"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-1 space-y-0 py-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="inline-flex flex-wrap gap-1 text-sm">
                      I agree to the
                      <Link href="/terms" className="hover:underline">
                        terms of use
                      </Link>
                      and
                      <Link href="/privacy" className="hover:underline">
                        privacy policy
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      isSubmitting ||
                      cart.items.some((item) => item.product.inStock === false)
                    }
                    onSubmit={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <BanknoteIcon />
                        <p>
                          {watchPaymentMethod === "online"
                            ? "Continue to Payment"
                            : "Place Order"}
                        </p>
                      </div>
                    )}
                  </Button>
                </TooltipTrigger>
                {cart.items.some((item) => !item.product.inStock) && (
                  <TooltipContent>
                    <p>Some items in your cart are out of stock</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </form>
        </Form>
      )}
    </>
  );
}
