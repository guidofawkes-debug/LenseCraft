import { Star, Quote, MessageSquare } from "lucide-react";
import { CUSTOMER_REVIEWS } from "@/lib/constants";
import AnimatedBackground from "./AnimatedBackground";

const CustomerReviews = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground
        variant="particles"
        className="absolute inset-0 z-0"
        height="100%"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/90 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <MessageSquare className="h-4 w-4 inline-block mr-2" />
            TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Customer Success Stories</h2>
          <p className="text-lg text-neutral-300">
            Discover how our premium Japanese lighting solutions have transformed vehicles and driving experiences across the country.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CUSTOMER_REVIEWS.map((review, index) => (
            <div 
              key={index} 
              className="group relative bg-gradient-to-b from-white/[0.07] to-transparent backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 hover:transform hover:translate-y-[-8px] hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Hover glow effect */}
              <div className="absolute -inset-px bg-gradient-to-b from-primary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
              
              <Quote className="h-10 w-10 text-primary/30 mb-4" />
              
              <div className="flex text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-neutral-600'}`} 
                    fill="currentColor" 
                  />
                ))}
              </div>
              
              <p className="text-neutral-200 mb-8 text-lg leading-relaxed">{review.comment}</p>
              
              <div className="flex items-center mt-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative h-12 w-12 rounded-full bg-gradient-to-tr from-primary/30 to-primary/10 flex items-center justify-center mr-4 border border-white/10">
                    <span className="text-white font-bold">{review.initials}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-white">{review.name}</h4>
                  <p className="text-sm text-neutral-400">{review.vehicle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
