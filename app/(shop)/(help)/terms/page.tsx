import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FileTextIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";

export default function TermsPage() {
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
              <Link href="/terms">Terms</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4 sm:mb-6 md:mb-8">
          <FileTextIcon className="h-8 w-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Terms of Use
          </h1>
        </div>

        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>1. General Provisions</CardTitle>
            <CardDescription>Last updated: 01.06.2023</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose max-w-none">
            <p>
              These Terms of Use (hereinafter referred to as &apos;Terms&apos;)
              regulate the relationship between the User and the BloomBear
              online store (hereinafter referred to as &apos;Store&apos;),
              arising from the use of the online store.
            </p>
            <p>
              By using the online store, the User confirms that they have read
              and understood the Terms, understand their meaning, and accept
              them fully and without reservation.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>2. Terms of Use</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose max-w-none">
            <p>
              The Store provides the User with access to the services of the
              online store, allowing the User to search and purchase flowers and
              floral arrangements offered by the Store for sale through the
              online store.
            </p>
            <p>
              The Store reserves the right to make changes to the assortment of
              products offered in the online store at any time without prior
              notice to the User.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>3. Rules for Placing an Order</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose max-w-none">
            <p>
              The User may place an order for products offered in the online
              store in the following ways:
            </p>
            <ul>
              <li>
                Through the shopping cart on the website of the online store
              </li>
              <li>By phone</li>
              <li>Through the feedback form</li>
            </ul>
            <p>
              The User is obliged to provide accurate information about
              themselves and the recipient of the order.
            </p>
            <p>
              After placing an order, the User is provided with information
              about the expected delivery time. The specified time is not exact
              and may be changed depending on circumstances.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>4. Payment and Delivery</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose max-w-none">
            <p>
              Prices for products are specified in Euros. Prices for products
              may be changed by the Store in its sole discretion. In this case,
              the price for the ordered and paid by the User product is not
              subject to change.
            </p>
            <p>Payment methods for goods:</p>
            <ul>
              <li>Online payment by credit card</li>
              <li>Cash on delivery</li>
              <li>Bank transfer</li>
            </ul>
            <p>
              Delivery of goods is carried out in Berlin and the Berlin state.
              The specified time is not exact and may be changed depending on
              circumstances.
            </p>
            <Link href="/delivery" className="text-primary hover:underline">
              Delivery
            </Link>
          </CardContent>
        </Card>

        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>5. Return and exchange of goods</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose max-w-none">
            <p>
              In accordance with Germany, flowers and floral arrangements are
              considered goods that are not subject to return or exchange as
              goods of good quality.
            </p>
            <p>
              In case of receiving a defective product, the User has the right
              to demand:
            </p>
            <ul>
              <li>Replacement with a similar product of good quality</li>
              <li>
                Replacement with a product of another brand (model, article)
                with corresponding recalculation of the purchase price
              </li>
              <li>Proportional reduction of the purchase price</li>
              <li>Refund of the amount paid for the product</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>6. Changes to the Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose max-w-none">
            <p>
              These Terms and Conditions may be changed by the Shop without any
              special notice, the new version of the Terms and Conditions shall
              be effective as follows the new edition of the Terms shall take
              effect from the moment of its posting on the Internet, unless
              otherwise provided by the Shop. from the moment of its posting on
              the Internet, unless otherwise provided by the new version of the
              Terms.
            </p>
            <p>
              All arising disputes between the Shop and the User will be All
              disputes between the Shop and the User will be resolved through
              negotiations, and in case of inability to reach an agreement - in
              court in accordance with the current legislation in force.
              agreement - in court in accordance with the current legislation of
              the Germany.
            </p>
            <p>
              The invalidation by a court of law of any provision of these Terms
              and Conditions shall not invalidate the remaining provisions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Read our terms and conditions to understand our policies and procedures.",
};
