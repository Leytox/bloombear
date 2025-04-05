"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PencilIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { updateOccasion } from "@/actions/occasions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Occasion } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface EditOccasionDialogProps {
  occasion: Occasion;
  onSaveAction: (occasion: Occasion) => void;
}

export default function EditOccasionDialog({
  occasion,
  onSaveAction,
}: EditOccasionDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(occasion.name);
  const [description, setDescription] = useState(occasion.description || "");
  const [image, setImage] = useState(occasion.image || "");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Occasion name is required");
      return;
    }

    setIsLoading(true);
    try {
      const updatedOccasion = await updateOccasion({
        id: occasion.id,
        name,
        description,
        image,
      });

      toast.success("Occasion updated successfully");
      setOpen(false);
      router.refresh();
      onSaveAction(updatedOccasion);
    } catch (error) {
      toast.error("Failed to update occasion");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <PencilIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Occasion</DialogTitle>
          <DialogDescription>Make changes to the occasion</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                placeholder="Enter occasion name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Enter occasion description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="edit-image"
                  placeholder="https://example.com/image.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  disabled={isLoading}
                />
                {image && (
                  <div className="h-10 w-10 rounded-md overflow-hidden relative flex-shrink-0">
                    <Image
                      src={image}
                      alt="Preview"
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.png";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
