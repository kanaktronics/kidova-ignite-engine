import { Card, CardContent } from "@/components/ui/card";
import { Bot, Beaker, Cpu, Palette, Wrench, Brain } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Robotics Kits",
    icon: Bot,
    description: "Build intelligent machines",
    count: 12,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 2,
    name: "Science Kits",
    icon: Beaker,
    description: "Explore amazing experiments",
    count: 18,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    id: 3,
    name: "Electronics",
    icon: Cpu,
    description: "Circuit building fun",
    count: 15,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    id: 4,
    name: "Creative Arts",
    icon: Palette,
    description: "Express your creativity",
    count: 10,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    id: 5,
    name: "DIY Maker",
    icon: Wrench,
    description: "Build anything you imagine",
    count: 14,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 6,
    name: "Brain & Logic",
    icon: Brain,
    description: "Puzzles and challenges",
    count: 8,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
];

export const Categories = () => {
  return (
    <section className="py-20" id="categories">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Explore by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From robotics to art, find the perfect kit to spark curiosity
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryCard = ({ category }: { category: typeof categories[0] }) => {
  const Icon = category.icon;
  
  return (
    <Card className="group hover:shadow-medium transition-all duration-300 cursor-pointer hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`h-12 w-12 rounded-xl ${category.bgColor} flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform`}>
            <Icon className="h-6 w-6" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
            <span className="text-xs font-medium text-primary">
              {category.count} Products
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
