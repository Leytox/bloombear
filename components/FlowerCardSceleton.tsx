import { Card } from "./ui/card";

export default function FlowerCardSkeleton() {
  return (
    <Card className="relative flex flex-col h-full pt-0 animate-pulse">
      {/* Image placeholder */}
      <div className="relative w-full pt-[100%] mb-4 bg-muted rounded-t-lg" />

      <div className="px-4 flex-grow">
        {/* Rating placeholder */}
        <div className="flex items-center mb-2 mt-6">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-full bg-muted" />
            ))}
          </div>
          <div className="w-10 h-3 bg-muted rounded ml-2" />
        </div>

        {/* Title placeholder */}
        <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
        <div className="h-5 bg-muted rounded w-1/2 mb-4"></div>

        {/* Description placeholder */}
        <div className="space-y-2 mt-1 mb-4">
          <div className="h-3 bg-muted rounded w-full"></div>
          <div className="h-3 bg-muted rounded w-5/6"></div>
          <div className="h-3 bg-muted rounded w-4/6"></div>
        </div>
      </div>

      <div className="px-4 py-3 mt-auto">
        <div className="w-full flex flex-col gap-3">
          {/* Price placeholder */}
          <div className="flex justify-between items-center">
            <div>
              <div className="h-6 bg-muted rounded w-20 mb-2"></div>
              <div className="h-5 bg-muted rounded w-24"></div>
            </div>
          </div>

          {/* Button placeholder */}
          <div className="h-10 bg-muted rounded w-full"></div>
        </div>
      </div>
    </Card>
  );
}
