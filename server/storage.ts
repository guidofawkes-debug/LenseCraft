import {
  type Product,
  type InsertProduct,
  type Category,
  type InsertCategory,
  type VehicleMake,
  type InsertVehicleMake,
  type VehicleModel,
  type InsertVehicleModel,
  type CartItem,
  type InsertCartItem,
  type User,
  type InsertUser
} from "@shared/schema";

export interface IStorage {
  // User operations (keep from original template)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product operations
  getAllProducts(filters?: {
    featured?: boolean;
    category?: string;
    make?: string;
    model?: string;
  }): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Category operations
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Vehicle make operations
  getAllVehicleMakes(): Promise<VehicleMake[]>;
  getVehicleMakeById(id: number): Promise<VehicleMake | undefined>;
  createVehicleMake(make: InsertVehicleMake): Promise<VehicleMake>;
  
  // Vehicle model operations
  getVehicleModelsByMake(makeId?: number): Promise<VehicleModel[]>;
  getVehicleModelById(id: number): Promise<VehicleModel | undefined>;
  createVehicleModel(model: InsertVehicleModel): Promise<VehicleModel>;
  
  // Cart operations
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private categories: Map<number, Category>;
  private vehicleMakes: Map<number, VehicleMake>;
  private vehicleModels: Map<number, VehicleModel>;
  private cartItems: Map<number, CartItem>;
  
  private currentUserId: number;
  private currentProductId: number;
  private currentCategoryId: number;
  private currentVehicleMakeId: number;
  private currentVehicleModelId: number;
  private currentCartItemId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.categories = new Map();
    this.vehicleMakes = new Map();
    this.vehicleModels = new Map();
    this.cartItems = new Map();
    
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentCategoryId = 1;
    this.currentVehicleMakeId = 1;
    this.currentVehicleModelId = 1;
    this.currentCartItemId = 1;
  }

  // USER OPERATIONS (KEPT FROM ORIGINAL)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // PRODUCT OPERATIONS
  async getAllProducts(filters?: {
    featured?: boolean;
    category?: string;
    make?: string;
    model?: string;
  }): Promise<Product[]> {
    let products = Array.from(this.products.values());
    
    if (filters) {
      if (filters.featured !== undefined) {
        products = products.filter(product => product.featured === filters.featured);
      }
      
      if (filters.category) {
        products = products.filter(product => product.category === filters.category);
      }
      
      if (filters.make || filters.model) {
        products = products.filter(product => {
          const compatibleVehicles = product.compatibleVehicles;
          
          if (filters.make && filters.model) {
            // Filter by both make and model
            return compatibleVehicles.some(
              vehicle => vehicle.includes(filters.make!) && vehicle.includes(filters.model!)
            );
          } else if (filters.make) {
            // Filter by make only
            return compatibleVehicles.some(vehicle => vehicle.includes(filters.make!));
          } else if (filters.model) {
            // Filter by model only
            return compatibleVehicles.some(vehicle => vehicle.includes(filters.model!));
          }
          
          return true;
        });
      }
    }
    
    return products;
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const createdAt = new Date();
    
    const newProduct: Product = { 
      ...product, 
      id, 
      createdAt,
      featured: product.featured ?? false,
      tags: product.tags ?? []
    };
    this.products.set(id, newProduct);
    
    return newProduct;
  }

  // CATEGORY OPERATIONS
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const newCategory: Category = { ...category, id };
    this.categories.set(id, newCategory);
    
    return newCategory;
  }

  // VEHICLE MAKE OPERATIONS
  async getAllVehicleMakes(): Promise<VehicleMake[]> {
    return Array.from(this.vehicleMakes.values());
  }

  async getVehicleMakeById(id: number): Promise<VehicleMake | undefined> {
    return this.vehicleMakes.get(id);
  }

  async createVehicleMake(make: InsertVehicleMake): Promise<VehicleMake> {
    const id = this.currentVehicleMakeId++;
    const newMake: VehicleMake = { ...make, id };
    this.vehicleMakes.set(id, newMake);
    
    return newMake;
  }

  // VEHICLE MODEL OPERATIONS
  async getVehicleModelsByMake(makeId?: number): Promise<VehicleModel[]> {
    const models = Array.from(this.vehicleModels.values());
    
    if (makeId !== undefined) {
      return models.filter(model => model.makeId === makeId);
    }
    
    return models;
  }

  async getVehicleModelById(id: number): Promise<VehicleModel | undefined> {
    return this.vehicleModels.get(id);
  }

  async createVehicleModel(model: InsertVehicleModel): Promise<VehicleModel> {
    const id = this.currentVehicleModelId++;
    const newModel: VehicleModel = { ...model, id };
    this.vehicleModels.set(id, newModel);
    
    return newModel;
  }

  // CART OPERATIONS
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    const items = Array.from(this.cartItems.values());
    return items.filter(item => item.sessionId === sessionId);
  }

  async addToCart(cartItem: InsertCartItem): Promise<CartItem> {
    // Check if the product exists
    const product = await this.getProductById(cartItem.productId);
    if (!product) {
      throw new Error(`Product with ID ${cartItem.productId} not found`);
    }
    
    // Check for existing cart item
    const existingItems = Array.from(this.cartItems.values()).filter(
      item => item.sessionId === cartItem.sessionId && item.productId === cartItem.productId
    );
    
    if (existingItems.length > 0) {
      // Update quantity of existing item
      const existingItem = existingItems[0];
      const newQuantity = existingItem.quantity + cartItem.quantity;
      
      return this.updateCartItemQuantity(existingItem.id, newQuantity) as Promise<CartItem>;
    }
    
    // Create new cart item
    const id = this.currentCartItemId++;
    const createdAt = new Date();
    
    const newCartItem: CartItem = { ...cartItem, id, createdAt };
    this.cartItems.set(id, newCartItem);
    
    return newCartItem;
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    
    if (!cartItem) {
      return undefined;
    }
    
    const updatedItem: CartItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedItem);
    
    return updatedItem;
  }

  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }
}

export const storage = new MemStorage();
