const BrandPartners = () => {
  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-center mb-4 text-white relative inline-block mx-auto">
          <span className="absolute -left-4 top-0 w-2 h-full bg-[#E53935]"></span>
          <span className="text-[#E53935] font-extrabold">Our Trusted Brands</span>
        </h2>
        <p className="text-white/70 text-center max-w-2xl mx-auto mb-10">
          We partner with the world's leading automotive lighting manufacturers to bring you the highest quality products.
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <div className="text-center">
            <div className="bg-black border-2 border-[#E53935] rounded-lg p-6 inline-block transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(229,57,53,0.5)]">
              <span className="text-2xl font-bold text-white">DEPO</span>
            </div>
            <p className="mt-2 text-sm text-white/70">Premium Quality</p>
          </div>
          
          <div className="text-center">
            <div className="bg-[#E53935] rounded-lg p-6 inline-block transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(229,57,53,0.5)]">
              <span className="text-2xl font-bold text-white">TYC</span>
            </div>
            <p className="mt-2 text-sm text-white/70">Precision Engineered</p>
          </div>
          
          <div className="text-center">
            <div className="bg-black border-2 border-[#E53935] rounded-lg p-6 inline-block transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(229,57,53,0.5)]">
              <span className="text-2xl font-bold text-white">LUCID</span>
            </div>
            <p className="mt-2 text-sm text-white/70">Advanced Technology</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandPartners;
