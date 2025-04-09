// Product types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  brand: string;
  imageUrl: string;
  category: string;
  compatibleVehicles: string[];
  featured: boolean;
  stockQuantity: number;
  tags?: string[];
  createdAt: Date;
}

// Category types
export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  productCount: number;
}

// Vehicle makes and models
export interface VehicleMake {
  id: number;
  name: string;
}

export interface VehicleModel {
  id: number;
  makeId: number;
  name: string;
  yearStart?: number;
  yearEnd?: number;
}

// Cart types
export interface CartItem {
  id: number;
  sessionId: string;
  productId: number;
  quantity: number;
  product?: Product;
  createdAt: Date;
}

// Customer review type
export interface CustomerReview {
  name: string;
  initials: string;
  vehicle: string;
  rating: number;
  comment: string;
}
