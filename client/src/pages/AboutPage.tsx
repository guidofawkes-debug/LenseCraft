import { Separator } from "@/components/ui/separator";
import CTASection from "@/components/CTASection";

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-black text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1559418953-d760bd256688?auto=format&fit=crop&q=80" 
            alt="Car workshop" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">About The Lense Shop</h1>
            <p className="text-lg md:text-xl mb-8">
              Japanese vehicle spares & accessories specialist—technical, reliable, performance-driven.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold font-heading mb-6">Our Story</h2>
            <p className="text-neutral-700 mb-4">
              The Lense Shop was founded in 2018 by a group of automotive enthusiasts with a passion for Japanese vehicles and high-quality lighting solutions. What started as a small specialist shop has grown into a trusted supplier of premium automotive lighting products across the country.
            </p>
            <p className="text-neutral-700 mb-4">
              Our mission is to provide vehicle owners with lighting solutions that not only enhance the aesthetic appeal of their vehicles but also improve safety and performance on the road.
            </p>
            <p className="text-neutral-700">
              We pride ourselves on our technical expertise, customer service, and commitment to quality. Every product in our catalog is carefully selected to meet our high standards, ensuring our customers receive only the best.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden h-full">
              <img 
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80" 
                alt="Car workshop" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator className="max-w-5xl mx-auto" />

      {/* Our Values */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold font-heading mb-10 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="bg-primary-light p-4 rounded-full inline-flex mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-xl mb-3">Quality Assurance</h3>
            <p className="text-neutral-600">
              We source only the highest quality products from trusted manufacturers. Every product undergoes rigorous testing before it reaches our customers.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="bg-primary-light p-4 rounded-full inline-flex mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-xl mb-3">Expert Support</h3>
            <p className="text-neutral-600">
              Our team of specialists provides personalized support to help you find the perfect lighting solution for your vehicle. We're always just a WhatsApp message away.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="bg-primary-light p-4 rounded-full inline-flex mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-xl mb-3">Performance-Driven</h3>
            <p className="text-neutral-600">
              We focus on products that not only look great but also enhance the performance and safety of your vehicle, ensuring the best driving experience possible.
            </p>
          </div>
        </div>
      </div>

      <Separator className="max-w-5xl mx-auto" />

      {/* Our Brands */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold font-heading mb-6 text-center">Our Trusted Brands</h2>
        <p className="text-neutral-600 text-center max-w-2xl mx-auto mb-10">
          We partner with the world's leading automotive lighting manufacturers to bring you the highest quality products.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-100 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">DEPO</h3>
            <p className="text-neutral-600 mb-6">
              Known for their high-quality OEM replacement parts, DEPO manufactures reliable lighting solutions that perfectly match factory specifications.
            </p>
            <div className="text-sm font-medium text-primary">Premium Quality</div>
          </div>
          
          <div className="bg-neutral-100 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">TYC</h3>
            <p className="text-neutral-600 mb-6">
              TYC is a global leader in automotive lighting with a reputation for precision engineering and durability that meets or exceeds OEM standards.
            </p>
            <div className="text-sm font-medium text-primary">Precision Engineered</div>
          </div>
          
          <div className="bg-neutral-100 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">LUCID</h3>
            <p className="text-neutral-600 mb-6">
              Specializing in cutting-edge LED technology, LUCID offers innovative lighting solutions that combine style, performance, and energy efficiency.
            </p>
            <div className="text-sm font-medium text-primary">Advanced Technology</div>
          </div>
        </div>
      </div>

      {/* Team (simplified version) */}
      <div className="bg-neutral-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-heading mb-10 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="h-20 w-20 bg-neutral-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-neutral-600">JD</span>
              </div>
              <h3 className="font-heading font-bold text-xl mb-1">John Doe</h3>
              <p className="text-primary text-sm mb-3">Founder & CEO</p>
              <p className="text-neutral-600 text-sm">
                Automotive enthusiast with over 15 years of experience in the Japanese car market.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="h-20 w-20 bg-neutral-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-neutral-600">JS</span>
              </div>
              <h3 className="font-heading font-bold text-xl mb-1">Jane Smith</h3>
              <p className="text-primary text-sm mb-3">Technical Specialist</p>
              <p className="text-neutral-600 text-sm">
                Expert in automotive lighting solutions with a background in electrical engineering.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="h-20 w-20 bg-neutral-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-neutral-600">RJ</span>
              </div>
              <h3 className="font-heading font-bold text-xl mb-1">Robert Johnson</h3>
              <p className="text-primary text-sm mb-3">Customer Support</p>
              <p className="text-neutral-600 text-sm">
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
