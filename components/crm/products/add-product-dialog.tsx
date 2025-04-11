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
import { Switch } from "@/components/ui/switch";
import { PlusIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { createProduct } from "@/actions/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Category, Occasion } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ImageUpload from "@/components/ui/image-upload";

interface AddProductDialogProps {
  categories: Category[];
  occasions: Occasion[];
}

export default function AddProductDialog({
  categories,
  occasions,
}: AddProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("0");
  const [image, setImage] = useState("");
  const [inStock, setInStock] = useState(true);
  const [categoryId, setCategoryId] = useState<string>("");
  const [selectedOccasions, setSelectedOccasions] = useState<number[]>([]);
  const [openOccasionsCombobox, setOpenOccasionsCombobox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Product name is required");
      return;
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      toast.error("Valid price is required");
      return;
    }

    setIsLoading(true);
    try {
      await createProduct({
        name,
        description,
        price: parseFloat(price),
        discount: parseInt(discount) || 0,
        image,
        inStock,
        categoryId: parseInt(categoryId),
        occasionIds: selectedOccasions,
      });
      toast.success("Product created successfully");
      setOpen(false);
      router.refresh();
      resetForm();
    } catch (error) {
      toast.error("Failed to create product");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setDiscount("0");
    setImage("");
    setInStock(true);
    setCategoryId("");
    setSelectedOccasions([]);
  };

  const handleOccasionSelect = (occasionId: number) => {
    setSelectedOccasions((current) => {
      if (current.includes(occasionId)) {
        return current.filter((id) => id !== occasionId);
      } else {
        return [...current, occasionId];
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Create a new product for your store
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price (€)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  step="0.01"
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  placeholder="0"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  min="0"
                  max="100"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <ImageUpload
                value={image}
                onChange={setImage}
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Occasions</Label>
              <Popover
                open={openOccasionsCombobox}
                onOpenChange={setOpenOccasionsCombobox}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openOccasionsCombobox}
                    className="justify-between"
                  >
                    {selectedOccasions.length > 0
                      ? `${selectedOccasions.length} selected`
                      : "Select occasions"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[300px]">
                  <Command>
                    <CommandInput
                      placeholder="Search occasions..."
                      className="h-9"
                    />
                    <CommandEmpty>No occasion found.</CommandEmpty>
                    <CommandGroup>
                      {occasions.map((occasion) => (
                        <CommandItem
                          key={occasion.id}
                          value={occasion.name}
                          onSelect={() => handleOccasionSelect(occasion.id)}
                        >
                          <div
                            className={cn(
                              "mr-2 h-4 w-4 border rounded-sm flex items-center justify-center",
                              selectedOccasions.includes(occasion.id)
                                ? "bg-primary border-primary"
                                : "opacity-50"
                            )}
                          >
                            {selectedOccasions.includes(occasion.id) && (
                              <span className="h-3 w-3 text-primary-foreground">
                                ✓
                              </span>
                            )}
                          </div>
                          {occasion.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              {selectedOccasions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedOccasions.map((id) => {
                    const occasion = occasions.find((o) => o.id === id);
                    return occasion ? (
                      <Badge
                        key={id}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {occasion.name}
                        <button
                          type="button"
                          className="ml-1 ring-offset-background rounded-full outline-none"
                          onClick={() => handleOccasionSelect(id)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">
                            Remove {occasion.name}
                          </span>
                        </button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="inStock" className="cursor-pointer">
                In Stock
              </Label>
              <Switch
                id="inStock"
                checked={inStock}
                onCheckedChange={setInStock}
                disabled={isLoading}
              />
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
                  Creating...
                </>
              ) : (
                "Create Product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
