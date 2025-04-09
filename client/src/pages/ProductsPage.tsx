import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Filter, Tag, Car, DollarSign, Search, X } from "lucide-react";

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

  // Clear all filters
  const clearFilters = () => {
    setCategoryFilter(null);
    setMakeFilter(null);
    setPriceRange([0, 500]);
  };

  return (
    <div className="bg-black py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2 text-white">
          <span className="text-[#E53935]">Products</span> Collection
        </h1>
        <p className="text-white/70 mb-8">
          Browse our collection of high-quality lighting products for Japanese vehicles
        </p>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-black border border-white/10 p-5 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-white flex items-center">
                  <Filter className="h-5 w-5 text-[#E53935] mr-2" />
                  Filters
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-white hover:text-[#E53935] hover:bg-black/50"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
              
              <Separator className="my-4 bg-white/10" />
              
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-white flex items-center text-sm">
                  <Tag className="h-4 w-4 text-[#E53935] mr-2" />
                  CATEGORIES
                </h3>
                <div className="space-y-2">
                  {categories?.map(category => (
                    <div key={category.id} className="flex items-center bg-black/40 p-2 rounded-lg hover:bg-[#E53935]/10 transition">
                      <Checkbox 
                        id={`category-${category.id}`} 
                        checked={categoryFilter === category.name}
                        onCheckedChange={(checked) => {
                          setCategoryFilter(checked ? category.name : null);
                        }}
                        className="border-[#E53935]/50 data-[state=checked]:bg-[#E53935] data-[state=checked]:text-white"
                      />
                      <Label htmlFor={`category-${category.id}`} className="ml-2 text-white cursor-pointer">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-4 bg-white/10" />
              
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-white flex items-center text-sm">
                  <Car className="h-4 w-4 text-[#E53935] mr-2" />
                  VEHICLE MAKE
                </h3>
                <div className="space-y-2">
                  {vehicleMakes?.map(make => (
                    <div key={make.id} className="flex items-center bg-black/40 p-2 rounded-lg hover:bg-[#E53935]/10 transition">
                      <Checkbox 
                        id={`make-${make.id}`} 
                        checked={makeFilter === make.name}
                        onCheckedChange={(checked) => {
                          setMakeFilter(checked ? make.name : null);
                        }}
                        className="border-[#E53935]/50 data-[state=checked]:bg-[#E53935] data-[state=checked]:text-white"
                      />
                      <Label htmlFor={`make-${make.id}`} className="ml-2 text-white cursor-pointer">
                        {make.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-4 bg-white/10" />
              
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-white flex items-center text-sm">
                  <DollarSign className="h-4 w-4 text-[#E53935] mr-2" />
                  PRICE RANGE
                </h3>
                <Slider
                  defaultValue={[0, 500]}
                  max={500}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-6"
                />
                <div className="flex justify-between text-sm text-white font-medium mt-4">
                  <span className="bg-black/40 p-1 px-3 rounded-full border border-[#E53935]/20">${priceRange[0]}</span>
                  <span className="bg-black/40 p-1 px-3 rounded-full border border-[#E53935]/20">${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-6 bg-black/40 p-3 rounded-lg border border-white/10">
              <span className="text-white/80 flex items-center">
                <Search className="h-4 w-4 mr-2 text-[#E53935]" />
                <span className="text-white font-bold">{sortedProducts.length}</span>&nbsp;products found
              </span>
              <div className="flex items-center">
                <span className="mr-2 text-sm text-white/80">Sort by:</span>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="border-[#E53935]/30 bg-black/50 text-white w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#E53935]/30 text-white">
                    <SelectItem value="featured" className="hover:bg-[#E53935]/10">Featured</SelectItem>
                    <SelectItem value="price-asc" className="hover:bg-[#E53935]/10">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc" className="hover:bg-[#E53935]/10">Price: High to Low</SelectItem>
                    <SelectItem value="newest" className="hover:bg-[#E53935]/10">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-black/20 animate-pulse h-80 rounded-lg border border-white/5"></div>
                ))}
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-black/20 rounded-lg border border-white/10">
                <h3 className="text-lg font-medium text-white">No products found</h3>
                <p className="text-white/60 mt-2">Try adjusting your filters</p>
                <Button 
                  onClick={clearFilters}
                  className="mt-4 bg-[#E53935] hover:bg-[#C62828] text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
