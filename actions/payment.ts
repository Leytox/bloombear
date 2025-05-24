"use server";

import Stripe from "stripe";
import { z, ZodFormattedError } from "zod";
import { formatAmountForStripe } from "@/lib/stripe";
import { CartItem } from "@/types";
import { createOrder, updateOrderPaymentStatus } from "./order";
import { PaymentStatus } from "@/generated/prisma";
// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

// Define a schema for validating the checkout data
const checkoutSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  phone: z.string().min(10),
  place: z.string().min(1),
  address: z.string().min(5),
  deliveryArea: z.string().min(1),
  deliveryAddress: z.string().min(1),
  deliveryDate: z.string(),
  deliveryTime: z.string().min(1),
  paymentMethod: z.enum(["card", "cash", "online"]),
  comment: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export async function createPaymentIntent(
  items: CartItem[],
  amount: number,
  customerDetails: CheckoutFormData
): Promise<{
  success: boolean;
  error?: string;
  details?: ZodFormattedError<CheckoutFormData>;
  clientSecret?: string | null;
  orderId?: number;
}> {
  try {
    // Validate the items array
    if (!items?.length) return { success: false, error: "No items in cart" };

    // Validate customer details
    const validationResult = checkoutSchema.safeParse(customerDetails);
    if (!validationResult.success) {
      return {
        success: false,
        error: "Invalid customer details",
        details: validationResult.error.format(),
      };
    }
    const orderResult = await createOrder({
      customerName: customerDetails.fullName,
      customerEmail: customerDetails.email,
      customerPhone: customerDetails.phone,
      deliveryArea: customerDetails.place,
      deliveryAddress: `${customerDetails.address}, ${customerDetails.place}`,
      deliveryDate: customerDetails.deliveryDate,
      deliveryTime: customerDetails.deliveryTime,
      paymentMethod: customerDetails.paymentMethod,
      comment: customerDetails.comment,
      totalAmount: amount,
      items: items,
    });

    if (!orderResult.success) {
      return { success: false, error: "Failed to create order" };
    }

    // Then create payment intent with order reference
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(amount),
      currency: "eur",
      metadata: {
        orderId: String(orderResult.orderId),
        // Other metadata as before...
      },
    });

    // Update order with payment intent ID
    await updateOrderPaymentStatus(
      orderResult.orderId!,
      PaymentStatus.PENDING,
      paymentIntent.id
    );

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      orderId: orderResult.orderId,
    };
  } catch (error) {
    console.error("Stripe error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error creating payment intent",
    };
  }
}

// Update the verifyPaymentIntent function to update order status
export async function verifyPaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // If we have an order ID in the metadata, update its status
    if (paymentIntent.metadata.orderId) {
      const orderId = parseInt(paymentIntent.metadata.orderId);
      await updateOrderPaymentStatus(
        orderId,
        paymentIntent.status === "succeeded"
          ? PaymentStatus.PAID
          : PaymentStatus.FAILED,
        paymentIntentId
      );
    }

    return {
      success: true,
      status: paymentIntent.status,
      isSuccessful: paymentIntent.status === "succeeded",
    };
  } catch (error) {
    console.error("Error verifying payment:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error verifying payment",
    };
  }
}
