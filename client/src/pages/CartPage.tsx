import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { apiRequest } from "@/lib/queryClient";
import { CartItem, Product } from "@/lib/types";
import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import WhatsAppButton from "@/components/WhatsAppButton";

const CartPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  // Get session ID for cart
  useEffect(() => {
    const storedSessionId = localStorage.getItem('cart_session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('cart_session_id', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  // Fetch cart items
  const { data: cartItems, isLoading: isLoadingCart } = useQuery<CartItem[]>({
    queryKey: ['/api/cart', sessionId],
    queryFn: async () => {
      if (!sessionId) return [];
      const response = await fetch(`/api/cart/${sessionId}`);
      if (!response.ok) throw new Error('Failed to fetch cart');
      return response.json();
    },
    enabled: !!sessionId,
  });

  // Fetch product details for each cart item
  const { data: products, isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    },
  });

  // Mutation for updating cart item quantity
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      await apiRequest('PUT', `/api/cart/${id}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update cart item.",
        variant: "destructive"
      });
    }
  });

  // Mutation for removing cart item
  const removeItemMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove cart item.",
        variant: "destructive"
      });
    }
  });

  // Combine cart items with product details
  const cartWithProducts = cartItems?.map(item => {
    const product = products?.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product) || [];

  // Calculate subtotal
  const subtotal = cartWithProducts.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  // Handle quantity updates
  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    updateQuantityMutation.mutate({ id, quantity });
  };

  // Handle item removal
  const handleRemoveItem = (id: number) => {
    removeItemMutation.mutate(id);
  };

  // Handle checkout with Stripe
  const handleCheckout = () => {
    if (sessionId) {
      window.location.href = `/checkout/${sessionId}`;
    } else {
      toast({
        title: "Error",
        description: "Unable to create checkout session. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Prepare WhatsApp order message
  const getWhatsAppOrderMessage = () => {
    if (!cartWithProducts.length) return "I'd like to inquire about your products";
    
    const items = cartWithProducts.map(item => 
      `${item.product?.name} (${item.quantity} x $${item.product?.price.toFixed(2)})`
    ).join("\n- ");
    
    return `Hello, I'd like to place an order for the following items:\n- ${items}\n\nTotal: $${subtotal.toFixed(2)}`;
  };

  // Loading state
  if (isLoadingCart || isLoadingProducts) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold font-heading mb-8">Your Cart</h1>
        <div className="flex justify-center">
          <div className="animate-pulse h-40 w-full max-w-2xl bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (!cartWithProducts.length) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold font-heading mb-8">Your Cart</h1>
        <Card className="mx-auto max-w-2xl">
          <CardContent className="p-8 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-neutral-300" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-neutral-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-heading mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {cartWithProducts.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                    <div className="h-24 w-24 bg-neutral-100 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product?.imageUrl} 
                        alt={item.product?.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium mb-1">{item.product?.name}</h3>
                          <p className="text-sm text-neutral-500 mb-2">{item.product?.brand}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-neutral-400 hover:text-red-500"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border rounded-md">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <span className="font-bold">
                          ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="space-y-3">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 py-6 text-lg font-semibold"
                  onClick={handleCheckout}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Pay with Stripe
                </Button>
                
                <WhatsAppButton 
                  message={getWhatsAppOrderMessage()}
                  buttonText="Order via WhatsApp"
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
