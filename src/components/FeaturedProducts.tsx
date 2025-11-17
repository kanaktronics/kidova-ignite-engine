import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";
import roboticsKit from "@/assets/product-robotics-kit.jpg";
import scienceKit from "@/assets/product-science-kit.jpg";
import circuitKit from "@/assets/product-circuit-kit.jpg";

const products = [
  {
    id: 1,
    name: "Robotics Starter Kit",
    sku: "KL-ROB-001",
    tagline: "Build Your First Robot",
    price: 2499,
    originalPrice: 2999,
    rating: 4.8,
    reviews: 234,
    image: roboticsKit,
    badge: "Bestseller",
    age: "10-14 years",
  },
  {
    id: 2,
    name: "Science Explorer Box",
    sku: "KL-SCI-001",
    tagline: "25+ Amazing Experiments",
    price: 1999,
    originalPrice: null,
    rating: 4.9,
    reviews: 189,
    image: scienceKit,
    badge: "New Arrival",
    age: "8-13 years",
  },
  {
    id: 3,
    name: "Circuit Builder Kit",
    sku: "KL-ELEC-001",
    tagline: "Learn Electronics Hands-On",
    price: 2799,
    originalPrice: null,
    rating: 4.7,
    reviews: 156,
    image: circuitKit,
    badge: null,
    age: "10-15 years",
  },
];

export const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-muted/30" id="products">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="mb-2">Featured Products</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Most Loved Learning Kits
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium STEM kits designed for hands-on learning and real skill development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-large transition-all duration-300 overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden aspect-square bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <Badge className="absolute top-4 left-4 bg-primary shadow-primary">
              {product.badge}
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="absolute top-4 right-4 bg-success">
              {discount}% OFF
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviews} reviews)
          </span>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.tagline}</p>
        </div>

        <Badge variant="secondary" className="text-xs">
          Ages {product.age}
        </Badge>

        <div className="flex items-baseline gap-2 pt-2">
          <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button className="w-full" size="lg">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
