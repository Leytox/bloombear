import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h1 className="text-4xl font-bold">Order Not Found</h1>
      <p className="text-muted-foreground text-center max-w-md">
        The order you&apos;re looking for doesn&apos;t exist or has been deleted.
      </p>
      <Button asChild>
        <Link href="/orders">Back to Orders</Link>
      </Button>
    </div>
  );
} 