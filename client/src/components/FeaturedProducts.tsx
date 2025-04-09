import { useQuery } from "@tanstack/react-query";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import AnimatedBackground from "./AnimatedBackground";
import { ArrowRight, Sparkles, BadgeAlert } from "lucide-react";

interface FeaturedProductsProps {
  hideTitle?: boolean;
}

const FeaturedProducts = ({ hideTitle = false }: FeaturedProductsProps) => {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', { featured: true }],
    queryFn: async () => {
      const response = await fetch('/api/products?featured=true');
      if (!response.ok) throw new Error('Failed to fetch featured products');
      return response.json();
    },
  });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background with Red Theme */}
      <AnimatedBackground
        variant="gradient"
        className="absolute inset-0 z-0"
        height="100%"
      />
      
      {/* Overlay gradient with red theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/90 z-0"></div>
      
      {/* Floating elements with red theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 top-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -left-1/3 bottom-1/4 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {!hideTitle && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4 inline-block mr-2" />
              FEATURED PRODUCTS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Let there be light
            </h2>
            <p className="text-lg text-neutral-300 mb-8">
              Premium automotive lighting solutions for Japanese vehicles. Enhance your vehicle's visibility and style with our expert-curated collection.
            </p>
          </div>
        )}
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl animate-pulse h-96"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <div key={product.id} className="group">
                <div className="relative mb-2">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-primary text-white text-xs font-medium">
                      <BadgeAlert className="h-3 w-3 mr-1" />
                      New Arrival
                    </span>
                  </div>
                  <ProductCard product={product} />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-primary font-bold mt-1">${product.price.toFixed(2)}</p>
                  <Button variant="outline" size="sm" className="mt-3 rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary">
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!hideTitle && (
          <div className="text-center mt-16">
            <Button 
              asChild 
              size="lg" 
              className="rounded-full shadow-lg shadow-primary/20 group"
            >
              <Link href="/products" className="flex items-center gap-2">
                Explore All Products
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
