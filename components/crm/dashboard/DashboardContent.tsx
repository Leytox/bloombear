"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  PackageIcon,
  EuroIcon,
  ShoppingCartIcon,
  CalendarIcon,
  ScaleIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "lucide-react";
import { Order, Product } from "@/generated/prisma";
import { CldImage } from "next-cloudinary";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
type DashboardData = {
  metrics: {
    totalRevenue: number | undefined;
    totalOrders: number | undefined;
    totalProducts: number | undefined;
    revenueThisMonth: number | undefined;
    ordersThisMonth: number | undefined;
    revenueGrowth: number | undefined;
    ordersGrowth: number | undefined;
    outOfStockProducts: number | undefined;
  };
  recentOrders: Order[] | undefined;
  topRatedProducts: Product[] | undefined;
};

export default function DashboardContent({ data }: { data: DashboardData }) {
  const { metrics, recentOrders, topRatedProducts } = data;

  return (
    <div className="container py-10 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`€${metrics.totalRevenue?.toLocaleString()}`}
          icon={<EuroIcon size={36} />}
          change={metrics.revenueGrowth || 0}
          trend={
            metrics.revenueGrowth && metrics.revenueGrowth > 0
              ? "up"
              : metrics.revenueGrowth && metrics.revenueGrowth < 0
                ? "down"
                : "stable"
          }
        />
        <MetricCard
          title="Total Orders"
          value={metrics.totalOrders?.toString() || "0"}
          icon={<ShoppingCartIcon size={36} />}
          change={metrics.ordersGrowth || 0}
          trend={
            metrics.ordersGrowth && metrics.ordersGrowth > 0
              ? "up"
              : metrics.ordersGrowth && metrics.ordersGrowth < 0
                ? "down"
                : "stable"
          }
        />
        <MetricCard
          title="This Month"
          value={`€${metrics.revenueThisMonth?.toLocaleString()}`}
          icon={<CalendarIcon size={36} />}
          subtitle={`${metrics.ordersThisMonth} orders`}
        />
        <MetricCard
          title="Products"
          value={metrics.totalProducts?.toString() || "0"}
          icon={<PackageIcon size={36} />}
          subtitle={`${metrics.outOfStockProducts} out of stock`}
        />
      </div>

      {/* Recent orders */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <Card className="overflow-hidden py-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y">
                {recentOrders?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-4 text-center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  recentOrders?.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        ${order.totalAmount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Top rated products */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Top Rated Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRatedProducts && topRatedProducts.length > 0 ? (
            topRatedProducts.map((product: Product) => (
              <Card
                key={product.id}
                className="pt-0 overflow-hidden flex flex-col"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <CldImage
                    height={500}
                    width={500}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold truncate">{product.name}</h3>
                  <div className="text-sm text-muted-foreground mb-2">
                    Rating: {product.rating.toFixed(1)} ★
                  </div>
                  <div className="mt-auto flex justify-between items-center">
                    <span className="font-medium">
                      €{product.price.toLocaleString()}
                    </span>
                    <span
                      className={`text-sm ${
                        product.inStock ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center text-muted-foreground">
              No products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper components
type MetricCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: number;
  trend?: "up" | "down" | "stable";
  subtitle?: string;
};

function MetricCard({
  title,
  value,
  icon,
  change,
  trend,
  subtitle,
}: MetricCardProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {trend === "up" ? (
                <ArrowUpIcon className="mr-2" />
              ) : trend === "down" ? (
                <ArrowDownIcon className="mr-2" />
              ) : (
                <ScaleIcon className="mr-2" />
              )}
              <span
                className={`text-sm ${
                  trend === "up"
                    ? "text-green-500"
                    : trend === "down"
                      ? "text-red-500"
                      : null
                }`}
              >
                {Math.abs(change).toFixed(1)}%
              </span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-full bg-primary/10">{icon}</div>
      </div>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  let color;
  switch (status) {
    case "COMPLETED":
      color = "bg-green-100 text-green-800";
      break;
    case "PROCESSING":
      color = "bg-blue-100 text-blue-800";
      break;
    case "PENDING":
      color = "bg-yellow-100 text-yellow-800";
      break;
    case "CANCELLED":
      color = "bg-red-100 text-red-800";
      break;
    default:
      color = "bg-gray-100 text-gray-800";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
    >
      {status.toLowerCase()}
    </span>
  );
}
