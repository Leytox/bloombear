import { getEmployees } from "@/actions/employees";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import EmployeesTable from "@/components/crm/employees/EmployeesTable";

export default async function Employees() {
  const employees = await getEmployees();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground">
            Manage employees of your flower shop
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Employees</CardTitle>
          <CardDescription>
            {employees?.length}{" "}
            {employees?.length === 1 ? "employee" : "employees"} total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<EmployeesTableSkeleton />}>
            <EmployeesTable employees={employees || []} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

function EmployeesTableSkeleton() {
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
