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
import { PencilIcon, Loader2Icon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getProductDetails, updateProduct } from "@/actions/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Category, Occasion, Product } from "@prisma/client";
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

interface EditProductDialogProps {
  product: Product;
  categories: Category[];
  occasions: Occasion[];
  onSaveAction: (product: Product) => void;
}

export default function EditProductDialog({
  product,
  categories,
  occasions,
  onSaveAction,
}: EditProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description || "");
  const [price, setPrice] = useState(product.price.toString());
  const [discount, setDiscount] = useState(product.discount.toString());
  const [image, setImage] = useState(product.image || "");
  const [inStock, setInStock] = useState(product.inStock);
  const [categoryId, setCategoryId] = useState(
    product.categoryId ? product.categoryId.toString() : "",
  );
  const [selectedOccasions, setSelectedOccasions] = useState<number[]>([]);
  const [openOccasionsCombobox, setOpenOccasionsCombobox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setInitialLoading(true);
      getProductDetails(product.id)
        .then((details) => {
          if (details?.occasions)
            setSelectedOccasions(details.occasions.map((o: Occasion) => o.id));
        })
        .catch((error) => {
          console.error("Failed to fetch product details:", error);
        })
        .finally(() => {
          setInitialLoading(false);
        });
    }
  }, [open, product.id]);

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
      const updatedProduct = await updateProduct({
        id: product.id,
        name,
        description,
        price: parseFloat(price),
        discount: parseInt(discount) || 0,
        image,
        inStock,
        categoryId: parseInt(categoryId),
        rating: 0,
        occasionIds: selectedOccasions,
      });

      toast.success("Product updated successfully");
      setOpen(false);
      router.refresh();
      onSaveAction(updatedProduct);
    } catch (error) {
      toast.error("Failed to update product");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
        <Button variant="outline" size="icon">
          <PencilIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Make changes to the product</DialogDescription>
        </DialogHeader>
        {initialLoading ? (
          <div className="py-4 flex justify-center">
            <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isLoading}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Price (€)</Label>
                  <Input
                    id="edit-price"
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
                  <Label htmlFor="edit-discount">Discount (%)</Label>
                  <Input
                    id="edit-discount"
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
                        fill
                        sizes="10"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder.png";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
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
                                  : "opacity-50",
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
                <Label htmlFor="edit-inStock" className="cursor-pointer">
                  In Stock
                </Label>
                <Switch
                  id="edit-inStock"
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
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
