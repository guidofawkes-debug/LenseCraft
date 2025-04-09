import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/WhatsAppButton";

const CTASection = () => {
  return (
    <section className="py-12 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">Need Expert Advice?</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Our specialists are here to help you find the perfect lighting solution for your Japanese vehicle.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button 
            variant="secondary" 
            className="bg-white text-primary hover:bg-neutral-100 font-bold"
            asChild
          >
            <a href="tel:0719377137">
              <Phone className="h-5 w-5 mr-2" />
              Call Us: 0719 377 137
            </a>
          </Button>
          
          <WhatsAppButton 
            buttonText="WhatsApp: 0772 377 137" 
            className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold"
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
