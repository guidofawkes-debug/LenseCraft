import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import AnimatedBackground from './AnimatedBackground';
import { ArrowRight, Truck, CheckCircle, HeadsetIcon, Lightbulb } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Dark Background with Light Effect */}
      <div className="absolute inset-0 bg-black z-0">
        <div className="absolute w-full h-full bg-[url('https://images.unsplash.com/photo-1544361591-14e995d97a75?q=80&w=2148&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
      </div>
      
      {/* Light streak effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 -right-1/4 w-[40rem] h-24 bg-primary/20 rounded-full blur-3xl rotate-[25deg] animate-pulse"></div>
        <div className="absolute bottom-1/3 -left-1/4 w-[30rem] h-16 bg-[#00A3FF]/20 rounded-full blur-3xl -rotate-[15deg] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-[20rem] h-12 bg-[#FFBF00]/15 rounded-full blur-3xl rotate-[45deg] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <div className="text-center md:text-left">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm">JAPANESE VEHICLE LIGHTING SPECIALISTS</span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-gradient">
              Let there be light
            </h1>
            <p className="mb-8 text-lg text-white/80 md:text-xl leading-relaxed">
              Premium automotive lighting solutions for Japanese vehicles. Enhance your vehicle's visibility and style with our expert-curated collection.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              <div className="flex flex-col items-center md:items-start bg-black/40 p-4 rounded-lg backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all">
                <div className="flex items-center mb-2">
                  <Truck className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm font-medium text-white">Fast Delivery</span>
                </div>
                <span className="text-xs text-white/60">Nationwide shipping available</span>
              </div>
              <div className="flex flex-col items-center md:items-start bg-black/40 p-4 rounded-lg backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm font-medium text-white">Genuine Products</span>
                </div>
                <span className="text-xs text-white/60">100% authentic guarantee</span>
              </div>
              <div className="flex flex-col items-center md:items-start bg-black/40 p-4 rounded-lg backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all">
                <div className="flex items-center mb-2">
                  <HeadsetIcon className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm font-medium text-white">Expert Support</span>
                </div>
                <span className="text-xs text-white/60">WhatsApp & phone support</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center md:justify-start">
              <Button asChild size="lg" className="rounded-full text-base shadow-lg shadow-primary/30 btn-glow bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary group">
                <Link href="/products" className="flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-base border-white/20 hover:bg-primary/10 hover:border-primary/30">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          
          {/* Stylized image with car headlights */}
          <div className="hidden md:block relative">
            <div className="relative overflow-hidden p-1 rounded-[2rem] border border-white/10 shadow-xl lens-flare">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-primary/20 to-transparent"></div>
              <div className="absolute inset-0 bg-grid-white/[0.03] rounded-[2rem]"></div>
              <img 
                src="https://images.unsplash.com/photo-1590838868821-963ce8e85845?q=80&w=2940&auto=format&fit=crop" 
                alt="Premium car headlights" 
                className="w-full h-full rounded-[calc(2rem-4px)] object-cover"
              />
              
              {/* Light glow effect */}
              <div className="absolute left-[15%] top-1/3 w-20 h-20 bg-primary/80 rounded-full blur-2xl mix-blend-screen"></div>
              <div className="absolute right-[15%] top-1/3 w-20 h-20 bg-primary/80 rounded-full blur-2xl mix-blend-screen"></div>
            </div>
            
            {/* Decorative light elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/30 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-0 transform -translate-x-1/2 w-32 h-32 bg-[#FFBF00]/20 rounded-full blur-2xl"></div>
            
            {/* Label overlay */}
            <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-white">Premium Japanese Lighting</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;