import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";
import roboticsKit from "@/assets/product-robotics-kit.jpg";
import scienceKit from "@/assets/product-science-kit.jpg";
import circuitKit from "@/assets/product-circuit-kit.jpg";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Robotics Starter Kit",
    sku: "KL-ROB-001",
    slug: "robotics-starter-kit",
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
    slug: "science-explorer-box",
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
    slug: "circuit-builder-kit",
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
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    setLoading(true);
    // Fetch the actual product ID from the database using SKU
    const { data } = await supabase
      .from("products")
      .select("id")
      .eq("sku", product.sku)
      .single();
    
    if (data) {
      await addToCart(data.id);
    }
    setLoading(false);
  };

  return (
    <Card className="group hover:shadow-large transition-all duration-300 overflow-hidden animate-fade-in">
      <CardHeader className="p-0">
        <Link to={`/product/${product.slug}`}>
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
        </Link>
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

        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">{product.tagline}</p>

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

      <CardFooter className="p-6 pt-0 gap-2">
        <Link to={`/product/${product.slug}`} className="flex-1">
          <Button variant="outline" className="w-full" size="lg">
            View Details
          </Button>
        </Link>
        <Button size="lg" onClick={handleAddToCart} disabled={loading}>
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
