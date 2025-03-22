"use client";

import { ClipboardCopyIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function CopyLinkButton({ text }: { text: string }) {
  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    toast.info("Link copied", {
      description: "Product link copied to clipboard",
    });
  }

  return (
    <Button
      variant="outline"
      size={text ? "lg" : "icon"}
      onClick={handleCopyLink}
    >
      <ClipboardCopyIcon /> {text}
    </Button>
  );
}
