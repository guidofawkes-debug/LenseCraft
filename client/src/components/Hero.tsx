import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import WhatsAppButton from "@/components/WhatsAppButton";

const Hero = () => {
  return (
    <section className="relative bg-black text-white">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80" 
          alt="Luxury car headlights" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">Let there be light</h1>
          <p className="text-lg md:text-xl mb-8">
            Premium automotive lighting solutions for Japanese vehicles. Enhance your vehicle's visibility and style with our expert-curated collection.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-primary hover:bg-primary-dark text-white font-bold">
              <Link href="/products">
                Shop Now
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </Link>
            </Button>
            <WhatsAppButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
