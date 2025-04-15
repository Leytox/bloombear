"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthHeader() {
  const router = useRouter();
  return (
    <header>
      <div className="fixed top-4 left-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeftIcon />
        </Button>
      </div>
    </header>
  );
}
