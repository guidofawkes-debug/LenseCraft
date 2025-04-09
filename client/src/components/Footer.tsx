import { Link } from "wouter";
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Information */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
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
            </div>
            <p className="text-neutral-400 mb-4">
              Premium automotive lighting solutions for Japanese vehicles. Enhance your vehicle's visibility and style with our expert-curated collection.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-neutral-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-neutral-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-neutral-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-neutral-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-neutral-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-neutral-400 hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=Headlights" className="text-neutral-400 hover:text-white transition-colors">
                  Headlights
                </Link>
              </li>
              <li>
                <Link href="/products?category=Tail Lights" className="text-neutral-400 hover:text-white transition-colors">
                  Tail Lights
                </Link>
              </li>
              <li>
                <Link href="/products?category=Signal Lights" className="text-neutral-400 hover:text-white transition-colors">
                  Signal Lights
                </Link>
              </li>
              <li>
                <Link href="/products?category=Fog Lights" className="text-neutral-400 hover:text-white transition-colors">
                  Fog Lights
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-neutral-400 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-neutral-400 mt-0.5" />
                <span className="text-neutral-400">0719 377 137</span>
              </li>
              <li className="flex items-start">
                <MessageCircle className="h-5 w-5 mr-2 text-neutral-400 mt-0.5" />
                <span className="text-neutral-400">0772 377 137</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-neutral-400 mt-0.5" />
                <span className="text-neutral-400">info@thelenseshop.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-neutral-400 mt-0.5" />
                <span className="text-neutral-400">123 Lighting Road, Harare, Zimbabwe</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} The Lense Shop. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
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
