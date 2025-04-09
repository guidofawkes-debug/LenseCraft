import { 
  Package, 
  Shield, 
  LifeBuoy,
  Lightbulb,
  Zap,
  ArrowRight,
  BadgeCheck,
  Sparkles
} from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground
        variant="particles"
        className="absolute inset-0 z-0"
        height="100%"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/80 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">CRAFTED WITH EXCELLENCE</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Why Choose The Lense Shop?</h2>
          <p className="text-lg text-neutral-300">
            We combine Japanese engineering precision with cutting-edge technology to deliver premium lighting solutions that transform your driving experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group relative bg-gradient-to-b from-white/[0.07] to-transparent backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-500 hover:translate-y-[-8px]">
            {/* Card glow effect */}
            <div className="absolute -inset-px bg-gradient-to-b from-primary/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
            
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-lg blur-lg opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-primary/80 to-primary p-4 rounded-lg inline-block shadow-lg">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            
            <h3 className="font-bold text-xl mb-3 text-white">Premium Quality</h3>
            <p className="text-neutral-300 mb-4 leading-relaxed">Japanese-engineered automotive lighting that exceeds OEM standards for durability, brightness, and performance longevity.</p>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center">
                <BadgeCheck className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm text-neutral-300">High-intensity output</span>
              </div>
              <div className="flex items-center">
                <BadgeCheck className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm text-neutral-300">Weather-resistant design</span>
              </div>
            </div>
            
            <Button variant="link" className="p-0 mt-6 text-primary group-hover:underline flex items-center gap-1">
              Learn more <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Card 2 */}
          <div className="group relative bg-gradient-to-b from-white/[0.07] to-transparent backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-500 hover:translate-y-[-8px]">
            {/* Card glow effect */}
            <div className="absolute -inset-px bg-gradient-to-b from-primary/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
            
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-lg blur-lg opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-primary/80 to-primary p-4 rounded-lg inline-block shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            
            <h3 className="font-bold text-xl mb-3 text-white">Warranty Guaranteed</h3>
            <p className="text-neutral-300 mb-4 leading-relaxed">Every product comes with a comprehensive warranty and our unwavering commitment to customer satisfaction.</p>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center">
                <BadgeCheck className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm text-neutral-300">3-year warranty coverage</span>
              </div>
              <div className="flex items-center">
                <BadgeCheck className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm text-neutral-300">30-day money-back guarantee</span>
              </div>
            </div>
            
            <Button variant="link" className="p-0 mt-6 text-primary group-hover:underline flex items-center gap-1">
              Our warranty <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Card 3 */}
          <div className="group relative bg-gradient-to-b from-white/[0.07] to-transparent backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-500 hover:translate-y-[-8px]">
            {/* Card glow effect */}
            <div className="absolute -inset-px bg-gradient-to-b from-primary/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
            
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-lg blur-lg opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-primary/80 to-primary p-4 rounded-lg inline-block shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            
            <h3 className="font-bold text-xl mb-3 text-white">Easy Installation</h3>
            <p className="text-neutral-300 mb-4 leading-relaxed">Plug-and-play designs with comprehensive installation guides for quick, hassle-free setup on any vehicle.</p>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center">
                <BadgeCheck className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm text-neutral-300">Video tutorials available</span>
              </div>
              <div className="flex items-center">
                <BadgeCheck className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm text-neutral-300">Technical support included</span>
              </div>
            </div>
            
            <Button variant="link" className="p-0 mt-6 text-primary group-hover:underline flex items-center gap-1">
              Installation guides <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/20 group">
            <Link href="/products" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Explore Our Products
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
