"use client";

import { Category, Occasion, Product } from "@/generated/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  SearchIcon,
  ImageIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  LayoutListIcon,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import EditProductDialog from "@/components/crm/products/EditProductDialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CldImage } from "next-cloudinary";

interface ProductTableProps {
  initialProducts: Product[] | undefined | null;
  categories: Category[] | undefined | null;
  occasions: Occasion[] | undefined | null;
}

export default function ProductTable({
  initialProducts,
  categories,
  occasions,
}: ProductTableProps) {
  const [products, setProducts] = useState<Product[] | undefined | null>(
    initialProducts
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ||
      product.categoryId === parseInt(categoryFilter);
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "inStock" && product.inStock) ||
      (stockFilter === "outOfStock" && !product.inStock);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const updateProduct = (updatedProduct: Product) => {
    setProducts(
      products?.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const getCategoryName = (categoryId: number | null) => {
    if (!categoryId) return "Uncategorized";
    const category = categories?.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stock</SelectItem>
              <SelectItem value="inStock">In Stock</SelectItem>
              <SelectItem value="outOfStock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.image ? (
                      <div className="relative h-12 w-12 rounded-md overflow-hidden">
                        <CldImage
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      {product.discount > 0 && (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200 mt-1"
                        >
                          {product.discount}% OFF
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{product.price} €</div>
                    {product.discount > 0 && (
                      <div className="text-sm text-muted-foreground line-through">
                        {Math.round(
                          product.price * (1 + product.discount / 100)
                        )}{" "}
                        €
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 w-fit"
                    >
                      <LayoutListIcon className="h-3 w-3" />
                      {getCategoryName(product.categoryId)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.inStock ? (
                      <Badge
                        variant="default"
                        className="flex items-center gap-1 w-fit"
                      >
                        <CheckCircleIcon className="h-3.5 w-3.5" />
                        In Stock
                      </Badge>
                    ) : (
                      <Badge
                        variant="destructive"
                        className="flex items-center gap-1 w-fit"
                      >
                        <AlertCircleIcon className="h-3.5 w-3.5" />
                        Out of Stock
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <EditProductDialog
                        product={product}
                        categories={categories}
                        occasions={occasions}
                        onSaveAction={updateProduct}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
