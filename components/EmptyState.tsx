import { FilterIcon, FrownIcon, SlidersHorizontalIcon } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium mb-2 flex items-center justify-center gap-2">
        We couldn&apos;t find any results <FrownIcon />
      </h3>
      <p className="text-muted-foreground flex items-center justify-center gap-2">
        Try changing the filter parameters <FilterIcon /> or change the price
        range <SlidersHorizontalIcon />
      </p>
    </div>
  );
}
