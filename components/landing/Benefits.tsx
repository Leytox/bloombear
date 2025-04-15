import { deliveryBenefits } from "@/constants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Benefits() {
  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {deliveryBenefits.map((benefit) => (
            <Card key={benefit.title} className="text-center">
              <CardHeader>
                <div className="mx-auto size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon />
                </div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
