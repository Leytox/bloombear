"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useDebounceValue } from "usehooks-ts";
import { RefObject, useEffect, useRef, useState } from "react";
import { searchProducts } from "@/actions/product";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useOnClickOutside } from "usehooks-ts";
import Link from "next/link";
import { Badge } from "./ui/badge";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounceValue(
    "",
    500,
  );
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useOnClickOutside(searchRef as RefObject<HTMLDivElement>, () =>
    setIsOpen(false),
  );

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    async function fetchResults() {
      setIsLoading(true);
      try {
        const products = await searchProducts(debouncedSearchTerm);
        setResults(products);
        setIsOpen(true);
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();
  }, [debouncedSearchTerm]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
    setDebouncedSearchTerm(e.target.value);
    if (e.target.value.trim() === "") setIsOpen(false);
  }

  return (
    <div className="flex-1 max-w-xl relative" ref={searchRef}>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          autoFocus={false}
          onFocus={() => debouncedSearchTerm && setIsOpen(true)}
          className="w-full"
        />
        {isLoading ? (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-muted-foreground border-t-transparent rounded-full" />
          </div>
        ) : (
          <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-background rounded-md shadow-lg border overflow-hidden">
          <ul className="max-h-[calc(100vh-220px)] overflow-auto">
            {results.map((product) => (
              <li key={product.id} onClick={() => setIsOpen(false)}>
                <Link
                  className="p-3 flex items-center hover:bg-muted cursor-pointer transition-colors"
                  href={`/product/${product.id}`}
                  onClick={() => {
                    setSearchTerm("");
                    setDebouncedSearchTerm("");
                    setIsOpen(false);
                  }}
                >
                  {product.image && (
                    <div className="size-18 relative flex-shrink-0 overflow-hidden rounded-md mr-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium truncate">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-2">
                      {product.discount && product.discount > 0 ? (
                        <>
                          <p className="font-medium">{product.price} €</p>
                          <p className="text-muted-foreground text-sm line-through">
                            {Math.round(
                              (product.price * 100) / (100 - product.discount),
                            )}{" "}
                            €
                          </p>
                          <Badge
                            variant={"default"}
                            className="py-1 px-2 text-xs"
                          >
                            -{product.discount}%
                          </Badge>
                        </>
                      ) : (
                        <p className="font-medium">{product.price} €</p>
                      )}
                    </div>
                    {product.inStock ? (
                      <Badge variant={"secondary"} className="px-2 text-xs">
                        In stock
                      </Badge>
                    ) : (
                      <Badge variant={"destructive"} className="px-2 text-xs">
                        Out of stock
                      </Badge>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && debouncedSearchTerm && results.length === 0 && !isLoading && (
        <div className="absolute z-50 mt-2 w-full bg-background rounded-md shadow-lg border p-4 text-center">
          <p className="text-muted-foreground">
            No results found for &quot;{debouncedSearchTerm}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
