import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Star, Users, Award } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container relative py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
              <Award className="h-4 w-4" />
              Founded by a 14-year-old innovator
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance animate-slide-up">
              Building Confident
              <span className="block gradient-hero bg-clip-text text-transparent">
                Young Creators
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Transform learning through hands-on STEM kits that spark curiosity, build real skills, and create lifelong innovators.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" className="shadow-primary">
                Shop Learning Kits
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <TrustBadge
                icon={<ShieldCheck className="h-5 w-5" />}
                title="100% Safe"
                subtitle="CE Certified"
              />
              <TrustBadge
                icon={<Star className="h-5 w-5" />}
                title="4.9/5 Rating"
                subtitle="3,420 Reviews"
              />
              <TrustBadge
                icon={<Users className="h-5 w-5" />}
                title="50,000+"
                subtitle="Happy Kids"
              />
              <TrustBadge
                icon={<Award className="h-5 w-5" />}
                title="ISO 9001"
                subtitle="Quality Assured"
              />
            </div>
          </div>

          <div className="relative animate-scale-in" style={{ animationDelay: "0.4s" }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl rounded-full" />
            <img
              src={heroBackground}
              alt="Educational robotics components and learning kits"
              className="relative rounded-2xl shadow-large w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustBadge = ({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) => {
  return (
    <div className="flex flex-col items-center lg:items-start gap-2">
      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
    </div>
  );
};
