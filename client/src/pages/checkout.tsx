import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft, CreditCard } from "lucide-react";
import { Link } from 'wouter';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [, navigate] = useLocation();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/checkout/success",
        },
      });
  
      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message || "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Payment Error",
        description: "There was a problem processing your payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-black/20 border border-white/10 rounded-lg p-6">
        <PaymentElement />
      </div>
      
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="w-full py-6 text-lg flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Pay Now
          </>
        )}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const { toast } = useToast();
  const [match, params] = useRoute('/checkout/:sessionId');
  const sessionId = match ? params.sessionId : null;

  useEffect(() => {
    if (!sessionId) {
      setError("No cart session provided");
      setIsLoading(false);
      return;
    }

    async function fetchCartAndCreatePaymentIntent() {
      try {
        // 1. Fetch cart items for the session
        const cartResponse = await fetch(`/api/cart/${sessionId}`);
        if (!cartResponse.ok) throw new Error("Failed to fetch cart");
        const cartItems = await cartResponse.json();
        
        if (!cartItems.length) {
          setError("Your cart is empty");
          setIsLoading(false);
          return;
        }

        // Calculate total amount from cart items
        const totalAmount = cartItems.reduce((total: number, item: any) => {
          return total + (item.product.price * item.quantity);
        }, 0);

        // Set order details for display
        setOrderDetails({
          items: cartItems,
          total: totalAmount
        });

        // 2. Create payment intent with the total amount
        const response = await apiRequest("POST", "/api/create-payment-intent", { 
          amount: totalAmount,
          cartSessionId: sessionId
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create payment");
        }
        
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Payment initialization error:", err);
        toast({
          title: "Error",
          description: (err as Error).message || "Failed to initialize payment",
          variant: "destructive"
        });
        setError((err as Error).message || "Payment initialization failed");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCartAndCreatePaymentIntent();
  }, [sessionId, toast]);

  return (
    <div className="container max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/cart" className="inline-flex items-center text-white/70 hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold text-white">Checkout</h1>
        <p className="text-white/70 mt-1">Complete your purchase securely with Stripe</p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-white/70">Preparing your checkout...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
          <p className="text-white mb-4">{error}</p>
          <Link href="/cart">
            <Button variant="outline" className="mx-auto">
              Return to Cart
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {orderDetails && (
            <div className="mb-8 bg-black/20 border border-white/10 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-white/10 bg-black/30">
                <h2 className="text-white font-semibold flex items-center">
                  <ShoppingBag className="w-4 h-4 mr-2 text-primary" />
                  Order Summary
                </h2>
              </div>
              <div className="p-4">
                <ul className="divide-y divide-white/10">
                  {orderDetails.items.map((item: any) => (
                    <li key={item.id} className="py-3 flex justify-between">
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.product.name}</p>
                        <p className="text-white/60 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-white">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 border-t border-white/10 bg-black/30 flex justify-between">
                <p className="text-white font-semibold">Total</p>
                <p className="text-white font-semibold">${orderDetails.total.toFixed(2)}</p>
              </div>
            </div>
          )}

          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night' } }}>
              <CheckoutForm />
            </Elements>
          )}
        </>
      )}
    </div>
  );
}