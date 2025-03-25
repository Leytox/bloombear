"use server";

import Stripe from "stripe";
import { z } from "zod";
import { formatAmountForStripe } from "@/lib/stripe";
import { CartItem } from "@/types";

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
  deliveryDate: z.string(),
  deliveryTime: z.string().min(1),
  paymentMethod: z.enum(["card", "cash", "online"]),
  comment: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export async function createPaymentIntent(
  items: CartItem[],
  amount: number,
  customerDetails: CheckoutFormData,
) {
  try {
    // Validate the items array
    if (!items?.length) {
      return { success: false, error: "No items in cart" };
    }

    // Validate customer details
    const validationResult = checkoutSchema.safeParse(customerDetails);
    if (!validationResult.success) {
      return {
        success: false,
        error: "Invalid customer details",
        details: validationResult.error.format(),
      };
    }

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(amount),
      currency: "eur",
      // Save the order details in the metadata
      metadata: {
        email: customerDetails.email,
        name: customerDetails.fullName,
        phone: customerDetails.phone,
        address: `${customerDetails.address}, ${customerDetails.place}`,
        deliveryDate: customerDetails.deliveryDate,
        deliveryTime: customerDetails.deliveryTime,
        comment: customerDetails.comment || "",
        items: JSON.stringify(
          items.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
          })),
        ),
      },
    });

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
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

/**
 * Verifies a payment intent status
 */
export async function verifyPaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

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
