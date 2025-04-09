import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Category } from "@/lib/types";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "./AnimatedBackground";
import { ArrowRight, Tag, Grid } from "lucide-react";

const Categories = () => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  const [_, navigate] = useLocation();

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground
        variant="gradient"
        className="absolute inset-0 z-0"
        height="100%"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80 z-0"></div>
      
      {/* Animated Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Grid className="h-4 w-4 inline-block mr-2" />
            CATEGORIES
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Upgrade Your Vehicle's Lighting</h2>
          <p className="text-lg text-neutral-300 leading-relaxed">
            Explore our premium Japanese lighting solutions organized by category 
            to find the perfect match for your specific vehicle make and model.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm animate-pulse h-96 rounded-3xl border border-white/10"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories?.map((category) => (
              <div 
                key={category.id} 
                className="group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
                onClick={() => navigate(`/products?category=${category.name}`)}
              >
                <div className="relative h-52 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-60 z-10 transition-opacity duration-500"></div>
                  <img 
                    src={category.imageUrl || "https://images.unsplash.com/photo-1635864702497-ba4b832245f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"} 
                    alt={category.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Product count badge */}
                  <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center z-20">
                    <Tag className="h-3 w-3 mr-1" />
                    {category.productCount} products
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-xl text-white mb-3 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-neutral-400 mb-5 line-clamp-2">
                    {category.description || `Premium ${category.name.toLowerCase()} for all Japanese vehicle models.`}
                  </p>
                  
                  <div className="flex items-center text-primary">
                    <span className="text-sm font-medium mr-2">Browse category</span>
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-16">
          <Button 
            asChild 
            size="lg" 
            className="rounded-full shadow-lg shadow-primary/20 group"
          >
            <Link href="/products" className="flex items-center gap-2">
              View All Products
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
