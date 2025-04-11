"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  ArrowUp,
  ArrowDown,
  Package,
  DollarSign,
  ShoppingCart,
  Calendar,
} from "lucide-react";
import { Order, Product } from "@prisma/client";
import Image from "next/image";

type DashboardData = {
  metrics: {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    revenueThisMonth: number;
    ordersThisMonth: number;
    revenueGrowth: number;
    ordersGrowth: number;
    outOfStockProducts: number;
  };
  recentOrders: Order[];
  topRatedProducts: Product[];
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
          value={`$${metrics.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-8 w-8 text-green-500" />}
          change={metrics.revenueGrowth}
          trend={metrics.revenueGrowth >= 0 ? "up" : "down"}
        />
        <MetricCard
          title="Total Orders"
          value={metrics.totalOrders.toString()}
          icon={<ShoppingCart className="h-8 w-8 text-blue-500" />}
          change={metrics.ordersGrowth}
          trend={metrics.ordersGrowth >= 0 ? "up" : "down"}
        />
        <MetricCard
          title="This Month"
          value={`$${metrics.revenueThisMonth.toLocaleString()}`}
          icon={<Calendar className="h-8 w-8 text-purple-500" />}
          subtitle={`${metrics.ordersThisMonth} orders`}
        />
        <MetricCard
          title="Products"
          value={metrics.totalProducts.toString()}
          icon={<Package className="h-8 w-8 text-orange-500" />}
          subtitle={`${metrics.outOfStockProducts} out of stock`}
        />
      </div>

      {/* Recent orders */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="py-3 px-4 text-left font-medium">Order ID</th>
                  <th className="py-3 px-4 text-left font-medium">Customer</th>
                  <th className="py-3 px-4 text-left font-medium">Date</th>
                  <th className="py-3 px-4 text-left font-medium">Amount</th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/50">
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4">{order.customerName}</td>
                    <td className="py-3 px-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      ${order.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Top rated products */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Top Rated Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRatedProducts.map((product) => (
            <Card
              key={product.id}
              className="pt-0 overflow-hidden flex flex-col"
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
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
          ))}
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
  trend?: "up" | "down";
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
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={`text-sm ${
                  trend === "up" ? "text-green-500" : "text-red-500"
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
