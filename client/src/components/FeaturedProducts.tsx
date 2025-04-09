import { useQuery } from "@tanstack/react-query";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

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
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {!hideTitle && (
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-heading">Featured Products</h2>
              <p className="text-neutral-600 mt-2">Our most popular lighting solutions</p>
            </div>
            <Link href="/products" className="text-primary font-medium hover:underline hidden md:block">
              View All Products
            </Link>
          </div>
        )}
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-neutral-100 rounded-lg animate-pulse h-80"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {!hideTitle && (
          <div className="text-center mt-8 md:hidden">
            <Button asChild variant="link" className="text-primary">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
