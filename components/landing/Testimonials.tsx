import { testimonials } from "@/constants";
import { MessageCircleHeartIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Testimonials() {
  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2">
          <MessageCircleHeartIcon />
          <span>What our clients say</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  {testimonial.avatar && (
                    <div className="mr-4 shrink-0">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full size-[60px] object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {testimonial.name}
                    </h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          size={16}
                          className={
                            i < testimonial.rating
                              ? "fill-yellow-400"
                              : "text-muted-foreground"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground italic">
                  {testimonial.text}
                </p>
              </CardContent>
              <CardFooter className="pt-0 text-sm text-muted-foreground">
                {new Date(testimonial.date).toLocaleDateString()}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
