"use client";

import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { ImageIcon, Loader2Icon } from "lucide-react";
import { uploadImage } from "@/actions/upload";
import { toast } from "sonner";
import { CldImage } from "next-cloudinary";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  disabled = false,
}: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadImage(formData);
      if (result.success && result.url) {
        onChange(result.url);
        toast.success("Image uploaded successfully");
      } else {
        toast.error(result.error || "Failed to upload image");
      }
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor="image">Image</Label>
      <div className="flex gap-2">
        <Input
          id="image"
          type="text"
          placeholder="Image URL"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isLoading || disabled}
        />
        <div className="relative">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            disabled={isLoading || disabled}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("file-upload")?.click()}
            disabled={isLoading || disabled}
          >
            {isLoading ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              <ImageIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      {value && (
        <div className="relative h-40 w-full rounded-md overflow-hidden">
          <CldImage
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.png";
            }}
          />
        </div>
      )}
    </div>
  );
}
