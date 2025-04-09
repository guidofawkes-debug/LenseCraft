import { useQuery } from "@tanstack/react-query";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import AnimatedBackground from "./AnimatedBackground";
import { ArrowRight, Sparkles } from "lucide-react";

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
      {/* Animated Background */}
      <AnimatedBackground
        variant="gradient"
        className="absolute inset-0 z-0"
        height="100%"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/90 z-0"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 top-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -left-1/3 bottom-1/4 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {!hideTitle && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4 inline-block mr-2" />
              TOP SELLERS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Premium Lighting Solutions</h2>
            <p className="text-lg text-neutral-300 mb-8">
              Handpicked selection of our most popular Japanese-engineered lighting products, designed for performance and style.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
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
