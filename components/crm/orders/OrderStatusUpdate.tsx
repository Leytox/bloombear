"use client";

import { updateOrderStatus } from "@/actions/order";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Order, OrderStatus } from "@prisma/client";
import { useState } from "react";
import { Loader2Icon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderStatusUpdate({ order }: { order: Order }) {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleStatusChange = async () => {
    if (status === order.status) return;
    try {
      setIsLoading(true);
      await updateOrderStatus(order.id, status);
      toast.success("Status updated", {
        description: `Order #${order.id} status changed to ${status}`,
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Update failed", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Select
        value={status}
        onValueChange={(value) => setStatus(value as OrderStatus)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={OrderStatus.PENDING}>Pending</SelectItem>
          <SelectItem value={OrderStatus.PROCESSING}>Processing</SelectItem>
          <SelectItem value={OrderStatus.COMPLETED}>Completed</SelectItem>
          <SelectItem value={OrderStatus.CANCELLED}>Cancelled</SelectItem>
        </SelectContent>
      </Select>
      <Button
        onClick={handleStatusChange}
        disabled={status === order.status || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          <>
            <PencilIcon className="mr-2 h-4 w-4" />
            Update Status
          </>
        )}
      </Button>
    </div>
  );
}
