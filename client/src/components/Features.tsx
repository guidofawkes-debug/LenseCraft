import { 
  Package, 
  Shield, 
  LifeBuoy
} from "lucide-react";

const Features = () => {
  return (
    <section className="bg-neutral-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm flex">
            <div className="mr-4">
              <div className="bg-primary-light p-3 rounded-full">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-neutral-600">Nationwide shipping available with tracking</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex">
            <div className="mr-4">
              <div className="bg-primary-light p-3 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-2">Genuine Products</h3>
              <p className="text-neutral-600">100% authentic guarantee on all brands</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex">
            <div className="mr-4">
              <div className="bg-primary-light p-3 rounded-full">
                <LifeBuoy className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-2">Expert Support</h3>
              <p className="text-neutral-600">WhatsApp & phone support 7 days a week</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
