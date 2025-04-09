import Hero from "@/components/Hero";
import Features from "@/components/Features";
import BrandPartners from "@/components/BrandPartners";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import VehicleSearch from "@/components/VehicleSearch";
import CustomerReviews from "@/components/CustomerReviews";
import CTASection from "@/components/CTASection";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <BrandPartners />
      <Categories />
      <FeaturedProducts />
      <VehicleSearch />
      <CustomerReviews />
      <CTASection />
    </div>
  );
};

export default HomePage;
