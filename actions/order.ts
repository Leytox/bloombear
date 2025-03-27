"use server";
import { PaymentStatus } from "@prisma/client";
import prisma from "@/lib/prisma";
import { CartItem } from "@/types";

type CreateOrderParams = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryArea: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTime: string;
  paymentMethod: string;
  paymentIntentId?: string;
  comment?: string;
  totalAmount: number;
  items: CartItem[];
};

export async function createOrder(data: CreateOrderParams) {
  try {
    // Create order with items
    const order = await prisma.order.create({
      data: {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        deliveryArea: data.deliveryArea,
        deliveryAddress: data.deliveryAddress,
        deliveryDate: new Date(data.deliveryDate),
        deliveryTime: data.deliveryTime,
        paymentMethod: data.paymentMethod,
        paymentStatus: PaymentStatus.PENDING,
        paymentIntentId: data.paymentIntentId,
        comment: data.comment,
        totalAmount: data.totalAmount,
        // Create order items
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function getOrderById(id: number) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function updateOrderPaymentStatus(
  orderId: number,
  paymentStatus: PaymentStatus,
  paymentIntentId?: string,
) {
  return prisma.order.update({
    where: { id: orderId },
    data: {
      paymentStatus,
      paymentIntentId,
    },
  });
}
