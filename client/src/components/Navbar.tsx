import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Menu, X, Phone, MessageCircle, ShoppingBag, Settings, Lightbulb } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetClose 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/lib/types";

// Custom logo component with gear and lens icons
const GearLensLogo = () => (
  <div className="relative w-10 h-10">
    {/* Gear icon */}
    <Settings className="absolute inset-0 text-primary w-10 h-10 animate-gear" />
    {/* Lens/Light icon overlay */}
    <div className="absolute inset-0 flex items-center justify-center">
      <Lightbulb className="w-5 h-5 text-white" />
    </div>
  </div>
);

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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/90 backdrop-blur-md shadow-lg' 
        : 'bg-black/70 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <GearLensLogo />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">The Lense Shop</span>
              <span className="text-xs text-primary/80 font-light -mt-1">Let there be light</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`font-medium text-sm uppercase tracking-wide hover:text-primary transition-colors ${
                location === '/' ? 'text-primary' : 'text-white/80'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className={`font-medium text-sm uppercase tracking-wide hover:text-primary transition-colors ${
                location === '/products' ? 'text-primary' : 'text-white/80'
              }`}
            >
              Products
            </Link>
            <Link 
              href="/about" 
              className={`font-medium text-sm uppercase tracking-wide hover:text-primary transition-colors ${
                location === '/about' ? 'text-primary' : 'text-white/80'
              }`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`font-medium text-sm uppercase tracking-wide hover:text-primary transition-colors ${
                location === '/contact' ? 'text-primary' : 'text-white/80'
              }`}
            >
              Contact
            </Link>
          </nav>
          
          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <a 
              href="tel:0719377137" 
              className="hidden md:flex items-center text-sm font-medium text-white/80 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4 mr-1" />
              0719 377 137
            </a>
            <a 
              href="https://wa.me/0772377137" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center text-sm font-medium text-white/80 hover:text-primary transition-colors"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              WhatsApp
            </a>
            
            {/* Cart Icon */}
            <Link href="/cart" className="relative text-white/80 hover:text-primary transition-colors">
              <ShoppingBag className="h-5 w-5" />
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
              className="md:hidden text-white/80 hover:text-primary hover:bg-transparent"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Sheet */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="right" className="bg-black/95 text-white border-primary/20">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-white flex items-center space-x-2">
              <GearLensLogo />
              <span>The Lense Shop</span>
            </SheetTitle>
            <SheetClose className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-white">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </SheetHeader>
          
          <div className="flex flex-col space-y-4">
            <SheetClose asChild>
              <Link 
                href="/" 
                className={`py-2 font-medium text-lg ${location === '/' ? 'text-primary' : 'text-white/80'}`}
              >
                Home
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link 
                href="/products" 
                className={`py-2 font-medium text-lg ${location === '/products' ? 'text-primary' : 'text-white/80'}`}
              >
                Products
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link 
                href="/about" 
                className={`py-2 font-medium text-lg ${location === '/about' ? 'text-primary' : 'text-white/80'}`}
              >
                About
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link 
                href="/contact" 
                className={`py-2 font-medium text-lg ${location === '/contact' ? 'text-primary' : 'text-white/80'}`}
              >
                Contact
              </Link>
            </SheetClose>
            
            <div className="pt-4 border-t border-white/10">
              <SheetClose asChild>
                <Link 
                  href="/cart" 
                  className="flex items-center py-2 font-medium text-lg text-white/80"
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
                className="flex items-center py-2 font-medium text-lg text-white/80"
              >
                <Phone className="h-5 w-5 mr-2" />
                0719 377 137
              </a>
              
              <a 
                href="https://wa.me/0772377137" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center py-2 font-medium text-lg text-white/80"
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
