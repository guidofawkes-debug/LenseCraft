import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Category } from "@/lib/types";
import { Button } from "@/components/ui/button";

const Categories = () => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  return (
    <section className="py-12 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading">Browse by Category</h2>
            <p className="text-neutral-600 mt-2">Find the perfect lighting solution for your vehicle</p>
          </div>
          <Link href="/products" className="text-primary font-medium hover:underline hidden md:block">
            View All Categories
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-64 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories?.map((category) => (
              <Link key={category.id} href={`/products?category=${category.name}`}>
                <a className="category-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="h-40 bg-neutral-200">
                    <img 
                      src={category.imageUrl} 
                      alt={category.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-lg">{category.name}</h3>
                    <p className="text-neutral-600 text-sm">{category.productCount} products</p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        )}
        
        <div className="text-center mt-8 md:hidden">
          <Button asChild variant="link" className="text-primary">
            <Link href="/products">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
