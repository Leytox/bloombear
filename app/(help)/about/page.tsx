import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CheckCircle2Icon, PhoneIcon } from "lucide-react";
import { advantages, values } from "@/constants";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";

export default function AboutPage() {
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
              <Link href="/about">About Us</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
          About Our Company
        </h1>

        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] mb-6 sm:mb-8 md:mb-10 rounded-lg overflow-hidden">
          <Image
            src="/team.webp"
            alt="Our team of florists"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none mb-8 sm:mb-10 md:mb-12">
          <p>
            We are a team of professional florists passionate about our craft.
            Over the past 10 years, we have created unique bouquets and floral
            arrangements that become part of your special moments and help
            express the most sincere feelings.
          </p>
          <p>
            Our mission is to bring joy and emotions through unique floral
            solutions. We believe that each bouquet should not just be a
            collection of flowers, but a true work of art created with heart and
            attention to detail.
          </p>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Our Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
          {values.map((value) => (
            <Card key={value.title}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <value.icon className="h-5 w-5 text-primary" />
                  {value.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Our Advantages
        </h2>
        <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12">
          {advantages.map((advantage, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2Icon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">{advantage.title}</h3>
                <p className="text-muted-foreground">{advantage.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="bg-muted rounded-lg p-6 sm:p-8 md:p-10 text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
            Ready to order a bouquet?
          </h2>
          <p className="text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto">
            Contact us right now and our florists will help you choose the
            perfect bouquet for any occasion
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/catalog">
                Go to catalog <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contacts">
                Contact us <PhoneIcon />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our company and our mission.",
};
