import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { CheckCircle, Home, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutSuccessPage = () => {
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'processing' | 'error'>('processing');
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, params] = useRoute('/checkout/success');
  
  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        // Get the payment intent client secret from the URL query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const paymentIntentClientSecret = urlParams.get('payment_intent_client_secret');
        
        if (!paymentIntentClientSecret) {
          setPaymentStatus('error');
          setIsLoading(false);
          return;
        }
        
        // Initialize Stripe instance
        const stripe = await stripePromise;
        if (!stripe) {
          setPaymentStatus('error');
          setIsLoading(false);
          return;
        }
        
        // Retrieve the payment intent to check its status
        const { paymentIntent } = await stripe.retrievePaymentIntent(paymentIntentClientSecret);
        
        if (!paymentIntent) {
          setPaymentStatus('error');
          setIsLoading(false);
          return;
        }
        
        setPaymentInfo({
          id: paymentIntent.id,
          amount: (paymentIntent.amount / 100).toFixed(2),
          status: paymentIntent.status,
          date: new Date().toLocaleDateString()
        });
        
        // Set the payment status based on the payment intent status
        if (paymentIntent.status === 'succeeded') {
          setPaymentStatus('success');
          
          // Clear the cart since the purchase was successful
          const sessionId = localStorage.getItem('cart_session_id');
          if (sessionId) {
            // This would be a more sophisticated operation in a real app
            // where we would probably move items to an orders table
            console.log('Clearing cart with session ID:', sessionId);
            
            // For now we're just logging but in a real app you'd make an API call
            // await fetch(`/api/cart/${sessionId}/clear`, { method: 'POST' });
          }
        } else if (['processing', 'requires_payment_method', 'requires_confirmation'].includes(paymentIntent.status)) {
          setPaymentStatus('processing');
        } else {
          setPaymentStatus('error');
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error retrieving payment status:', error);
        setPaymentStatus('error');
        setIsLoading(false);
      }
    };
    
    fetchPaymentStatus();
  }, []);
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <h2 className="text-xl font-semibold text-white">Verifying your payment...</h2>
          <p className="text-white/70 mt-2">Please wait while we confirm your payment status.</p>
        </div>
      );
    }
    
    if (paymentStatus === 'success') {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
          <p className="text-white/70 mb-6 max-w-md">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          
          {paymentInfo && (
            <div className="w-full max-w-md bg-black/20 border border-white/10 rounded-lg p-4 mb-8">
              <h3 className="text-white font-medium mb-3">Payment Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Payment ID:</span>
                  <span className="text-white">{paymentInfo.id.substring(0, 8)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Amount:</span>
                  <span className="text-white">${paymentInfo.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Status:</span>
                  <span className="text-green-500">Paid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Date:</span>
                  <span className="text-white">{paymentInfo.date}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/">
              <Button variant="outline" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Link href="/products">
              <Button className="flex items-center bg-primary hover:bg-primary/90">
                <Package className="mr-2 h-4 w-4" />
                Shop More Products
              </Button>
            </Link>
          </div>
        </div>
      );
    }
    
    if (paymentStatus === 'processing') {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6">
            <Package className="w-12 h-12 text-yellow-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Payment Processing</h2>
          <p className="text-white/70 mb-6 max-w-md">
            Your payment is currently being processed. This may take a moment. Please do not close this page.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/">
              <Button variant="outline" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Go to Home
              </Button>
            </Link>
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <Package className="w-12 h-12 text-red-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Payment Issue</h2>
        <p className="text-white/70 mb-6 max-w-md">
          We encountered an issue with your payment. Please try again or contact our support team for assistance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/cart">
            <Button variant="outline" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Return to Cart
            </Button>
          </Link>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container max-w-3xl mx-auto px-4 py-16">
      <div className="bg-black/20 border border-white/10 rounded-lg p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;