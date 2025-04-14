import { getProducts } from "@/actions/product";
import { getAllOrders } from "@/actions/order";
import AnalyticsDashboard from "./AnalyticsDashboard";
import { Order, OrderItem, Product, Role } from "@prisma/client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type OrderWithItems = Order & {
  items: (OrderItem & {
    product: Product;
  })[];
};

export default async function AnalyticsPage() {
  const session = await auth();
  if (session?.user?.role === Role.STAFF) redirect("/orders");
  const products = await getProducts();
  const orders = (await getAllOrders()) as OrderWithItems[];

  // Calculate revenue by month
  const revenueByMonth = Array(12).fill(0);
  const ordersByMonth = Array(12).fill(0);

  orders.forEach((order) => {
    const month = new Date(order.createdAt).getMonth();
    revenueByMonth[month] += order.totalAmount;
    ordersByMonth[month]++;
  });

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const revenueData = monthNames.map((name, index) => ({
    name,
    revenue: revenueByMonth[index],
    orders: ordersByMonth[index],
  }));

  // Top selling products
  const productSales = new Map();

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const productId = item.productId;
      const currentSales = productSales.get(productId) || 0;
      productSales.set(productId, currentSales + item.quantity);
    });
  });

  const topProducts = [...productSales.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([productId, quantity]) => {
      const product = products?.find((p) => p.id === productId);
      return {
        name: product?.name || "Unknown Product",
        value: quantity,
      };
    });

  // Order status distribution
  const orderStatusCount = {
    PENDING: 0,
    PROCESSING: 0,
    COMPLETED: 0,
    CANCELLED: 0,
  };

  orders.forEach((order) => {
    orderStatusCount[order.status]++;
  });

  const orderStatusData = Object.entries(orderStatusCount).map(
    ([status, count]) => ({
      name: status,
      value: count,
    })
  );

  // Payment method distribution
  const paymentMethods = new Map();

  orders.forEach((order) => {
    const method = order.paymentMethod;
    const currentCount = paymentMethods.get(method) || 0;
    paymentMethods.set(method, currentCount + 1);
  });

  const paymentMethodData = [...paymentMethods.entries()].map(
    ([method, count]) => ({
      name: method,
      value: count,
    })
  );

  // Average order value over time
  const avgOrderValues = revenueData.map((item) => ({
    name: item.name,
    avgValue: item.orders > 0 ? item.revenue / item.orders : 0,
  }));

  const analyticsData = {
    revenueData,
    topProducts,
    orderStatusData,
    paymentMethodData,
    avgOrderValues,
  };

  return <AnalyticsDashboard data={analyticsData} />;
}
