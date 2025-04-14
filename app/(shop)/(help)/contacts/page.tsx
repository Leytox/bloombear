import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AtSignIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  SendIcon,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";

export default function ContactsPage() {
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
              <Link href="/contacts">Contacts</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
          Contact Information
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 sm:mb-10 md:mb-12">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Our Contacts
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPinIcon className="h-5 w-5 text-primary" />
                    Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    123 Main Street, Berlin, Germany
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Working Hours:
                    </span>{" "}
                    Monday to Friday: 08:00 - 18:00
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <PhoneIcon className="h-5 w-5 text-primary" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <a
                      href="tel:+494951234567"
                      className="text-primary hover:underline"
                    >
                      +49 (495) 123-45-67
                    </a>
                  </p>
                  <p>
                    <a
                      href="tel:+494951234568"
                      className="text-primary hover:underline"
                    >
                      +49 (495) 123-45-68
                    </a>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AtSignIcon className="h-5 w-5 text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <a
                      href="mailto:info@bloombear.de"
                      className="text-primary hover:underline"
                    >
                      info@bloombear.de
                    </a>
                  </p>
                  <p>
                    <a
                      href="mailto:orders@bloom.de"
                      className="text-primary hover:underline"
                    >
                      orders@bloombear.de
                    </a>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ClockIcon className="h-5 w-5 text-primary" />
                    Working Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Delivery Service: 24/7
                  </p>
                  <p className="text-muted-foreground">
                    Support Service: Monday to Friday, 08:00 to 22:00
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Contact Us
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>
                  Fill out the form, and we&apos;ll get back to you shortly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Enter your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@mail.de"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+49 (___) ___-__-__"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message"
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send message <SendIcon className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            How to find us
          </h2>
          <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d310844.0805017142!2d13.42473175!3d52.5068441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e373f035901%3A0x42120465b5e3b70!2sBerlin%2C%20Germany!5e0!3m2!1sen!2sua!4v1742671436160!5m2!1sen!2sua"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Contacts",
  description: "Contact us for any inquiries or feedback.",
};
