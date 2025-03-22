import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { promotions } from "@/constants";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PromotionsPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8">
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
              <Link href="/promotions">Promotions</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
        Promotions and Special Offers
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {promotions.map((promo) => (
          <Card
            key={promo.id}
            className="overflow-hidden flex flex-col h-full pt-0"
          >
            <div className="relative h-[150px] sm:h-[180px] md:h-[200px]">
              <Image
                src={promo.image}
                alt={promo.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <CardTitle className="text-lg sm:text-xl">
                {promo.title}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {promo.period}
              </CardDescription>
            </CardHeader>

            <CardContent className="-mt-8 p-3 sm:p-4 md:p-6 pt-0 flex-grow">
              {promo.badge && (
                <Badge variant={"default"} className="py-1 px-2 text-xs mb-2">
                  {promo.badge}
                </Badge>
              )}
              <p className="text-muted-foreground text-sm">
                {promo.description}
              </p>
              <ul className="mt-3 sm:mt-4 space-y-1 sm:space-y-2 text-sm">
                {promo.conditions.map((condition, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckIcon />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-3 sm:p-4 md:p-6 pt-0 mt-auto">
              <Button className="w-full sm:w-auto" asChild>
                <Link href={promo.link}>
                  Details <ArrowRightIcon />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
