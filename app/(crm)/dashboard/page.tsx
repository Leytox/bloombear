import { getAllOrders } from "@/actions/order";
import { getProducts } from "@/actions/product";
import DashboardContent from "./DashboardContent";

export default async function DashboardPage() {
  const orders = await getAllOrders();
  const products = await getProducts();

  // Calculate key metrics
  const totalRevenue = orders.length
    ? orders.reduce((sum, order) => sum + order.totalAmount, 0)
    : 0;
  const totalOrders = orders.length;
  const totalProducts = products.length;

  // Get recent orders
  const recentOrders = orders.slice(0, 5);

  // Calculate metrics for this month
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const ordersThisMonth = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return (
      orderDate.getMonth() === thisMonth && orderDate.getFullYear() === thisYear
    );
  });

  const revenueThisMonth = ordersThisMonth.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  // Calculate metrics for last month
  const lastMonthDate = new Date(thisYear, thisMonth - 1, 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastMonthYear = lastMonthDate.getFullYear();

  const ordersLastMonth = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return (
      orderDate.getMonth() === lastMonth &&
      orderDate.getFullYear() === lastMonthYear
    );
  });

  const revenueLastMonth = ordersLastMonth.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  // Calculate growth percentages
  const revenueGrowth =
    orders.length > 0 && lastMonthYear
      ? ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100
      : 0;
  const ordersGrowth =
    orders.length > 0 && ordersLastMonth.length
      ? ((ordersThisMonth.length - ordersLastMonth.length) /
          ordersLastMonth.length) *
        100
      : 0;

  // Products out of stock
  const outOfStockProducts = products.filter((product) => !product.inStock);

  // Top rated products
  const topRatedProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const dashboardData = {
    metrics: {
      totalRevenue,
      totalOrders,
      totalProducts,
      revenueThisMonth,
      ordersThisMonth: ordersThisMonth.length,
      revenueGrowth,
      ordersGrowth,
      outOfStockProducts: outOfStockProducts.length,
    },
    recentOrders,
    topRatedProducts,
  };

  return <DashboardContent data={dashboardData} />;
}
