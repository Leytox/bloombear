"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import {
  SlidersHorizontalIcon,
  FrownIcon,
  FilterIcon,
  SortDescIcon,
  SortAscIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  Redo2Icon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FlowerCard from "@/components/FlowerCard";
import { Category, Occasion, Product } from "@prisma/client";
import { getFilteredProducts } from "@/actions/product";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import FlowerCardSkeleton from "@/components/FlowerCardSceleton";

interface CatalogClientProps {
  initialProducts: Product[];
  categories: Category[];
  occasions: Occasion[];
  title?: string;
  currentCategory?: number;
  minPrice: number;
  maxPrice: number;
}

type SortOption = "popular" | "price_asc" | "price_desc" | "new";

type FilterState = {
  categoryIds: number[];
  occasionIds: number[];
  priceRange: [number, number];
  sortBy: SortOption;
};

const PRODUCTS_PER_PAGE = 9;

export default function CatalogClient({
  initialProducts,
  categories,
  occasions,
  title = "Bouquets Catalog",
  currentCategory,
  minPrice,
  maxPrice,
}: CatalogClientProps) {
  const [isPending, startTransition] = useTransition();
  const [showFilters, setShowFilters] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const totalProducts = allProducts.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const currentProducts = allProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  const [filterState, setFilterState] = useState<FilterState>({
    categoryIds: currentCategory ? [currentCategory] : [],
    occasionIds: [],
    priceRange: [minPrice, maxPrice],
    sortBy: "popular",
  });

  const [debouncedPriceRange] = useDebounceValue(filterState.priceRange, 300);

  const createPageURL = useCallback(
    (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams],
  );

  const fetchFilteredProducts = useCallback(
    (resetPage = false) => {
      startTransition(async () => {
        const filteredProducts = await getFilteredProducts({
          categoryIds: filterState.categoryIds,
          occasionIds: filterState.occasionIds,
          minPrice: filterState.priceRange[0],
          maxPrice: filterState.priceRange[1],
          sortBy: filterState.sortBy,
        });
        setAllProducts(filteredProducts);

        if (resetPage) {
          const params = new URLSearchParams(searchParams.toString());
          params.set("page", "1");
          router.push(`${pathname}?${params.toString()}`);
        }
      });
    },
    [
      filterState.categoryIds,
      filterState.occasionIds,
      filterState.priceRange,
      filterState.sortBy,
      router,
      pathname,
      searchParams,
    ],
  );

  const handleFilterChange = useCallback(
    (updates: Partial<FilterState>, resetPage = true) => {
      setFilterState((prev) => ({ ...prev, ...updates }));
      if (updates.priceRange) return; // Price updates are debounced
      fetchFilteredProducts(resetPage);
    },
    [fetchFilteredProducts],
  );

  const resetFilters = useCallback(() => {
    setFilterState({
      categoryIds: [],
      occasionIds: [],
      priceRange: [minPrice, maxPrice],
      sortBy: "popular",
    });
    fetchFilteredProducts(true);
  }, [minPrice, maxPrice, fetchFilteredProducts]);

  useEffect(() => {
    fetchFilteredProducts(false);
  }, [debouncedPriceRange, fetchFilteredProducts]);

  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-muted-foreground mb-4 sm:mb-6 md:mb-8">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        / Catalog
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold">{title}</h1>

        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {/* Desktop Filter Toggle */}
          <Button
            variant="outline"
            className="hidden lg:flex items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontalIcon className="h-4 w-4 mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          {/* Sort Dropdown */}
          <SortSelector
            value={filterState.sortBy}
            onChange={(sortBy) => handleFilterChange({ sortBy })}
          />

          {/* Mobile Filters */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="sm:inline-flex lg:hidden">
                <SlidersHorizontalIcon className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="px-4 w-full">
              <SheetHeader>
                <SheetTitle>
                  Found: {totalProducts}{" "}
                  {totalProducts === 1 ? "product" : "products"}
                </SheetTitle>
              </SheetHeader>
              <Separator />
              <div className="py-6">
                <FilterPanel
                  filterState={filterState}
                  categories={categories}
                  occasions={occasions}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  onFilterChange={handleFilterChange}
                  onReset={resetFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {/* Desktop Filters */}
        {showFilters && (
          <div className="hidden lg:block">
            <Card>
              <CardHeader>
                <CardTitle>
                  Found: {totalProducts}{" "}
                  {totalProducts === 1 ? "product" : "products"}
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent>
                <FilterPanel
                  filterState={filterState}
                  categories={categories}
                  occasions={occasions}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  onFilterChange={handleFilterChange}
                  onReset={resetFilters}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Products */}
        <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
          {isPending ? (
            <LoadingIndicator />
          ) : currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {currentProducts.map((product) => (
                  <FlowerCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <PaginationControl
                  currentPage={currentPage}
                  totalPages={totalPages}
                  createPageURL={createPageURL}
                />
              )}
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
}

function SortSelector({
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
            <SortAscIcon className="h-4 w-4" /> Cheapest First
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

function FilterPanel({
  filterState,
  categories,
  occasions,
  minPrice,
  maxPrice,
  onFilterChange,
  onReset,
}: {
  filterState: FilterState;
  categories: Category[];
  occasions: Occasion[];
  minPrice: number;
  maxPrice: number;
  onFilterChange: (updates: Partial<FilterState>, resetPage?: boolean) => void;
  onReset: () => void;
}) {
  const { categoryIds, occasionIds, priceRange } = filterState;

  const hasActiveFilters =
    categoryIds.length > 0 ||
    occasionIds.length > 0 ||
    priceRange[0] > minPrice ||
    priceRange[1] < maxPrice;

  const handleCategoryToggle = (categoryId: number, checked: boolean) => {
    const newCategories = checked
      ? [...categoryIds, categoryId]
      : categoryIds.filter((id) => id !== categoryId);

    onFilterChange({ categoryIds: newCategories });
  };

  const handleOccasionToggle = (occasionId: number, checked: boolean) => {
    const newOccasions = checked
      ? [...occasionIds, occasionId]
      : occasionIds.filter((id) => id !== occasionId);

    onFilterChange({ occasionIds: newOccasions });
  };

  return (
    <div className="space-y-6">
      {/* Reset button at the top */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={onReset}
        >
          <Redo2Icon /> Reset All Filters
        </Button>
      )}

      {/* Filter sections */}
      <div className="space-y-2">
        <FilterSection title="Categories">
          {categories.map((category) => (
            <FilterCheckbox
              key={category.id}
              id={`category-${category.id}`}
              label={category.name}
              checked={categoryIds.includes(category.id)}
              onChange={(checked) => handleCategoryToggle(category.id, checked)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Occasions">
          {occasions.map((occasion) => (
            <FilterCheckbox
              key={occasion.id}
              id={`occasion-${occasion.id}`}
              label={occasion.name}
              checked={occasionIds.includes(occasion.id)}
              onChange={(checked) => handleOccasionToggle(occasion.id, checked)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Price Range">
          <div className="space-y-[18px]">
            <Slider
              value={priceRange}
              min={minPrice}
              max={maxPrice}
              step={100}
              onValueChange={(value) =>
                onFilterChange({ priceRange: value as [number, number] })
              }
            />
            <div className="flex items-center justify-between gap-3">
              <PriceInput
                value={priceRange[0]}
                min={minPrice}
                max={priceRange[1]}
                onChange={(value) =>
                  onFilterChange({ priceRange: [value, priceRange[1]] })
                }
              />
              <span className="text-sm text-muted-foreground">—</span>
              <PriceInput
                value={priceRange[1]}
                min={priceRange[0]}
                max={maxPrice}
                onChange={(value) =>
                  onFilterChange({ priceRange: [priceRange[0], value] })
                }
              />
            </div>
          </div>
        </FilterSection>
      </div>
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <Collapsible className="flex flex-col gap-4" open={open}>
      <div className="flex items-center w-full justify-between">
        <h3 className="font-semibold">{title}</h3>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" onClick={() => setOpen(!open)}>
            {open ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="space-y-3">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function FilterCheckbox({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onChange(value === true)}
      />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
}

function PriceInput({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "" || /^\d+$/.test(newValue)) {
      setInputValue(newValue);
      const parsedValue = parseInt(newValue, 10);
      if (!isNaN(parsedValue)) {
        const validValue = Math.max(min, Math.min(max, parsedValue));
        onChange(validValue);
      }
    }
  };

  const handleBlur = () => {
    if (inputValue === "") {
      setInputValue(min.toString());
      onChange(min);
    } else {
      const parsedValue = parseInt(inputValue, 10);
      if (isNaN(parsedValue)) {
        setInputValue(value.toString());
      } else {
        const clampedValue = Math.max(min, Math.min(max, parsedValue));
        setInputValue(clampedValue.toString());
        onChange(clampedValue);
      }
    }
  };

  return (
    <div className="flex-1 relative">
      <Input
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className="text-right"
      />
    </div>
  );
}

function PaginationControl({
  currentPage,
  totalPages,
  createPageURL,
}: {
  currentPage: number;
  totalPages: number;
  createPageURL: (page: number | string) => string;
}) {
  const getVisiblePages = () => {
    const delta = 1;
    const pages: (number | string)[] = [1];
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    if (rangeStart > 2) pages.push("ellipsis-1");
    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
    if (rangeEnd < totalPages - 1) pages.push("ellipsis-2");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(Math.max(1, currentPage - 1))}
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : undefined}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {getVisiblePages().map((page) =>
          typeof page === "string" ? (
            <PaginationItem key={page}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageURL(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href={createPageURL(Math.min(totalPages, currentPage + 1))}
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : undefined}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function LoadingIndicator() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      {[...Array(9)].map((_, index) => (
        <FlowerCardSkeleton key={index} />
      ))}
    </div>
  );
}

function EmptyState() {
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
