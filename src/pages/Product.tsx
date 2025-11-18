import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, Package, Clock, Users } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Product() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  const price = product.sale_price || product.base_price;
  const discount = product.discount_percent;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={product.primary_image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              {product.bestseller && (
                <Badge className="bg-primary">Bestseller</Badge>
              )}
              {product.new_arrival && (
                <Badge className="bg-accent">New Arrival</Badge>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">SKU: {product.sku}</p>
                <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                <p className="text-xl text-muted-foreground">{product.tagline}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.review_count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold">₹{price.toLocaleString()}</span>
                {product.sale_price && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.base_price.toLocaleString()}
                    </span>
                    <Badge className="bg-success">{discount}% OFF</Badge>
                  </>
                )}
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Ages {product.age_group}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{product.assembly_time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span>{product.in_stock ? "In Stock" : "Out of Stock"}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={() => addToCart(product.id)}
                  disabled={!product.in_stock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Skills */}
              {product.skills_gained && product.skills_gained.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Skills You'll Gain</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.skills_gained.map((skill: string) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="learning">Learning Outcomes</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6 prose max-w-none">
                <p className="text-lg">{product.short_description}</p>
                {product.long_description && (
                  <div className="mt-4 whitespace-pre-line">
                    {product.long_description}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="learning" className="mt-6">
                {product.learning_outcomes && product.learning_outcomes.length > 0 && (
                  <ul className="space-y-2">
                    {product.learning_outcomes.map((outcome: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </TabsContent>

              <TabsContent value="specs" className="mt-6">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="font-semibold">Age Group</dt>
                    <dd className="text-muted-foreground">{product.age_group}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Difficulty</dt>
                    <dd className="text-muted-foreground capitalize">{product.difficulty}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Assembly Time</dt>
                    <dd className="text-muted-foreground">{product.assembly_time}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Dimensions</dt>
                    <dd className="text-muted-foreground">{product.dimensions}</dd>
                  </div>
                  {product.weight_kg && (
                    <div>
                      <dt className="font-semibold">Weight</dt>
                      <dd className="text-muted-foreground">{product.weight_kg} kg</dd>
                    </div>
                  )}
                  <div>
                    <dt className="font-semibold">Battery Required</dt>
                    <dd className="text-muted-foreground">
                      {product.battery_required ? "Yes" : "No"}
                    </dd>
                  </div>
                </dl>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}