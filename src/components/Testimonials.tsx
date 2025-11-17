import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    author: "Priya Sharma",
    role: "Parent",
    location: "Mumbai",
    rating: 5,
    text: "My 11-year-old built his first robot and can't stop talking about it! The instructions were clear, materials are high-quality, and he learned so much. Best educational investment we've made.",
    verified: true,
  },
  {
    id: 2,
    author: "Rajesh Kumar",
    role: "Science Teacher",
    location: "Delhi",
    rating: 5,
    text: "We use Kidova Labs kits in our STEM club. The kids are engaged for hours, and I love how it aligns with our curriculum. Safety certifications give parents peace of mind.",
    verified: true,
  },
  {
    id: 3,
    author: "Anita Desai",
    role: "Parent",
    location: "Bangalore",
    rating: 5,
    text: "Finally, screen-free learning that my daughter actually enjoys! She's building confidence with every project. The quality is exceptional and customer support is amazing.",
    verified: true,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="mb-2">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Loved by Parents & Kids
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of families building confident young creators
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <Card className="h-full">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-accent text-accent" />
          ))}
        </div>

        <p className="text-muted-foreground leading-relaxed">
          "{testimonial.text}"
        </p>

        <div className="pt-4 border-t">
          <div className="font-semibold flex items-center gap-2">
            {testimonial.author}
            {testimonial.verified && (
              <Badge variant="secondary" className="text-xs">
                Verified
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {testimonial.role} • {testimonial.location}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
