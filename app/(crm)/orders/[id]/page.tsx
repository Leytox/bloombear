import { getOrderById } from "@/actions/order";
import { Order, OrderItem, Product } from "@/generated/prisma";
import OrderDetailView from "@/components/crm/orders/OrderDetailView";
import { notFound } from "next/navigation";

// Define the type that matches Prisma's return
type OrderWithItems = Order & {
  items: Array<
    OrderItem & {
      product: Product | null;
    }
  >;
};

export default async function OrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orderId = parseInt(id);

  if (isNaN(orderId)) notFound();

  const order = (await getOrderById(orderId)) as OrderWithItems;

  if (!order) notFound();

  return <OrderDetailView order={order} />;
}
