import { Phone, Smartphone, Lightbulb, ArrowRight, HeadphonesIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedBackground from "./AnimatedBackground";

// Custom logo component with gear and lens icons for CTA
const CTAGearLensIcon = () => (
  <div className="relative w-12 h-12 mx-auto mb-4">
    <Settings className="absolute inset-0 text-primary w-12 h-12 animate-gear" />
    <div className="absolute inset-0 flex items-center justify-center">
      <Lightbulb className="w-6 h-6 text-white" />
    </div>
  </div>
);

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background with Red Theme */}
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
              NEED EXPERT ADVICE?
            </span>
            <h2 className="text-gradient text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Need Expert Advice?
            </h2>
            <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
              Our specialists are here to help you find the perfect lighting solution for your Japanese vehicle. 
              Contact us for personalized recommendations and technical assistance.
            </p>
            
            <div className="space-y-5">
              <div className="flex items-start group cursor-pointer">
                <div className="bg-primary/10 p-3 rounded-full mr-4 transition-colors group-hover:bg-primary/20">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Call Us</h3>
                  <p className="text-neutral-400 mb-2">Direct phone support</p>
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
                  <h3 className="text-white font-medium text-lg">WhatsApp</h3>
                  <p className="text-neutral-400 mb-2">Quick chat support</p>
                  <a href={`https://wa.me/0772377137`} className="text-primary hover:text-primary-light transition-colors font-medium flex items-center">
                    0772 377 137 <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            {/* Card glow effect with red theme */}
            <div className="absolute -inset-1 bg-gradient-to-b from-primary/40 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
            
            <div className="card-gradient p-8 rounded-3xl hover:border-primary/20 transition-all duration-300 shadow-2xl shadow-primary/10 transform group-hover:-translate-y-1">
              <CTAGearLensIcon />
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Let there be light</h3>
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
                  Japanese‑vehicle spares & accessories specialist
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
