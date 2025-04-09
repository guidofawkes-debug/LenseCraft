import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";

interface WhatsAppButtonProps {
  message?: string;
  buttonText?: string;
  productName?: string;
  className?: string;
}

const WhatsAppButton = ({ 
  message, 
  buttonText = "Chat on WhatsApp", 
  productName, 
  className 
}: WhatsAppButtonProps) => {
  
  // Format the WhatsApp message
  const formattedMessage = productName 
    ? `Hello, I'm interested in the ${productName}. Please provide more information.` 
    : message || "Hello, I'd like to inquire about your products";
    
  // Create the WhatsApp link
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedMessage)}`;
  
  return (
    <Button 
      variant="secondary" 
      className={cn("inline-flex items-center", className)}
      asChild
    >
      <a 
        href={whatsappLink} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <MessageCircle className="h-5 w-5 mr-2" />
        {buttonText}
      </a>
    </Button>
  );
};

export default WhatsAppButton;
