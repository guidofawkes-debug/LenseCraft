import { CustomerReview } from "./types";

// Contact information
export const WHATSAPP_NUMBER = "0772377137"; // no plus sign for wa.me links
export const PHONE_NUMBER = "0719377137";
export const EMAIL = "info@thelenseshop.com";
export const ADDRESS = "123 Lighting Road, Harare, Zimbabwe";

// Brand partners
export const BRAND_PARTNERS = [
  { name: "DEPO", description: "Premium Quality" },
  { name: "TYC", description: "Precision Engineered" },
  { name: "LUCID", description: "Advanced Technology" }
];

// Customer reviews
export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    name: "John M.",
    initials: "JM",
    vehicle: "Honda Civic Owner",
    rating: 5,
    comment: "The TYC headlights I ordered for my Civic transformed the front end completely. Installation was straightforward and the beam pattern is perfect. Highly recommend!"
  },
  {
    name: "Sarah T.",
    initials: "ST",
    vehicle: "Subaru Forester Owner",
    rating: 5,
    comment: "Impressive service! The WhatsApp support helped me choose the right DEPO tail lights for my Subaru. They look OEM+ and the quality is outstanding. Will definitely shop here again."
  },
  {
    name: "David K.",
    initials: "DK",
    vehicle: "Mazda 3 Owner",
    rating: 4,
    comment: "Fast shipping and the LUCID fog lights were a perfect fit for my Mazda. The light output is significantly better than stock. Great value for money and the compatibility checker was spot on."
  }
];

// Product categories
export const PRODUCT_CATEGORIES = [
  "Headlights",
  "Tail Lights",
  "Signal Lights",
  "Fog Lights"
];

// Business hours
export const BUSINESS_HOURS = {
  weekdays: {
    monday: "8:30 AM - 5:30 PM",
    tuesday: "8:30 AM - 5:30 PM",
    wednesday: "8:30 AM - 5:30 PM",
    thursday: "8:30 AM - 5:30 PM",
    friday: "8:30 AM - 5:30 PM"
  },
  weekend: {
    saturday: "9:00 AM - 2:00 PM",
    sunday: "Closed"
  },
  holidays: "Closed"
};
