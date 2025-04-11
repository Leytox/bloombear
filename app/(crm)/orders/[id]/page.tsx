import { getOrderById } from "@/actions/order";
import { Order, OrderItem, Product } from "@prisma/client";
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
  params: { id: string };
}) {
  const orderId = parseInt(params.id);

  if (isNaN(orderId)) notFound();

  const order = (await getOrderById(orderId)) as OrderWithItems;

  if (!order) notFound();

  return <OrderDetailView order={order} />;
}
