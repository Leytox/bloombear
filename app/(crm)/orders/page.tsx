import { getAllOrders } from "@/actions/order";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import {
  OrderStatus,
  PaymentStatus,
  Order,
  OrderItem,
  Product,
} from "@/generated/prisma";
import Image from "next/image";
import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FolderDownIcon } from "lucide-react";
import ExportOrdersDialog from "@/components/crm/orders/ExportOrdersDialog";
// Define the type that matches Prisma's return
type OrderWithItems = Order & {
  items: Array<
    OrderItem & {
      product: Product | null;
    }
  >;
};

function getStatusColor(status: OrderStatus) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "PROCESSING":
      return "bg-blue-100 text-blue-800";
    case "COMPLETED":
      return "bg-green-100 text-green-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getPaymentStatusColor(status: PaymentStatus) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "PAID":
      return "bg-green-100 text-green-800";
    case "FAILED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default async function Orders() {
  const orders = (await getAllOrders()) as OrderWithItems[];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-sm text-muted-foreground">
            {orders.length} orders found
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              title="Export orders to a file"
              disabled={orders.length === 0}
            >
              <FolderDownIcon />
              Export
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Export Orders</DialogTitle>
            </DialogHeader>
            <DialogDescription>Export all orders to a file.</DialogDescription>
            <DialogFooter>
              <ExportOrdersDialog />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>View and manage all customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.customerEmail}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>€{order.totalAmount}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={getPaymentStatusColor(order.paymentStatus)}
                      >
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        {order.items.length > 0 &&
                          order.items[0].product?.image && (
                            <div className="flex -space-x-2">
                              {order.items.slice(0, 3).map(
                                (item, idx) =>
                                  item.product?.image && (
                                    <div
                                      key={item.id}
                                      className="relative h-8 w-8 rounded-full overflow-hidden border border-background"
                                      style={{ zIndex: 3 - idx }}
                                    >
                                      <Image
                                        fill
                                        sizes="8"
                                        src={item.product.image}
                                        alt={item.product.name + " image"}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                  )
                              )}
                              {order.items.length > 3 && (
                                <div
                                  className="relative h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border border-background"
                                  style={{ zIndex: 0 }}
                                >
                                  +{order.items.length - 3}
                                </div>
                              )}
                            </div>
                          )}
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/orders/${order.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
