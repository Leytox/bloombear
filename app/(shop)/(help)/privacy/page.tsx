import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ShieldIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";

export default function PrivacyPage() {
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
              <Link href="/privacy">Privacy Policy</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4 sm:mb-6 md:mb-8">
          <ShieldIcon className="h-8 w-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Privacy Policy
          </h1>
        </div>

        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>1. General Terms</CardTitle>
            <CardDescription>Last updated: 01.06.2023</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose max-w-none">
            <p>
              This Privacy Policy defines the order of processing and protection
              of personal data of natural persons (hereinafter referred to as
              User), using the services of the BloomBear website (hereinafter
              referred to as Site).
            </p>
            <p>
              The Privacy Policy applies to all information that the Site may
              obtain about the User during the use of the Site&apos;s services.
            </p>
            <p>
              Using the services of the Site means unconditional agreement of
              the User with this Privacy Policy and the conditions of processing
              his personal data specified therein.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>2. Personal Data Processing</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose max-w-none">
            <p>
              Personal data of Users of the Site is collected and processed for
              the following purposes:
            </p>
            <ul>
              <li>
                Identification of the User for the placement of an order and
                (or) the conclusion of a Contract
              </li>
              <li>
                Provision of personalized services and products, information
                about goods and services
              </li>
              <li>
                Communication with the User, including the delivery of
                notifications, requests and information related to the use of
                the Site, the provision of services, as well as the processing
                of requests and applications from the User
              </li>
              <li>
                Improvement of the quality of the Site&apos;s work, convenience
                of its use, development of new goods and services
              </li>
              <li>
                Conducting statistical and other research based on anonymized
                data
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>3. Terms of Data Processing</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose max-w-none">
            <p>
              Processing of User data is carried out without any time limit,
              using any legal method, including in personal data information
              systems with the use of automated means or without such means.
            </p>
            <p>
              The Site does not verify the accuracy of the User&apos;s personal
              data, provided by the User, and does not have the ability to
              evaluate its competence.
            </p>
            <p>
              The User&apos;s personal data may be transferred to authorized
              state bodies of the Germany only on the grounds and in accordance
              with the procedure established by the legislation of the Germany.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>4. Protection of Personal Data</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose max-w-none">
            <p>
              The Site takes necessary and sufficient organizational and
              technical measures to protect the User&apos;s personal data from
              unauthorized or accidental access, deletion, modification,
              blocking, copying, dissemination, and other unlawful actions by
              third parties.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>5. Final Provisions</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose max-w-none">
            <p>
              This Privacy Policy may be modified without any special notice,
              the new version of the Policy comes into force from the moment it
              is posted on the Internet at the address specified in this
              paragraph, unless otherwise provided by the new version of the
              Privacy Policy.
            </p>
            <p>
              This Privacy Policy and the relationship between the User and the
              Site arising from the application of the Privacy Policy are
              subject to the laws of the Germany.
            </p>
            <p>
              If for any reason one or more provisions of this Privacy Policy
              are considered invalid or lack legal force, this does not affect
              the validity or applicability of the other provisions of the
              Privacy Policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn about our privacy policy and data protection practices.",
};
