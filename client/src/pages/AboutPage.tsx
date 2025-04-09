import { Separator } from "@/components/ui/separator";
import CTASection from "@/components/CTASection";
import { Shield, Zap, Lightbulb, Award, Car, Trophy } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <div className="relative bg-black text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1592945403323-9afd58620442?auto=format&fit=crop&q=80" 
            alt="Car headlights at night" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E53935]/20 to-transparent opacity-60 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              About <span className="text-[#E53935]">The Lense Shop</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Japanese vehicle spares & accessories specialist—technical, reliable, performance-driven.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-[#E53935]">Our</span> Story
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              The Lense Shop was founded in 2018 by a group of automotive enthusiasts with a passion for Japanese vehicles and high-quality lighting solutions. What started as a small specialist shop has grown into a trusted supplier of premium automotive lighting products across the country.
            </p>
            <p className="text-white/80 mb-4 leading-relaxed">
              Our mission is to provide vehicle owners with lighting solutions that not only enhance the aesthetic appeal of their vehicles but also improve safety and performance on the road.
            </p>
            <p className="text-white/80 leading-relaxed">
              We pride ourselves on our technical expertise, customer service, and commitment to quality. Every product in our catalog is carefully selected to meet our high standards, ensuring our customers receive only the best.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="rounded-xl overflow-hidden h-full shadow-lg border border-[#E53935]/20 relative">
              <img 
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80" 
                alt="Car workshop" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 bg-black/80 px-4 py-2 rounded-lg border border-[#E53935]/30">
                <div className="text-white font-bold">Est. 2018</div>
                <div className="text-[#E53935] text-sm">Japanese Vehicle Lighting Specialists</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="max-w-5xl mx-auto bg-white/10" />

      {/* Our Values */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-2 text-center">
          <span className="text-[#E53935]">Our</span> Values
        </h2>
        <p className="text-white/60 text-center max-w-2xl mx-auto mb-10">
          What drives us to deliver the best automotive lighting solutions
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black/40 p-6 rounded-lg border border-white/10 hover:border-[#E53935]/40 transition-all text-center">
            <div className="bg-[#E53935]/10 p-4 rounded-full inline-flex mb-4 text-[#E53935]">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-white">Quality Assurance</h3>
            <p className="text-white/70">
              We source only the highest quality products from trusted manufacturers. Every product undergoes rigorous testing before it reaches our customers.
            </p>
          </div>
          
          <div className="bg-black/40 p-6 rounded-lg border border-white/10 hover:border-[#E53935]/40 transition-all text-center">
            <div className="bg-[#E53935]/10 p-4 rounded-full inline-flex mb-4 text-[#E53935]">
              <Lightbulb className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-white">Expert Support</h3>
            <p className="text-white/70">
              Our team of specialists provides personalized support to help you find the perfect lighting solution for your vehicle. We're always just a WhatsApp message away.
            </p>
          </div>
          
          <div className="bg-black/40 p-6 rounded-lg border border-white/10 hover:border-[#E53935]/40 transition-all text-center">
            <div className="bg-[#E53935]/10 p-4 rounded-full inline-flex mb-4 text-[#E53935]">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-white">Performance-Driven</h3>
            <p className="text-white/70">
              We focus on products that not only look great but also enhance the performance and safety of your vehicle, ensuring the best driving experience possible.
            </p>
          </div>
        </div>
      </div>

      <Separator className="max-w-5xl mx-auto bg-white/10" />

      {/* Our Brands */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-2 text-center">
          <span className="text-[#E53935]">Our</span> Trusted Brands
        </h2>
        <p className="text-white/60 text-center max-w-2xl mx-auto mb-10">
          We partner with the world's leading automotive lighting manufacturers to bring you the highest quality products.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black border-2 border-[#E53935] p-8 rounded-lg text-center hover:shadow-[0_0_15px_rgba(229,57,53,0.3)] transition-all">
            <h3 className="text-2xl font-bold mb-4 text-white">DEPO</h3>
            <p className="text-white/70 mb-6">
              Known for their high-quality OEM replacement parts, DEPO manufactures reliable lighting solutions that perfectly match factory specifications.
            </p>
            <div className="text-sm font-medium text-[#E53935] bg-[#E53935]/10 inline-block px-3 py-1 rounded-full">Premium Quality</div>
          </div>
          
          <div className="bg-[#E53935] p-8 rounded-lg text-center shadow-[0_0_20px_rgba(229,57,53,0.4)] transform hover:scale-105 transition-all">
            <h3 className="text-2xl font-bold mb-4 text-white">TYC</h3>
            <p className="text-white/90 mb-6">
              TYC is a global leader in automotive lighting with a reputation for precision engineering and durability that meets or exceeds OEM standards.
            </p>
            <div className="text-sm font-medium text-white bg-black/20 inline-block px-3 py-1 rounded-full">Precision Engineered</div>
          </div>
          
          <div className="bg-black border-2 border-[#E53935] p-8 rounded-lg text-center hover:shadow-[0_0_15px_rgba(229,57,53,0.3)] transition-all">
            <h3 className="text-2xl font-bold mb-4 text-white">LUCID</h3>
            <p className="text-white/70 mb-6">
              Specializing in cutting-edge LED technology, LUCID offers innovative lighting solutions that combine style, performance, and energy efficiency.
            </p>
            <div className="text-sm font-medium text-[#E53935] bg-[#E53935]/10 inline-block px-3 py-1 rounded-full">Advanced Technology</div>
          </div>
        </div>
      </div>

      {/* Team (simplified version) */}
      <div className="bg-black/50 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E53935]/10 to-transparent opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-2 text-center">
            <span className="text-[#E53935]">Our</span> Team
          </h2>
          <p className="text-white/60 text-center max-w-2xl mx-auto mb-10">
            Meet the experts behind The Lense Shop
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-black/40 p-6 rounded-lg border border-white/10 hover:border-[#E53935]/30 transition-all text-center">
              <div className="h-20 w-20 bg-[#E53935] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">JD</span>
              </div>
              <h3 className="font-bold text-xl mb-1 text-white">John Doe</h3>
              <p className="text-[#E53935] text-sm mb-3">Founder & CEO</p>
              <p className="text-white/70 text-sm">
                Automotive enthusiast with over 15 years of experience in the Japanese car market.
              </p>
            </div>
            
            <div className="bg-black/40 p-6 rounded-lg border border-white/10 hover:border-[#E53935]/30 transition-all text-center">
              <div className="h-20 w-20 bg-[#E53935] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">JS</span>
              </div>
              <h3 className="font-bold text-xl mb-1 text-white">Jane Smith</h3>
              <p className="text-[#E53935] text-sm mb-3">Technical Specialist</p>
              <p className="text-white/70 text-sm">
                Expert in automotive lighting solutions with a background in electrical engineering.
              </p>
            </div>
            
            <div className="bg-black/40 p-6 rounded-lg border border-white/10 hover:border-[#E53935]/30 transition-all text-center">
              <div className="h-20 w-20 bg-[#E53935] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">RJ</span>
              </div>
              <h3 className="font-bold text-xl mb-1 text-white">Robert Johnson</h3>
              <p className="text-[#E53935] text-sm mb-3">Customer Support</p>
              <p className="text-white/70 text-sm">
                Dedicated to providing exceptional service and product advice to all our customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default AboutPage;
