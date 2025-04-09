import { Phone, Smartphone, MessageCircle, ArrowRight, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedBackground from "./AnimatedBackground";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground
        variant="gradient"
        className="absolute inset-0 z-0"
        height="100%"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/95 to-background/95 z-0"></div>
      
      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 top-1/4 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -left-1/4 bottom-1/4 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <HeadphonesIcon className="h-4 w-4 inline-block mr-2" />
              GET IN TOUCH
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Ready to Elevate Your Driving Experience?
            </h2>
            <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
              Our lighting experts are available to answer your questions, provide personalized recommendations, and help you select the perfect premium Japanese lighting solutions for your vehicle.
            </p>
            
            <div className="space-y-5">
              <div className="flex items-start group cursor-pointer">
                <div className="bg-primary/10 p-3 rounded-full mr-4 transition-colors group-hover:bg-primary/20">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Call Us Directly</h3>
                  <p className="text-neutral-400 mb-2">Speak with our product specialists</p>
                  <a href="tel:0719377137" className="text-primary hover:text-primary-light transition-colors font-medium flex items-center">
                    0719 377 137 <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-start group cursor-pointer">
                <div className="bg-primary/10 p-3 rounded-full mr-4 transition-colors group-hover:bg-primary/20">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">WhatsApp Support</h3>
                  <p className="text-neutral-400 mb-2">Chat with us for quick inquiries</p>
                  <a href={`https://wa.me/0772377137`} className="text-primary hover:text-primary-light transition-colors font-medium flex items-center">
                    0772 377 137 <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            {/* Card glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-b from-primary/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
            
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-primary/20 transition-all duration-300 shadow-2xl shadow-primary/5 transform group-hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Us Now</h3>
              <div className="space-y-6">
                <Button 
                  variant="default" 
                  size="lg"
                  className="w-full py-6 bg-primary hover:bg-primary/80 text-white font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3 transition-all duration-300"
                  asChild
                >
                  <a href="tel:0719377137">
                    <Phone className="h-5 w-5" />
                    Call: 0719 377 137
                  </a>
                </Button>
                
                <WhatsAppButton 
                  buttonText="WhatsApp: 0772 377 137" 
                  className="w-full py-6 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-3 transition-all duration-300"
                />
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-neutral-300 text-center">
                  Available 7 days a week, from 8:00 AM to 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
