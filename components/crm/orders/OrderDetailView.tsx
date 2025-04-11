import {
  Order,
  OrderItem,
  OrderStatus,
  PaymentStatus,
  Product,
} from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import OrderStatusUpdate from "./OrderStatusUpdate";
import { CldImage } from "next-cloudinary";

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

export default function OrderDetailView({ order }: { order: OrderWithItems }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <p className="text-muted-foreground">
            Created on {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="flex gap-2">
          <OrderStatusUpdate order={order} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Status
              </div>
              <Badge className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Payment Status
              </div>
              <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                {order.paymentStatus}
              </Badge>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Payment Method
              </div>
              <div>{order.paymentMethod}</div>
            </div>
            {order.paymentIntentId && (
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Payment ID
                </div>
                <div className="text-xs truncate">{order.paymentIntentId}</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Name
              </div>
              <div>{order.customerName}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Email
              </div>
              <div>{order.customerEmail}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Phone
              </div>
              <div>{order.customerPhone}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Area
              </div>
              <div>{order.deliveryArea}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Address
              </div>
              <div>{order.deliveryAddress}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Date & Time
              </div>
              <div>
                {formatDate(order.deliveryDate)} - {order.deliveryTime}
              </div>
            </div>
            {order.comment && (
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Comment
                </div>
                <div className="text-sm">{order.comment}</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
          <CardDescription>
            Total: €{order.totalAmount.toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                {item.product?.image && (
                  <div className="relative h-20 w-20 overflow-hidden rounded-md flex-shrink-0">
                    <CldImage
                      fill
                      sizes="20"
                      src={item.product.image}
                      alt={item.product?.name || "Product image"}
                      className="object-cover h-full w-full"
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h4 className="font-medium text-lg">
                        {item.product?.name || "Unknown Product"}
                      </h4>
                      <div className="text-muted-foreground">
                        {item.quantity} × €{item.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="font-medium text-lg">
                      €{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                  {item.product?.description && (
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                      {item.product.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <Separator />
            <div className="flex items-center justify-between font-medium text-lg">
              <div>Total</div>
              <div>€{order.totalAmount.toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
