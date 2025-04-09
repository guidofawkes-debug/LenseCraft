import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import AnimatedBackground from './AnimatedBackground';
import { ArrowRight, Truck, CheckCircle, HeadsetIcon } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated Background */}
      <AnimatedBackground
        variant="gradient"
        className="absolute inset-0 z-0"
        height="100%"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background z-0"></div>
      
      {/* Floating elements with red theme */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 right-[10%] w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-[5%] w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-[30%] w-48 h-48 bg-primary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <div className="text-center md:text-left">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">JAPANESE VEHICLE LIGHTING SPECIALISTS</span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
              Let there be light
            </h1>
            <p className="mb-8 text-lg text-neutral-300 md:text-xl leading-relaxed">
              Premium automotive lighting solutions for Japanese vehicles. Enhance your vehicle's visibility and style with our expert-curated collection.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center mb-2">
                  <Truck className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm font-medium text-white">Fast Delivery</span>
                </div>
                <span className="text-xs text-neutral-400">Nationwide shipping available</span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm font-medium text-white">Genuine Products</span>
                </div>
                <span className="text-xs text-neutral-400">100% authentic guarantee</span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center mb-2">
                  <HeadsetIcon className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm font-medium text-white">Expert Support</span>
                </div>
                <span className="text-xs text-neutral-400">WhatsApp & phone support</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center md:justify-start">
              <Button asChild size="lg" className="rounded-full text-base shadow-lg shadow-primary/20 group">
                <Link href="/products" className="flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-base border-white/20">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          
          {/* Stylized image with new luxury car headlights */}
          <div className="hidden md:block relative">
            <div className="relative bg-gradient-to-tr from-primary/20 to-primary/5 p-1 rounded-[2rem] border border-white/10 shadow-xl backdrop-blur-sm">
              <div className="absolute inset-0 bg-grid-white/[0.02] rounded-[2rem]"></div>
              <img 
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80" 
                alt="Luxury car headlights" 
                className="w-full h-full rounded-[calc(2rem-4px)] object-cover"
              />
            </div>
            
            {/* Decorative elements with red theme */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/30 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-0 transform -translate-x-1/2 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;