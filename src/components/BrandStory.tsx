import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Star, Heart, Sparkles } from "lucide-react";

export const BrandStory = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5" id="about">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <Badge variant="secondary" className="mb-2">Our Story</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Born from a 14-Year-Old's Vision
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Founded by <span className="font-semibold text-foreground">Kanak Raj</span>, 
            Kidova Labs believes every child deserves to be a creator, not just a consumer. 
            We're on a mission to transform learning through hands-on innovation, making STEM 
            education engaging, accessible, and fun for the next generation of makers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <ValueCard
            icon={<ShieldCheck className="h-6 w-6" />}
            title="Safety First"
            description="Every component is CE certified and rigorously tested"
            color="text-success"
            bgColor="bg-success/10"
          />
          <ValueCard
            icon={<Star className="h-6 w-6" />}
            title="Quality Obsessed"
            description="Premium materials built to last through countless projects"
            color="text-accent"
            bgColor="bg-accent/10"
          />
          <ValueCard
            icon={<Heart className="h-6 w-6" />}
            title="Parent Approved"
            description="Trusted by 50,000+ families for meaningful learning"
            color="text-primary"
            bgColor="bg-primary/10"
          />
          <ValueCard
            icon={<Sparkles className="h-6 w-6" />}
            title="Innovation Hub"
            description="Where STEM meets creativity and imagination"
            color="text-secondary"
            bgColor="bg-secondary/10"
          />
        </div>

        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-large">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <StatCard number="50,000+" label="Kids Learning" />
            <StatCard number="150+" label="School Partners" />
            <StatCard number="12" label="Countries Reached" />
          </div>
        </div>
      </div>
    </section>
  );
};

const ValueCard = ({ 
  icon, 
  title, 
  description, 
  color, 
  bgColor 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  color: string;
  bgColor: string;
}) => {
  return (
    <Card className="text-center hover:shadow-medium transition-all duration-300">
      <CardContent className="p-6 space-y-4">
        <div className={`h-14 w-14 rounded-xl ${bgColor} ${color} flex items-center justify-center mx-auto`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const StatCard = ({ number, label }: { number: string; label: string }) => {
  return (
    <div>
      <div className="text-4xl md:text-5xl font-bold gradient-hero bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </div>
  );
};
