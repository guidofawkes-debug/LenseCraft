import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import FeaturedProducts from "@/components/FeaturedProducts";
import { StarIcon, Check, Truck, ShieldCheck } from "lucide-react";

const ProductDetailPage = () => {
  const [_, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { toast } = useToast();

  // Generate a session ID for cart (normally this would be from auth or cookies)
  const getSessionId = () => {
    let sessionId = localStorage.getItem('cart_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('cart_session_id', sessionId);
    }
    return sessionId;
  };

  // Fetch product details
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await apiRequest('POST', '/api/cart', {
        sessionId: getSessionId(),
        productId: product.id,
        quantity
      });
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart.",
        variant: "destructive"
      });
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    setLocation('/cart');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2 h-96 bg-gray-100 animate-pulse rounded-lg"></div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-8 bg-gray-100 animate-pulse rounded w-3/4"></div>
            <div className="h-6 bg-gray-100 animate-pulse rounded w-1/4"></div>
            <div className="h-24 bg-gray-100 animate-pulse rounded"></div>
            <div className="h-12 bg-gray-100 animate-pulse rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <p className="mt-4 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
        <Button 
          className="mt-6" 
          onClick={() => setLocation('/products')}
        >
          Back to Products
        </Button>
      </div>
    );
  }

  // Multiple images simulation (normally would come from product.images array)
  const productImages = [
    product.imageUrl,
    "https://images.unsplash.com/photo-1542683405-1e401b968254?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1514913438761-b5d469728b6e?auto=format&fit=crop&q=80"
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Product Images */}
          <div className="w-full md:w-1/2">
            <div className="mb-4 rounded-lg overflow-hidden bg-neutral-100 h-[400px]">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {productImages.map((img, index) => (
                <div 
                  key={index}
                  className={`h-24 rounded-md overflow-hidden border-2 cursor-pointer transition-all
                    ${selectedImage === index ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.name} view ${index+1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="w-full md:w-1/2">
            {product.tags && product.tags.length > 0 && (
              <span className="inline-block bg-primary text-white text-xs font-bold py-1 px-2 rounded mb-4">
                {product.tags[0]}
              </span>
            )}
            
            <h1 className="text-3xl font-bold font-heading mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <span className="text-sm text-neutral-600 mr-2">{product.brand}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon 
                    key={star} 
                    className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400' : 'text-neutral-300'}`} 
                    fill="currentColor" 
                  />
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <span className="font-bold text-2xl mr-2">${product.price.toFixed(2)}</span>
              {product.tags?.includes('Sale') && (
                <span className="text-neutral-500 line-through text-lg">${(product.price * 1.2).toFixed(2)}</span>
              )}
            </div>
            
            <p className="text-neutral-700 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Compatible Vehicles:</h3>
              <ul className="list-disc pl-5 text-neutral-600">
                {product.compatibleVehicles.map((vehicle, index) => (
                  <li key={index}>{vehicle}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center text-sm text-neutral-600 mb-2">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                <span>In stock: {product.stockQuantity} available</span>
              </div>
              <div className="flex items-center text-sm text-neutral-600 mb-2">
                <Truck className="w-4 h-4 text-primary mr-2" />
                <span>Free shipping nationwide</span>
              </div>
              <div className="flex items-center text-sm text-neutral-600">
                <ShieldCheck className="w-4 h-4 text-blue-500 mr-2" />
                <span>100% authentic guarantee</span>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <span className="mr-4">Quantity:</span>
                <div className="flex items-center">
                  <button 
                    className="w-8 h-8 bg-neutral-100 rounded-l-md flex items-center justify-center"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="w-12 h-8 bg-white border-y border-neutral-100 flex items-center justify-center">
                    {quantity}
                  </span>
                  <button 
                    className="w-8 h-8 bg-neutral-100 rounded-r-md flex items-center justify-center"
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="flex-1 bg-primary hover:bg-primary-dark text-white"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button 
                  className="flex-1" 
                  variant="outline"
                  size="lg"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
                <WhatsAppButton 
                  productName={product.name}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Specifications */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold font-heading mb-6">Specifications</h2>
          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-4 border-b md:border-r md:border-b-0 border-neutral-200">
                <h3 className="font-medium text-neutral-700 mb-2">Product Details</h3>
                <ul className="space-y-2">
                  <li className="grid grid-cols-2">
                    <span className="text-neutral-500">Brand</span>
                    <span>{product.brand}</span>
                  </li>
                  <li className="grid grid-cols-2">
                    <span className="text-neutral-500">Category</span>
                    <span>{product.category}</span>
                  </li>
                  <li className="grid grid-cols-2">
                    <span className="text-neutral-500">Condition</span>
                    <span>New</span>
                  </li>
                  <li className="grid grid-cols-2">
                    <span className="text-neutral-500">Warranty</span>
                    <span>1 Year</span>
                  </li>
                </ul>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-neutral-700 mb-2">Technical Specifications</h3>
                <ul className="space-y-2">
                  <li className="grid grid-cols-2">
                    <span className="text-neutral-500">Light Type</span>
                    <span>LED</span>
                  </li>
                  <li className="grid grid-cols-2">
                    <span className="text-neutral-500">Power</span>
                    <span>35W</span>
                  </li>
                  <li className="grid grid-cols-2">
                    <span className="text-neutral-500">Voltage</span>
                    <span>12V DC</span>
                  </li>
                  <li className="grid grid-cols-2">
                    <span className="text-neutral-500">Color Temperature</span>
                    <span>6000K</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold font-heading mb-6">You Might Also Like</h2>
          <FeaturedProducts hideTitle />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
