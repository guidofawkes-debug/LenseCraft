import { useState } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Product } from "@/lib/types";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  hideActions?: boolean;
}

const ProductCard = ({ product, hideActions = false }: ProductCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
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

  // Get the first tag to display as a badge
  const badge = product.tags && product.tags.length > 0 ? product.tags[0] : null;

  return (
    <Link href={`/product/${product.id}`}>
      <a 
        className="product-card bg-white rounded-lg overflow-hidden border border-neutral-200 hover:border-primary transition-colors block"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative">
          <div className="h-48 overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className={`w-full h-full object-cover transition-transform duration-300 ${isHovering ? 'scale-105' : ''}`}
            />
          </div>
          
          {badge && (
            <Badge
              className={`absolute top-2 left-2 ${
                badge === 'Sale' ? 'bg-green-600' : 
                badge === 'New Arrival' ? 'bg-primary' : 
                badge === 'Limited Stock' ? 'bg-neutral-800' : 
                badge === 'Best Seller' ? 'bg-primary' : 'bg-primary'
              }`}
            >
              {badge}
            </Badge>
          )}
          
          {!hideActions && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow hover:bg-neutral-100"
              onClick={handleFavorite}
            >
              <Heart className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-2">
            <span className="text-sm text-neutral-600 mr-2">{product.brand}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400' : 'text-neutral-300'}`} 
                  fill="currentColor" 
                />
              ))}
            </div>
          </div>
          
          <h3 className="font-heading font-bold text-lg mb-2">{product.name}</h3>
          <p className="text-neutral-600 text-sm mb-4">
            {product.compatibleVehicles[0] || "Multiple Vehicles"}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
            {!hideActions && (
              <Button
                className="bg-primary hover:bg-primary-dark text-white rounded-md py-2 px-3 text-sm font-medium"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
