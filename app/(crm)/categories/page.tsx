import { getCategories } from "@/actions/category";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CategoryTable from "@/components/crm/categories/category-table";
import AddCategoryDialog from "@/components/crm/categories/add-category-dialog";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Categories() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage categories for your flower arrangements
          </p>
        </div>
        <AddCategoryDialog />
      </div>
      <Card>
        <CardHeader className="flex flex-row w-full justify-between">
          <div>
            <CardTitle>All Categories</CardTitle>
            <CardDescription>
              {categories.length}{" "}
              {categories.length === 1 ? "category" : "categories"} total
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<CategoryTableSkeleton />}>
            <CategoryTable initialCategories={categories} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

function CategoryTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}
