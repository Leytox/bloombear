import { getCategories } from "@/actions/category";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CategoryTable from "@/components/crm/categories/CategoryTable";
import AddCategoryDialog from "@/components/crm/categories/AddCategoryDialog";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Role } from "@prisma/client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Categories() {
  const session = await auth();
  if (session?.user?.role === Role.STAFF) redirect("/orders");
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
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription>
            {categories?.length}{" "}
            {categories?.length === 1 ? "category" : "categories"} total
          </CardDescription>
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
