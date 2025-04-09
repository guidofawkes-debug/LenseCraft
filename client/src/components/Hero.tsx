import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import AnimatedBackground from './AnimatedBackground';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

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
      
      {/* Floating elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 right-[10%] w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-[5%] w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-[30%] w-48 h-48 bg-primary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <div className="text-center md:text-left">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">PREMIUM JAPANESE LIGHTING</span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
              Illuminate Your Drive With Excellence
            </h1>
            <p className="mb-8 text-lg text-neutral-400 md:text-xl leading-relaxed">
              Experience the perfect fusion of Japanese engineering, cutting-edge design, 
              and unparalleled performance in automotive lighting solutions.
            </p>
            
            <div className="flex items-center justify-center md:justify-start space-x-8 mb-12">
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm text-neutral-300">Premium Quality</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm text-neutral-300">Easy Installation</span>
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
          
          {/* Stylized image or graphic on the right */}
          <div className="hidden md:block relative">
            <div className="relative bg-gradient-to-tr from-primary/20 to-primary/5 p-1 rounded-[2rem] border border-white/10 shadow-xl backdrop-blur-sm">
              <div className="absolute inset-0 bg-grid-white/[0.02] rounded-[2rem]"></div>
              <img 
                src="https://images.unsplash.com/photo-1591278169757-deac26e49555?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80" 
                alt="Premium vehicle headlight" 
                className="w-full h-full rounded-[calc(2rem-4px)] object-cover"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/30 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-0 transform -translate-x-1/2 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;