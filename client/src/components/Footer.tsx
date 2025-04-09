import { Link } from "wouter";
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Settings,
  Lightbulb,
  Clock
} from "lucide-react";

// Footer logo with gear and lens
const FooterLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="relative w-10 h-10">
      <Settings className="absolute inset-0 text-primary w-10 h-10 animate-gear" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Lightbulb className="w-5 h-5 text-white" />
      </div>
    </div>
    <div className="flex flex-col">
      <span className="text-lg font-bold text-white">The Lense Shop</span>
      <span className="text-xs text-primary/80 font-light -mt-1">Let there be light</span>
    </div>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand Information */}
          <div>
            <FooterLogo />
            <p className="text-white/70 my-6">
              Premium automotive lighting solutions for Japanese vehicles. Our brand focuses on technical reliability and performance-driven solutions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-white/50 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-white/50 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-white/50 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-white/50 hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <span className="w-8 h-px bg-primary mr-3"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/70 hover:text-primary transition-colors flex items-center">
                  <span className="w-4 h-px bg-primary/50 mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/70 hover:text-primary transition-colors flex items-center">
                  <span className="w-4 h-px bg-primary/50 mr-2"></span>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-primary transition-colors flex items-center">
                  <span className="w-4 h-px bg-primary/50 mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-primary transition-colors flex items-center">
                  <span className="w-4 h-px bg-primary/50 mr-2"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-white/70 hover:text-primary transition-colors flex items-center">
                  <span className="w-4 h-px bg-primary/50 mr-2"></span>
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <span className="w-8 h-px bg-primary mr-3"></span>
              Products
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products?category=Headlights" className="text-white/70 hover:text-primary transition-colors flex items-center">
                  <span className="w-4 h-px bg-primary/50 mr-2"></span>
                  Headlights
                </Link>
              </li>
              <li>
                <Link href="/products?category=Tail Lights" className="text-white/70 hover:text-primary transition-colors flex items-center">
                  <span className="w-4 h-px bg-primary/50 mr-2"></span>
                  Tail Lights
                </Link>
              </li>
              <li>
                <Link href="/products?category=Signal Lights" className="text-white/70 hover:text-primary transition-colors flex items-center">
                  <span className="w-4 h-px bg-primary/50 mr-2"></span>
                  Signal Lights
                </Link>
              </li>
              <li>
                <Link href="/products?category=Fog Lights" className="text-white/70 hover:text-primary transition-colors flex items-center">
                  <span className="w-4 h-px bg-primary/50 mr-2"></span>
                  Fog Lights
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/70 hover:text-primary transition-colors flex items-center">
                  <span className="w-4 h-px bg-primary/50 mr-2"></span>
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <span className="w-8 h-px bg-primary mr-3"></span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="bg-primary/10 p-2 rounded-full mr-3 group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="text-white/50 text-sm block">Phone</span>
                  <a href="tel:0719377137" className="text-white/90 hover:text-primary transition-colors">0719 377 137</a>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="bg-primary/10 p-2 rounded-full mr-3 group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="text-white/50 text-sm block">WhatsApp</span>
                  <a href="https://wa.me/0772377137" className="text-white/90 hover:text-primary transition-colors">0772 377 137</a>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="bg-primary/10 p-2 rounded-full mr-3 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="text-white/50 text-sm block">Email</span>
                  <a href="mailto:info@thelenseshop.com" className="text-white/90 hover:text-primary transition-colors">info@thelenseshop.com</a>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="bg-primary/10 p-2 rounded-full mr-3 group-hover:bg-primary/20 transition-colors">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="text-white/50 text-sm block">Business Hours</span>
                  <span className="text-white/90">Mon-Sat: 8am - 6pm</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} The Lense Shop. All rights reserved. Japanese‑vehicle spares & accessories specialist
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/50 hover:text-primary transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-white/50 hover:text-primary transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-white/50 hover:text-primary transition-colors text-sm">
                Shipping Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
