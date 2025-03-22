import { Card } from "./ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FlowerCardSkeleton() {
  return (
    <Card className="relative flex flex-col h-full pt-0">
      {/* Image placeholder */}
      <Skeleton className="relative w-full pt-[100%] mb-4 rounded-t-lg" />

      <div className="px-4 flex-grow">
        {/* Rating placeholder */}
        <div className="flex items-center mb-2 mt-6">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-4 h-4 rounded-full" />
            ))}
          </div>
          <Skeleton className="w-10 h-3 rounded ml-2" />
        </div>

        {/* Title placeholder */}
        <Skeleton className="h-5 rounded w-3/4 mb-2" />
        <Skeleton className="h-5 rounded w-1/2 mb-4" />

        {/* Description placeholder */}
        <div className="space-y-2 mt-1 mb-4">
          <Skeleton className="h-3 rounded w-full" />
          <Skeleton className="h-3 rounded w-5/6" />
          <Skeleton className="h-3 rounded w-4/6" />
        </div>
      </div>

      <div className="px-4 py-3 mt-auto">
        <div className="w-full flex flex-col gap-3">
          {/* Price placeholder */}
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-6 rounded w-20 mb-2" />
              <Skeleton className="h-5 rounded w-24" />
            </div>
          </div>

          {/* Button placeholder */}
          <Skeleton className="h-10 rounded w-full" />
        </div>
      </div>
    </Card>
  );
}
