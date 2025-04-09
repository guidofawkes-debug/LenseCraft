import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Product } from "@/lib/types";
import { Heart, Star, ShoppingBag, Plus, Settings, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  hideActions?: boolean;
}

// Small gear + lens icon for products
const SmallGearLensIcon = () => (
  <div className="relative w-6 h-6 inline-block">
    <Settings className="absolute inset-0 text-primary w-6 h-6 animate-gear" />
    <div className="absolute inset-0 flex items-center justify-center">
      <Lightbulb className="w-3 h-3 text-white" />
    </div>
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

  return (
    <div 
      className="group cursor-pointer"
      onClick={handleProductClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="card-gradient hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20">
        <div className="relative">
          <div className="h-64 overflow-hidden bg-gradient-to-tr from-black to-zinc-900">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className={`w-full h-full object-cover transition-transform duration-500 ${isHovering ? 'scale-110' : 'scale-105'}`}
            />
            {/* Red tinted overlay that appears on hover */}
            <div className={`absolute inset-0 bg-primary/20 backdrop-blur-sm transition-opacity duration-300 ${isHovering ? 'opacity-40' : 'opacity-0'}`}></div>
          </div>
          
          {badge && (
            <Badge
              className={`absolute top-3 left-3 ${
                badge === 'Sale' ? 'bg-primary/90 backdrop-blur-md' : 
                badge === 'New Arrival' ? 'bg-primary/90 backdrop-blur-md' : 
                badge === 'Limited Stock' ? 'bg-primary/90 backdrop-blur-md' : 
                badge === 'Best Seller' ? 'bg-primary/90 backdrop-blur-md' : 'bg-primary/90 backdrop-blur-md'
              } px-3 py-1 rounded-full text-xs uppercase font-bold tracking-wider text-white`}
            >
              {badge}
            </Badge>
          )}
          
          {!hideActions && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-black/40 backdrop-blur-md rounded-full p-2 hover:bg-primary/30 transition-colors border border-white/10"
              onClick={handleFavorite}
            >
              <Heart className={`h-5 w-5 ${isHovering ? 'text-white' : 'text-white/70'}`} />
            </Button>
          )}
          
          {/* Quick Add button that appears on hover */}
          {!hideActions && (
            <div className={`absolute bottom-0 inset-x-0 p-4 transform transition-all duration-300 ${isHovering ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Button
                className="w-full bg-primary/90 hover:bg-primary text-white backdrop-blur-md py-6 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg"
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
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white/70 flex items-center gap-1">
              <SmallGearLensIcon /> {product.brand}
            </span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-4 w-4 ${star <= 4 ? 'text-primary' : 'text-white/20'}`} 
                  fill="currentColor" 
                />
              ))}
            </div>
          </div>
          
          <h3 className="font-bold text-xl text-white group-hover:text-primary transition-colors mb-2">{product.name}</h3>
          <p className="text-white/60 text-sm mb-4">
            Compatible: {product.compatibleVehicles[0] || "Multiple Vehicles"}
          </p>
          
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold text-2xl text-primary">${product.price.toFixed(2)}</span>
              {product.stockQuantity <= 5 && (
                <p className="text-xs text-primary/80 mt-1">Only {product.stockQuantity} left</p>
              )}
            </div>
            <div className="text-sm font-medium text-white/80 group-hover:text-primary transition-colors">View Details →</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
