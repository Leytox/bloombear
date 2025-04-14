import { getOccasions } from "@/actions/occasions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddOccasionDialog from "@/components/crm/occasions/AddOccasionDialog";
import OccasionTable from "@/components/crm/occasions/OccasionTable";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Occasions() {
  const occasions = await getOccasions();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Occasions</h1>
          <p className="text-muted-foreground">
            Manage special occasions for your flower arrangements
          </p>
        </div>
        <AddOccasionDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Occasions</CardTitle>
          <CardDescription>
            {occasions?.length}{" "}
            {occasions?.length === 1 ? "occasion" : "occasions"} total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<OccasionTableSkeleton />}>
            <OccasionTable initialOccasions={occasions} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

function OccasionTableSkeleton() {
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
