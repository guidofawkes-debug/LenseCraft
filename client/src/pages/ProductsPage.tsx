import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const ProductsPage = () => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [makeFilter, setMakeFilter] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortOption, setSortOption] = useState("featured");

  // Fetch products with filters
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', categoryFilter, makeFilter, sortOption],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (categoryFilter) queryParams.append('category', categoryFilter);
      if (makeFilter) queryParams.append('make', makeFilter);
      
      const response = await fetch(`/api/products?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    }
  });

  // Fetch categories for filter
  const { data: categories } = useQuery<{id: number, name: string}[]>({
    queryKey: ['/api/categories'],
  });

  // Fetch vehicle makes for filter
  const { data: vehicleMakes } = useQuery<{id: number, name: string}[]>({
    queryKey: ['/api/vehicle-makes'],
  });

  // Filter and sort products
  const filteredProducts = products?.filter(product => {
    // Price filter
    return product.price >= priceRange[0] && product.price <= priceRange[1];
  }) || [];

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    // Default is "featured"
    return b.featured ? 1 : -1;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-heading mb-6">Our Products</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {categories?.map(category => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox 
                      id={`category-${category.id}`} 
                      checked={categoryFilter === category.name}
                      onCheckedChange={(checked) => {
                        setCategoryFilter(checked ? category.name : null);
                      }}
                    />
                    <Label htmlFor={`category-${category.id}`} className="ml-2">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Vehicle Make</h3>
              <div className="space-y-2">
                {vehicleMakes?.map(make => (
                  <div key={make.id} className="flex items-center">
                    <Checkbox 
                      id={`make-${make.id}`} 
                      checked={makeFilter === make.name}
                      onCheckedChange={(checked) => {
                        setMakeFilter(checked ? make.name : null);
                      }}
                    />
                    <Label htmlFor={`make-${make.id}`} className="ml-2">
                      {make.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <Slider
                defaultValue={[0, 500]}
                max={500}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-neutral-600">
              {sortedProducts.length} products found
            </span>
            <div className="flex items-center">
              <span className="mr-2 text-sm">Sort by:</span>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-100 animate-pulse h-80 rounded-lg"></div>
              ))}
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-neutral-700">No products found</h3>
              <p className="text-neutral-500 mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
