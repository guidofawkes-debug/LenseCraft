import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import WhatsAppButton from "@/components/WhatsAppButton";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactPage = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    // In a real implementation, this would send the data to your backend
    // Since we don't have a backend endpoint for this form, we'll just simulate success
    
    toast({
      title: "Message sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });
    
    form.reset();
  };

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative bg-black text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1545239712-a8ff22e8321e?auto=format&fit=crop&q=80" 
            alt="Contact Us" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl mb-8">
              Our specialists are here to help you find the perfect lighting solution for your Japanese vehicle.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info and Form */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold font-heading mb-6">Get In Touch</h2>
            <p className="text-white/80 mb-8">
              We're here to answer any questions you may have about our products. Feel free to reach out through any of the following channels.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-[#E53935]/20 p-3 rounded-full mr-4 shadow-[0_0_10px_rgba(229,57,53,0.25)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E53935]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-1">Phone</h3>
                  <p className="text-white/70">0719 377 137</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#E53935]/20 p-3 rounded-full mr-4 shadow-[0_0_10px_rgba(229,57,53,0.25)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E53935]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-1">WhatsApp</h3>
                  <p className="text-white/70">0772 377 137</p>
                  <div className="mt-3">
                    <WhatsAppButton className="w-full md:w-auto" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#E53935]/20 p-3 rounded-full mr-4 shadow-[0_0_10px_rgba(229,57,53,0.25)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E53935]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-1">Email</h3>
                  <p className="text-white/70">info@thelenseshop.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#E53935]/20 p-3 rounded-full mr-4 shadow-[0_0_10px_rgba(229,57,53,0.25)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E53935]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-1">Location</h3>
                  <p className="text-white/70">123 Lighting Road, Harare, Zimbabwe</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 rounded-lg overflow-hidden h-64 shadow-[0_0_20px_rgba(229,57,53,0.2)] border border-[#E53935]/30">
              {/* This would be a Google Map in a real implementation */}
              <div className="h-full bg-black/40 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#E53935] to-transparent pointer-events-none"></div>
                <span className="text-white/70 text-lg font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E53935] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Interactive Map Coming Soon
                </span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold font-heading mb-6">Send a Message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            rows={5}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#E53935] hover:bg-[#c62828] text-white font-medium transition-all"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-black/90 py-16 border-t border-[#E53935]/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-heading mb-10 text-center text-white">Business Hours</h2>
          
          <div className="max-w-2xl mx-auto bg-black/70 rounded-lg shadow-[0_0_15px_rgba(229,57,53,0.2)] overflow-hidden border border-[#E53935]/30">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E53935]/20">
              <div className="p-6">
                <h3 className="font-heading font-bold text-lg mb-4 text-white">Weekdays</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-white/70">Monday</span>
                    <span className="font-medium text-white">8:30 AM - 5:30 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/70">Tuesday</span>
                    <span className="font-medium text-white">8:30 AM - 5:30 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/70">Wednesday</span>
                    <span className="font-medium text-white">8:30 AM - 5:30 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/70">Thursday</span>
                    <span className="font-medium text-white">8:30 AM - 5:30 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/70">Friday</span>
                    <span className="font-medium text-white">8:30 AM - 5:30 PM</span>
                  </li>
                </ul>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-lg mb-4 text-white">Weekends & Holidays</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-white/70">Saturday</span>
                    <span className="font-medium text-white">9:00 AM - 2:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/70">Sunday</span>
                    <span className="font-medium text-white">Closed</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/70">Public Holidays</span>
                    <span className="font-medium text-white">Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
