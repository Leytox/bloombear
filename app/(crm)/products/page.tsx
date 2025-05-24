import { getProducts } from "@/actions/product";
import { getCategories } from "@/actions/category";
import { getOccasions } from "@/actions/occasions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddProductDialog from "@/components/crm/products/AddProductDialog";
import ProductTable from "@/components/crm/products/ProductTable";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Products() {
  const [products, categories, occasions] = await Promise.all([
    getProducts(),
    getCategories(),
    getOccasions(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your flower arrangements and bouquets
          </p>
        </div>
        <AddProductDialog categories={categories} occasions={occasions} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>
            {products?.length} {products?.length === 1 ? "product" : "products"}{" "}
            total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<ProductTableSkeleton />}>
            <ProductTable
              initialProducts={products}
              categories={categories}
              occasions={occasions}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

function ProductTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    </div>
  );
}
