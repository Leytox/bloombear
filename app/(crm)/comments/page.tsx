import { getAllComments } from "@/actions/comments";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CommentsTable from "@/components/crm/messages/CommentsTable";

export default async function Comments() {
  const comments = await getAllComments();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Comments</h1>
          <p className="text-muted-foreground">Manage comments</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription>
            {comments?.length} {comments?.length === 1 ? "comment" : "comments"}{" "}
            total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<CommentsTableSkeleton />}>
            <CommentsTable comments={comments || []} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

function CommentsTableSkeleton() {
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
