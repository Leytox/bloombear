import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { paymentFAQ, paymentMethods, paymentSystems } from "@/constants";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function PaymentPage() {
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
              <Link href="/payment">Payment</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
          Payment Methods
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
          {paymentMethods.map((method) => (
            <Card key={method.id} className="py-0">
              <CardHeader className="p-3 sm:p-4 md:p-6">
                <CardTitle className="text-base text-center flex flex-col items-center justify-center sm:text-lg">
                  <method.icon size={32} />
                  {method.name}
                </CardTitle>
                <CardDescription className="text-xs text-center sm:text-sm">
                  {method.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="py-0 mb-4 sm:mb-6 md:mb-8">
          <CardHeader className="p-3 sm:p-4 md:p-6">
            <CardTitle className="text-center text-base sm:text-lg">
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-4">
              {paymentSystems.map((system) => (
                <system.icon key={system.id} size={64} />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4">
            Frequently Asked Questions
          </h2>
          <Accordion type="multiple" className="text-sm sm:text-base">
            {paymentFAQ.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                <AccordionTrigger className="py-3 sm:py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
