const BrandPartners = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-center mb-4">Our Trusted Brands</h2>
        <p className="text-neutral-600 text-center max-w-2xl mx-auto mb-10">
          We partner with the world's leading automotive lighting manufacturers to bring you the highest quality products.
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <div className="text-center">
            <div className="bg-neutral-100 rounded-lg p-6 inline-block transition-transform hover:transform hover:scale-105">
              <span className="text-2xl font-bold">DEPO</span>
            </div>
            <p className="mt-2 text-sm text-neutral-600">Premium Quality</p>
          </div>
          
          <div className="text-center">
            <div className="bg-neutral-100 rounded-lg p-6 inline-block transition-transform hover:transform hover:scale-105">
              <span className="text-2xl font-bold">TYC</span>
            </div>
            <p className="mt-2 text-sm text-neutral-600">Precision Engineered</p>
          </div>
          
          <div className="text-center">
            <div className="bg-neutral-100 rounded-lg p-6 inline-block transition-transform hover:transform hover:scale-105">
              <span className="text-2xl font-bold">LUCID</span>
            </div>
            <p className="mt-2 text-sm text-neutral-600">Advanced Technology</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandPartners;
