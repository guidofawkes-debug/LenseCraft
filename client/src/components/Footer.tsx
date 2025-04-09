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
  Lightbulb,
  Clock,
  Car,
  Zap,
  LifeBuoy
} from "lucide-react";

// Footer logo with lens icon
const FooterLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#FF5A00] to-[#FFBF00]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-bl from-[#00A3FF]/20 to-transparent mix-blend-overlay"></div>
    </div>
    <div className="flex flex-col">
      <span className="text-lg font-bold text-white">The Lense Shop</span>
      <span className="text-xs text-primary/90 font-light -mt-1">Let there be light</span>
    </div>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black via-black to-black text-white pt-16 pb-8 relative overflow-hidden">
      {/* Light ray effects */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/10 to-transparent opacity-30 mix-blend-screen transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#00A3FF]/10 to-transparent opacity-30 mix-blend-screen transform -rotate-45"></div>
      
      {/* Top border with gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand Information */}
          <div>
            <FooterLogo />
            <p className="text-white/70 my-6">
              Premium automotive lighting solutions for Japanese vehicles. Our brand focuses on technical reliability and performance-driven solutions for optimal visibility and style.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white/50 hover:text-primary hover:bg-black/50 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white/50 hover:text-primary hover:bg-black/50 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white/50 hover:text-primary hover:bg-black/50 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white/50 hover:text-primary hover:bg-black/50 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <Zap className="text-primary mr-2 h-5 w-5" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/70 hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/70 hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-white/70 hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <Car className="text-primary mr-2 h-5 w-5" />
              Products
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products?category=Headlights" className="text-white/70 hover:text-primary transition-colors flex items-center group bg-black/20 rounded-full px-3 py-1 hover:bg-black/30">
                  <Lightbulb className="h-3 w-3 mr-2 text-primary" />
                  Headlights
                </Link>
              </li>
              <li>
                <Link href="/products?category=Tail Lights" className="text-white/70 hover:text-primary transition-colors flex items-center group bg-black/20 rounded-full px-3 py-1 hover:bg-black/30">
                  <Lightbulb className="h-3 w-3 mr-2 text-primary" />
                  Tail Lights
                </Link>
              </li>
              <li>
                <Link href="/products?category=Signal Lights" className="text-white/70 hover:text-primary transition-colors flex items-center group bg-black/20 rounded-full px-3 py-1 hover:bg-black/30">
                  <Lightbulb className="h-3 w-3 mr-2 text-primary" />
                  Signal Lights
                </Link>
              </li>
              <li>
                <Link href="/products?category=Fog Lights" className="text-white/70 hover:text-primary transition-colors flex items-center group bg-black/20 rounded-full px-3 py-1 hover:bg-black/30">
                  <Lightbulb className="h-3 w-3 mr-2 text-primary" />
                  Fog Lights
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/70 hover:text-primary transition-colors flex items-center group bg-black/20 rounded-full px-3 py-1 hover:bg-black/30">
                  <LifeBuoy className="h-3 w-3 mr-2 text-primary" />
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <MessageCircle className="text-primary mr-2 h-5 w-5" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start group bg-black/20 p-3 rounded-lg">
                <div className="bg-primary/10 p-2 rounded-full mr-3 group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="text-white/50 text-sm block">Phone</span>
                  <a href="tel:0719377137" className="text-white/90 hover:text-primary transition-colors">0719 377 137</a>
                </div>
              </li>
              <li className="flex items-start group bg-black/20 p-3 rounded-lg">
                <div className="bg-[#25D366]/10 p-2 rounded-full mr-3 group-hover:bg-[#25D366]/20 transition-colors">
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                </div>
                <div>
                  <span className="text-white/50 text-sm block">WhatsApp</span>
                  <a href="https://wa.me/0772377137" className="text-white/90 hover:text-[#25D366] transition-colors">0772 377 137</a>
                </div>
              </li>
              <li className="flex items-start group bg-black/20 p-3 rounded-lg">
                <div className="bg-[#00A3FF]/10 p-2 rounded-full mr-3 group-hover:bg-[#00A3FF]/20 transition-colors">
                  <Mail className="h-4 w-4 text-[#00A3FF]" />
                </div>
                <div>
                  <span className="text-white/50 text-sm block">Email</span>
                  <a href="mailto:info@thelenseshop.com" className="text-white/90 hover:text-[#00A3FF] transition-colors">info@thelenseshop.com</a>
                </div>
              </li>
              <li className="flex items-start group bg-black/20 p-3 rounded-lg">
                <div className="bg-[#FFBF00]/10 p-2 rounded-full mr-3 group-hover:bg-[#FFBF00]/20 transition-colors">
                  <Clock className="h-4 w-4 text-[#FFBF00]" />
                </div>
                <div>
                  <span className="text-white/50 text-sm block">Business Hours</span>
                  <span className="text-white/90">Mon-Sat: 8am - 6pm</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5">
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
