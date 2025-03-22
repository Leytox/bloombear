import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { AlertCircleIcon } from "lucide-react";
import { deliveryOptions, deliveryZones, importantInfo } from "@/constants";

export default function DeliveryPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8">
      <div className="text-sm text-muted-foreground mb-4 sm:mb-6 md:mb-8">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        / Delivery
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
          Delivery Flowers
        </h1>

        <Card className="mb-4 sm:mb-6 md:mb-8">
          <CardHeader className="p-4 sm:p-6 -my-4">
            <CardTitle className="text-xl sm:text-2xl">
              Delivery Conditions
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              We deliver flowers to Berlin and Berlin state
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {deliveryOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg"
                >
                  <option.icon />
                  <div>
                    <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                      {option.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4 sm:mb-6 md:mb-8">
          <CardHeader className="p-4 sm:p-6 -my-4">
            <CardTitle className="text-xl sm:text-2xl">
              Delivery Zones and Prices
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Description of delivery zones and prices
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {deliveryZones.map((zone) => (
                <div
                  key={zone.id}
                  className="p-3 sm:p-4 border rounded-lg flex flex-col sm:flex-row justify-between gap-2 sm:items-center"
                >
                  <div>
                    <zone.icon />
                    <h3 className="font-semibold text-sm sm:text-base">
                      {zone.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {zone.description}
                    </p>
                  </div>
                  <div className="text-left sm:text-right mt-1 sm:mt-0">
                    <div className="font-semibold text-sm sm:text-base">
                      {zone.price}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {zone.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6 -my-4">
            <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
              <AlertCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <span>Important Information</span>
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Description of important information
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <ul className="space-y-2 sm:space-y-3">
              {importantInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary text-lg leading-tight flex-shrink-0">
                    •
                  </span>
                  <span className="text-sm sm:text-base">{info}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
