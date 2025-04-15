"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, RotateCwIcon, ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen text-center">
      <AlertCircleIcon size={48} />
      <h2 className="text-4xl font-semibold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        {error.message || "An unexpected error occurred"}
      </p>
      <div className="flex gap-6">
        <Button onClick={() => reset()}>
          Try again <RotateCwIcon />
        </Button>
        <Button variant="outline" onClick={() => router.back()}>
          Go back <ArrowLeftIcon />
        </Button>
      </div>
    </div>
  );
}
