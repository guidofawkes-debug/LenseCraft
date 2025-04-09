import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Menu, X, Phone, MessageCircle, ShoppingBag } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetClose 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/lib/types";

const Navbar = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Get cart session ID
  useEffect(() => {
    const storedSessionId = localStorage.getItem('cart_session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, []);

  // Fetch cart items count
  const { data: cartItems } = useQuery<CartItem[]>({
    queryKey: ['/api/cart', sessionId],
    queryFn: async () => {
      if (!sessionId) return [];
      const response = await fetch(`/api/cart/${sessionId}`);
      if (!response.ok) throw new Error('Failed to fetch cart');
      return response.json();
    },
    enabled: !!sessionId,
  });

  // Calculate total cart items
  const cartItemsCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // Handle scroll events to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-md">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" 
                />
              </svg>
            </div>
            <span className="text-lg font-bold font-heading">The Lense Shop</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`font-medium hover:text-primary transition-colors ${location === '/' ? 'text-primary' : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className={`font-medium hover:text-primary transition-colors ${location === '/products' ? 'text-primary' : ''}`}
            >
              Products
            </Link>
            <Link 
              href="/about" 
              className={`font-medium hover:text-primary transition-colors ${location === '/about' ? 'text-primary' : ''}`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`font-medium hover:text-primary transition-colors ${location === '/contact' ? 'text-primary' : ''}`}
            >
              Contact
            </Link>
          </nav>
          
          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <a 
              href="tel:0719377137" 
              className="hidden md:flex items-center text-sm font-medium hover:text-primary transition-colors"
            >
              <Phone className="h-5 w-5 mr-1" />
              0719 377 137
            </a>
            <a 
              href="https://wa.me/0772377137" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center text-sm font-medium hover:text-primary transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-1" />
              WhatsApp
            </a>
            
            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <ShoppingBag className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Sheet */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="right">
          <SheetHeader className="mb-6">
            <SheetTitle>Menu</SheetTitle>
            <SheetClose className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </SheetHeader>
          
          <div className="flex flex-col space-y-4">
            <SheetClose asChild>
              <Link 
                href="/" 
                className={`py-2 font-medium text-lg ${location === '/' ? 'text-primary' : ''}`}
              >
                Home
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link 
                href="/products" 
                className={`py-2 font-medium text-lg ${location === '/products' ? 'text-primary' : ''}`}
              >
                Products
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link 
                href="/about" 
                className={`py-2 font-medium text-lg ${location === '/about' ? 'text-primary' : ''}`}
              >
                About
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link 
                href="/contact" 
                className={`py-2 font-medium text-lg ${location === '/contact' ? 'text-primary' : ''}`}
              >
                Contact
              </Link>
            </SheetClose>
            
            <div className="pt-4 border-t border-neutral-200">
              <SheetClose asChild>
                <Link 
                  href="/cart" 
                  className="flex items-center py-2 font-medium text-lg"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </SheetClose>
              
              <a 
                href="tel:0719377137" 
                className="flex items-center py-2 font-medium text-lg"
              >
                <Phone className="h-5 w-5 mr-2" />
                0719 377 137
              </a>
              
              <a 
                href="https://wa.me/0772377137" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center py-2 font-medium text-lg"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
