"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import {
  SlidersHorizontalIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  Redo2Icon,
  SearchCheckIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
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
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterState } from "@/types";
import SortSelector from "@/components/SortSelector";
import LoadingIndicator from "@/components/LoadingIndicator";
import PaginationControl from "@/components/PaginationControl";
import EmptyState from "@/components/EmptyState";

interface CatalogClientProps {
  initialProducts: Product[];
  categories: Category[];
  occasions: Occasion[];
  title?: string;
  currentCategory?: number;
  minPrice: number;
  maxPrice: number;
}

const PRODUCTS_PER_PAGE = 9;

export default function CatalogClient({
  initialProducts,
  categories,
  occasions,
  title = "Catalog",
  currentCategory,
  minPrice,
  maxPrice,
}: CatalogClientProps) {
  const [isPending, startTransition] = useTransition();
  const [showFilters, setShowFilters] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[] | null>(
    initialProducts
  );

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const totalProducts = allProducts?.length || 0;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const currentProducts = allProducts?.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const [filterState, setFilterState] = useState<FilterState>({
    categoryIds: currentCategory ? [currentCategory] : [],
    occasionIds: [],
    priceRange: [minPrice, maxPrice],
    sortBy: "popular",
  });

  const [debouncedPriceRange] = useDebounceValue(filterState.priceRange, 500);

  const createPageURL = useCallback(
    (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
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
    ]
  );

  const handleFilterChange = useCallback(
    (updates: Partial<FilterState>, resetPage = true) => {
      setFilterState((prev) => ({ ...prev, ...updates }));

      // Only fetch immediately if it's not a price range update
      // Price range updates will be handled by the useEffect with debounced value
      if (!updates.priceRange) {
        fetchFilteredProducts(resetPage);
      }
    },
    [fetchFilteredProducts]
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
    if (debouncedPriceRange) {
      fetchFilteredProducts(false);
    }
  }, [debouncedPriceRange, fetchFilteredProducts]);

  return (
    <div className="container min-h-screen mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/catalog">Catalog</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
                <SheetTitle className="flex gap-1 items-center">
                  <SearchCheckIcon /> Found: {totalProducts}{" "}
                  {totalProducts === 1 ? "product" : "products"}
                </SheetTitle>
                <SheetDescription>
                  Search by category, occasion, price range.
                </SheetDescription>
              </SheetHeader>
              <Separator />
              <ScrollArea>
                <FilterPanel
                  filterState={filterState}
                  categories={categories}
                  occasions={occasions}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  onFilterChange={handleFilterChange}
                  onReset={resetFilters}
                  isPending={isPending}
                />
              </ScrollArea>
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
                <CardTitle className="flex gap-1 items-center font-raleway">
                  <SearchCheckIcon /> Found: {totalProducts}{" "}
                  {totalProducts === 1 ? "product" : "products"}
                </CardTitle>
                <CardDescription>
                  Search by category, occasion, price range.
                </CardDescription>
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
                  isPending={isPending}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Products */}
        <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
          {isPending ? (
            <LoadingIndicator />
          ) : currentProducts && currentProducts.length > 0 ? (
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

function FilterPanel({
  filterState,
  categories,
  occasions,
  minPrice,
  maxPrice,
  onFilterChange,
  onReset,
  isPending,
}: {
  filterState: FilterState;
  categories: Category[];
  occasions: Occasion[];
  minPrice: number;
  maxPrice: number;
  onFilterChange: (updates: Partial<FilterState>, resetPage?: boolean) => void;
  onReset: () => void;
  isPending: boolean;
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
    <div className="space-y-2">
      {/* Reset button at the top */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={onReset}
          disabled={isPending}
        >
          <Redo2Icon className="mr-2" /> Reset All Filters
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
              disabled={isPending}
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
              disabled={isPending}
            />
          ))}
        </FilterSection>

        <FilterSection title="Price Range">
          <div className="space-y-[18px]">
            <Slider
              value={priceRange}
              min={minPrice}
              max={maxPrice}
              step={1}
              onValueChange={(value) =>
                onFilterChange({ priceRange: value as [number, number] })
              }
              className={isPending ? "opacity-70" : ""}
              disabled={isPending}
            />
            <div className="flex items-center justify-between gap-3">
              <PriceInput
                value={priceRange[0]}
                min={minPrice}
                max={priceRange[1]}
                onChange={(value) =>
                  onFilterChange({ priceRange: [value, priceRange[1]] })
                }
                disabled={isPending}
              />
              <span className="text-sm text-muted-foreground">—</span>
              <PriceInput
                value={priceRange[1]}
                min={priceRange[0]}
                max={maxPrice}
                onChange={(value) =>
                  onFilterChange({ priceRange: [priceRange[0], value] })
                }
                disabled={isPending}
              />
            </div>
            {isPending && (
              <p className="text-xs text-muted-foreground animate-pulse">
                Updating results...
              </p>
            )}
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
  disabled = false,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onChange(value === true)}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className={`text-sm font-medium leading-none cursor-pointer ${
          disabled ? "opacity-70" : ""
        }`}
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
  disabled = false,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}) {
  const [localValue, setLocalValue] = useState(value.toString());

  useEffect(() => {
    setLocalValue(value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "" || /^\d+$/.test(newValue)) setLocalValue(newValue);
  };

  const handleBlur = () => {
    if (localValue === "") {
      setLocalValue(min.toString());
      onChange(min);
    } else {
      const parsedValue = parseInt(localValue, 10);
      if (isNaN(parsedValue)) setLocalValue(value.toString());
      else {
        const clampedValue = Math.max(min, Math.min(max, parsedValue));
        setLocalValue(clampedValue.toString());
        if (clampedValue !== value) onChange(clampedValue);
      }
    }
  };

  return (
    <div className="flex-1 relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        €
      </span>
      <Input
        type="text"
        inputMode="numeric"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
        className="pl-7 text-right"
        disabled={disabled}
        min={min}
        max={max}
        aria-label="Price input in Euro"
      />
    </div>
  );
}
