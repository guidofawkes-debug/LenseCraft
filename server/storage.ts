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
  type InsertUser,
  users, products, categories, vehicleMakes, vehicleModels, cartItems
} from "@shared/schema";
import { db } from './db';
import { eq, and, like, inArray, desc, asc, sql } from 'drizzle-orm';
import { log } from './vite';

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
  updateProduct(id: number, product: Partial<Product>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<void>;
  
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
  clearCart(sessionId: string): Promise<void>; // Added method to clear all cart items for a session
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (err) {
      log(`Error getting user: ${(err as Error).message}`, 'storage');
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user;
    } catch (err) {
      log(`Error getting user by username: ${(err as Error).message}`, 'storage');
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const [user] = await db.insert(users).values(insertUser).returning();
      return user;
    } catch (err) {
      log(`Error creating user: ${(err as Error).message}`, 'storage');
      throw err;
    }
  }

  // Product operations
  async getAllProducts(filters?: {
    featured?: boolean;
    category?: string;
    make?: string;
    model?: string;
  }): Promise<Product[]> {
    try {
      let query = db.select().from(products);
      
      // Build the where clause based on filters
      if (filters) {
        const conditions = [];
        
        if (filters.featured !== undefined) {
          conditions.push(eq(products.featured, filters.featured));
        }
        
        if (filters.category) {
          conditions.push(eq(products.category, filters.category));
        }
        
        // Note: make and model filtering will need to be done in JS
        // since compatibleVehicles is stored as an array
        if (conditions.length > 0) {
          query = query.where(and(...conditions));
        }
      }
      
      // Execute the query
      let result = await query.orderBy(desc(products.featured), asc(products.name));
      
      // Apply make/model filtering if needed
      if (filters?.make || filters?.model) {
        result = result.filter(product => {
          const compatibilities = product.compatibleVehicles;
          if (filters.make && filters.model) {
            return compatibilities.some(compat => 
              compat.includes(filters.make!) && compat.includes(filters.model!)
            );
          } else if (filters.make) {
            return compatibilities.some(compat => compat.includes(filters.make!));
          } else if (filters.model) {
            return compatibilities.some(compat => compat.includes(filters.model!));
          }
          return true;
        });
      }
      
      return result;
    } catch (err) {
      log(`Error getting products: ${(err as Error).message}`, 'storage');
      return [];
    }
  }

  async getProductById(id: number): Promise<Product | undefined> {
    try {
      const [product] = await db.select().from(products).where(eq(products.id, id));
      return product;
    } catch (err) {
      log(`Error getting product by id: ${(err as Error).message}`, 'storage');
      return undefined;
    }
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    try {
      const [newProduct] = await db.insert(products).values({
        ...product,
        featured: product.featured ?? false,
        tags: product.tags ?? []
      }).returning();
      
      return newProduct;
    } catch (err) {
      log(`Error creating product: ${(err as Error).message}`, 'storage');
      throw err;
    }
  }
  
  async updateProduct(id: number, product: Partial<Product>): Promise<Product | undefined> {
    try {
      const [updatedProduct] = await db.update(products)
        .set(product)
        .where(eq(products.id, id))
        .returning();
      
      return updatedProduct;
    } catch (err) {
      log(`Error updating product: ${(err as Error).message}`, 'storage');
      return undefined;
    }
  }
  
  async deleteProduct(id: number): Promise<void> {
    try {
      await db.delete(products).where(eq(products.id, id));
    } catch (err) {
      log(`Error deleting product: ${(err as Error).message}`, 'storage');
      throw err;
    }
  }

  // Category operations
  async getAllCategories(): Promise<Category[]> {
    try {
      return await db.select().from(categories).orderBy(asc(categories.name));
    } catch (err) {
      log(`Error getting categories: ${(err as Error).message}`, 'storage');
      return [];
    }
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    try {
      const [category] = await db.select().from(categories).where(eq(categories.id, id));
      return category;
    } catch (err) {
      log(`Error getting category by id: ${(err as Error).message}`, 'storage');
      return undefined;
    }
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    try {
      const [newCategory] = await db.insert(categories).values(category).returning();
      return newCategory;
    } catch (err) {
      log(`Error creating category: ${(err as Error).message}`, 'storage');
      throw err;
    }
  }

  // VehicleMake operations
  async getAllVehicleMakes(): Promise<VehicleMake[]> {
    try {
      return await db.select().from(vehicleMakes).orderBy(asc(vehicleMakes.name));
    } catch (err) {
      log(`Error getting vehicle makes: ${(err as Error).message}`, 'storage');
      return [];
    }
  }

  async getVehicleMakeById(id: number): Promise<VehicleMake | undefined> {
    try {
      const [make] = await db.select().from(vehicleMakes).where(eq(vehicleMakes.id, id));
      return make;
    } catch (err) {
      log(`Error getting vehicle make by id: ${(err as Error).message}`, 'storage');
      return undefined;
    }
  }

  async createVehicleMake(make: InsertVehicleMake): Promise<VehicleMake> {
    try {
      const [newMake] = await db.insert(vehicleMakes).values(make).returning();
      return newMake;
    } catch (err) {
      log(`Error creating vehicle make: ${(err as Error).message}`, 'storage');
      throw err;
    }
  }

  // VehicleModel operations
  async getVehicleModelsByMake(makeId?: number): Promise<VehicleModel[]> {
    try {
      if (makeId !== undefined) {
        return await db.select().from(vehicleModels)
          .where(eq(vehicleModels.makeId, makeId))
          .orderBy(asc(vehicleModels.name));
      } else {
        return await db.select().from(vehicleModels).orderBy(asc(vehicleModels.name));
      }
    } catch (err) {
      log(`Error getting vehicle models: ${(err as Error).message}`, 'storage');
      return [];
    }
  }

  async getVehicleModelById(id: number): Promise<VehicleModel | undefined> {
    try {
      const [model] = await db.select().from(vehicleModels).where(eq(vehicleModels.id, id));
      return model;
    } catch (err) {
      log(`Error getting vehicle model by id: ${(err as Error).message}`, 'storage');
      return undefined;
    }
  }

  async createVehicleModel(model: InsertVehicleModel): Promise<VehicleModel> {
    try {
      const [newModel] = await db.insert(vehicleModels).values(model).returning();
      return newModel;
    } catch (err) {
      log(`Error creating vehicle model: ${(err as Error).message}`, 'storage');
      throw err;
    }
  }

  // Cart operations
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    try {
      // Get all cart items for the session
      const items = await db.select().from(cartItems)
        .where(eq(cartItems.sessionId, sessionId));
      
      // For each cart item, get the associated product
      const result: CartItem[] = [];
      for (const item of items) {
        const [product] = await db.select().from(products)
          .where(eq(products.id, item.productId));
        
        result.push({
          ...item,
          product
        });
      }
      
      return result;
    } catch (err) {
      log(`Error getting cart items: ${(err as Error).message}`, 'storage');
      return [];
    }
  }

  async addToCart(cartItem: InsertCartItem): Promise<CartItem> {
    try {
      // Check if the product exists
      const product = await this.getProductById(cartItem.productId);
      if (!product) {
        throw new Error(`Product with ID ${cartItem.productId} not found`);
      }
      
      // Check for existing cart item
      const existingItems = await db.select().from(cartItems).where(
        and(
          eq(cartItems.sessionId, cartItem.sessionId),
          eq(cartItems.productId, cartItem.productId)
        )
      );
      
      if (existingItems.length > 0) {
        // Update quantity of existing item
        const existingItem = existingItems[0];
        const newQuantity = existingItem.quantity + cartItem.quantity;
        
        return await this.updateCartItemQuantity(existingItem.id, newQuantity) as CartItem;
      }
      
      // Create new cart item
      const [newCartItem] = await db.insert(cartItems).values(cartItem).returning();
      
      return {
        ...newCartItem,
        product
      };
    } catch (err) {
      log(`Error adding to cart: ${(err as Error).message}`, 'storage');
      throw err;
    }
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    try {
      // Update the cart item
      const [updatedItem] = await db.update(cartItems)
        .set({ quantity })
        .where(eq(cartItems.id, id))
        .returning();
      
      if (!updatedItem) return undefined;
      
      // Get the associated product
      const [product] = await db.select().from(products)
        .where(eq(products.id, updatedItem.productId));
      
      return {
        ...updatedItem,
        product
      };
    } catch (err) {
      log(`Error updating cart item quantity: ${(err as Error).message}`, 'storage');
      return undefined;
    }
  }

  async removeFromCart(id: number): Promise<void> {
    try {
      await db.delete(cartItems).where(eq(cartItems.id, id));
    } catch (err) {
      log(`Error removing from cart: ${(err as Error).message}`, 'storage');
      throw err;
    }
  }
  
  async clearCart(sessionId: string): Promise<void> {
    try {
      // Delete all cart items for the specified session
      await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
      log(`Cart cleared for session ${sessionId}`, 'storage');
    } catch (err) {
      log(`Error clearing cart: ${(err as Error).message}`, 'storage');
      throw err;
    }
  }
}

// Replace MemStorage with DatabaseStorage
export const storage = new DatabaseStorage();