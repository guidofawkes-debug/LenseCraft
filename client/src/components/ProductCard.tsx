import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Product } from "@/lib/types";
import { Heart, Star, ShoppingBag, Plus, Lightbulb, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  hideActions?: boolean;
}

// Light beam icon for products
const LightIcon = () => (
  <div className="relative w-6 h-6 inline-flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF5A00] to-[#FFBF00] opacity-20"></div>
    <Lightbulb className="w-5 h-5 text-primary" />
  </div>
);

const ProductCard = ({ product, hideActions = false }: ProductCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const { toast } = useToast();
  const [_, navigate] = useLocation();

  // Generate a session ID for cart (normally this would be from auth or cookies)
  const getSessionId = () => {
    let sessionId = localStorage.getItem('cart_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('cart_session_id', sessionId);
    }
    return sessionId;
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await apiRequest('POST', '/api/cart', {
        sessionId: getSessionId(),
        productId: product.id,
        quantity: 1
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      
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

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Feature coming soon",
      description: "The wishlist feature is not yet implemented.",
    });
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Get the first tag to display as a badge
  const badge = product.tags && product.tags.length > 0 ? product.tags[0] : null;

  // Replace existing image URLs with automotive lighting focused images
  const getEnhancedImageUrl = () => {
    // Use a default automotive lighting image
    const lightingImages = [
      "https://images.unsplash.com/photo-1590838868821-963ce8e85845?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1621383460932-ac437a24b43c?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1528629297340-d1d466945dc5?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1589292074636-43ea507223d0?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=500"
    ];
    
    // Use product.id to select an image, ensuring consistent image per product
    const index = product.id % lightingImages.length;
    return lightingImages[index];
  };

  return (
    <div 
      className="group cursor-pointer lens-flare"
      onClick={handleProductClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="bg-gradient-to-b from-black/80 to-black/95 rounded-xl overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20">
        <div className="relative">
          <div className="h-64 overflow-hidden">
            {/* Orange glow effect at the top */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-primary/20 to-transparent z-10"></div>
            
            {/* Blue glow effect at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#00A3FF]/20 to-transparent z-10"></div>
            
            <img 
              src={getEnhancedImageUrl()} 
              alt={product.name} 
              className={`w-full h-full object-cover transition-transform duration-500 ${isHovering ? 'scale-110' : 'scale-105'}`}
            />
            
            {/* Color overlay that appears on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br from-primary/30 to-[#00A3FF]/30 transition-opacity duration-300 ${isHovering ? 'opacity-40' : 'opacity-0'} mix-blend-overlay`}></div>
          </div>
          
          {badge && (
            <Badge
              className={`absolute top-3 left-3 z-20 ${
                badge === 'Sale' ? 'bg-[#00A3FF]/80 backdrop-blur-md' : 
                badge === 'New Arrival' ? 'bg-primary/80 backdrop-blur-md' : 
                badge === 'Limited Stock' ? 'bg-[#FFBF00]/80 backdrop-blur-md' : 
                badge === 'Best Seller' ? 'bg-primary/80 backdrop-blur-md' : 'bg-primary/80 backdrop-blur-md'
              } px-3 py-1 rounded-full text-xs uppercase font-bold tracking-wider text-white flex items-center`}
            >
              <Zap className="h-3 w-3 mr-1" />
              {badge}
            </Badge>
          )}
          
          {!hideActions && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-md rounded-full p-2 hover:bg-primary/50 transition-colors border border-white/10"
              onClick={handleFavorite}
            >
              <Heart className={`h-5 w-5 ${isHovering ? 'text-white' : 'text-white/70'}`} />
            </Button>
          )}
          
          {/* Quick Add button that appears on hover */}
          {!hideActions && (
            <div className={`absolute bottom-0 inset-x-0 p-4 z-20 transform transition-all duration-300 ${isHovering ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Button
                className="w-full bg-gradient-to-r from-primary to-[#FFBF00]/90 hover:from-primary hover:to-[#FFBF00] text-white backdrop-blur-md py-6 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg btn-glow"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Add to Cart</span>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-white/70 flex items-center gap-2 bg-black/40 px-2 py-1 rounded-full">
              <LightIcon /> {product.brand}
            </span>
            <div className="flex bg-black/40 px-2 py-1 rounded-full">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-4 w-4 ${star <= 4 ? 'text-[#FFBF00]' : 'text-white/20'}`} 
                  fill="currentColor" 
                />
              ))}
            </div>
          </div>
          
          <h3 className="font-bold text-xl text-white group-hover:text-primary transition-colors mb-2">{product.name}</h3>
          <p className="text-white/60 text-sm mb-4 bg-black/20 px-3 py-1 rounded-md inline-block">
            Compatible: {product.compatibleVehicles[0] || "Multiple Vehicles"}
          </p>
          
          <div className="flex justify-between items-center mt-6">
            <div className="bg-gradient-to-r from-primary/10 to-transparent px-4 py-2 rounded-full">
              <span className="font-bold text-2xl text-gradient">${product.price.toFixed(2)}</span>
              {product.stockQuantity <= 5 && (
                <p className="text-xs text-primary/80 mt-1">Only {product.stockQuantity} left</p>
              )}
            </div>
            <div className="text-sm font-medium text-white/80 group-hover:text-primary transition-colors">
              <Button variant="ghost" size="sm" className="rounded-full border border-white/10 hover:bg-primary/10 hover:text-primary">
                Details →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
