import { deliveryBenefits } from "@/constants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShieldQuestion } from "lucide-react";

export default function Benefits() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary/2 to-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 mb-6">
            <ShieldQuestion className="size-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the best flower delivery service in Berlin with our
            premium features
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {deliveryBenefits.map((benefit) => (
            <Card
              key={benefit.title}
              className="text-center transition-all duration-300 hover:-translate-y-1 border-2"
            >
              <CardHeader>
                <div className="mx-auto size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-colors duration-300">
                  <benefit.icon className="size-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold mb-2">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
