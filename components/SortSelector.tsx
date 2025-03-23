import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SortOption } from "@/types";
import { SortDescIcon, ArrowUpWideNarrowIcon } from "lucide-react";

export default function SortSelector({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-[200px]">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="popular">
          <div className="flex items-center gap-2">
            <SortDescIcon className="h-4 w-4" /> By Popularity
          </div>
        </SelectItem>
        <SelectItem value="price_asc">
          <div className="flex items-center gap-2">
            <ArrowUpWideNarrowIcon className="h-4 w-4" /> Cheapest First
          </div>
        </SelectItem>
        <SelectItem value="price_desc">
          <div className="flex items-center gap-2">
            <SortDescIcon className="h-4 w-4" /> Most Expensive First
          </div>
        </SelectItem>
        <SelectItem value="new">
          <div className="flex items-center gap-2">
            <SortDescIcon className="h-4 w-4" /> Newest First
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
