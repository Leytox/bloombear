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
import { PencilIcon, Loader2Icon, ImageIcon } from "lucide-react";
import { useState } from "react";
import { updateCategory } from "@/actions/category";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface EditCategoryDialogProps {
  category: Category;
  onSaveAction: (category: Category) => void;
}

export default function EditCategoryDialog({
  category,
  onSaveAction,
}: EditCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [image, setImage] = useState(category.image);
  const [imagePreview, setImagePreview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setIsLoading(true);
    try {
      const updatedCategory = await updateCategory({
        id: category.id,
        name,
        description,
        image,
      });

      toast.success("Category updated successfully");
      setOpen(false);
      router.refresh();
      onSaveAction(updatedCategory);
    } catch (error) {
      toast.error("Failed to update category");
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Make changes to the category</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Enter category description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-image">Image</Label>
              <div className="flex gap-2">
                <Input
                  id="edit-image"
                  placeholder="Enter category image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant={imagePreview ? "default" : "outline"}
                  onClick={() => setImagePreview((prev) => !prev)}
                >
                  <ImageIcon />
                </Button>
              </div>
              {imagePreview && (
                <Image
                  src={image}
                  alt="Category Image"
                  width={200}
                  height={200}
                  className="rounded-md"
                />
              )}
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
                  <Loader2Icon className="h-4 w-4 animate-spin" />
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
