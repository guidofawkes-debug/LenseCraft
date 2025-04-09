import { Star } from "lucide-react";
import { CUSTOMER_REVIEWS } from "@/lib/constants";

const CustomerReviews = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">What Our Customers Say</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from vehicle owners who have upgraded with our lighting solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CUSTOMER_REVIEWS.map((review, index) => (
            <div key={index} className="bg-neutral-100 p-6 rounded-lg transition-transform hover:transform hover:translate-y-[-5px]">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-neutral-300'}`} 
                    fill="currentColor" 
                  />
                ))}
              </div>
              
              <p className="text-neutral-700 mb-4">{review.comment}</p>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-neutral-300 flex items-center justify-center mr-3">
                  <span className="text-neutral-600 font-bold">{review.initials}</span>
                </div>
                <div>
                  <h4 className="font-medium">{review.name}</h4>
                  <p className="text-sm text-neutral-500">{review.vehicle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
