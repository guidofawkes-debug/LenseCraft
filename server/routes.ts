import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import Stripe from "stripe";
import { 
  insertProductSchema, 
  insertCategorySchema, 
  insertVehicleMakeSchema, 
  insertVehicleModelSchema,
  insertCartItemSchema
} from "@shared/schema";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16", // Using a stable API version
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize with sample data
  await initializeData();

  // PRODUCTS API ROUTES
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const featured = req.query.featured === "true";
      const category = req.query.category as string | undefined;
      const make = req.query.make as string | undefined;
      const model = req.query.model as string | undefined;
      
      const products = await storage.getAllProducts({ featured, category, make, model });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products", error: (error as Error).message });
    }
  });

  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product", error: (error as Error).message });
    }
  });
  
  // Product CRUD operations for inventory management
  app.post("/api/products", async (req: Request, res: Response) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating product", error: (error as Error).message });
    }
  });
  
  app.put("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const existingProduct = await storage.getProductById(id);
      
      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      // Update product
      const updatedProduct = await storage.updateProduct(id, req.body);
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: "Error updating product", error: (error as Error).message });
    }
  });
  
  app.delete("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      await storage.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting product", error: (error as Error).message });
    }
  });

  // CATEGORIES API ROUTES
  app.get("/api/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories", error: (error as Error).message });
    }
  });

  // VEHICLE MAKES AND MODELS API ROUTES
  app.get("/api/vehicle-makes", async (req: Request, res: Response) => {
    try {
      const makes = await storage.getAllVehicleMakes();
      res.json(makes);
    } catch (error) {
      res.status(500).json({ message: "Error fetching vehicle makes", error: (error as Error).message });
    }
  });

  app.get("/api/vehicle-models", async (req: Request, res: Response) => {
    try {
      const makeId = req.query.makeId ? parseInt(req.query.makeId as string) : undefined;
      const models = await storage.getVehicleModelsByMake(makeId);
      res.json(models);
    } catch (error) {
      res.status(500).json({ message: "Error fetching vehicle models", error: (error as Error).message });
    }
  });

  // CART API ROUTES
  app.get("/api/cart/:sessionId", async (req: Request, res: Response) => {
    try {
      const sessionId = req.params.sessionId;
      const cartItems = await storage.getCartItems(sessionId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cart items", error: (error as Error).message });
    }
  });

  app.post("/api/cart", async (req: Request, res: Response) => {
    try {
      const validatedData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addToCart(validatedData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart data", errors: error.errors });
      }
      res.status(500).json({ message: "Error adding to cart", error: (error as Error).message });
    }
  });

  app.put("/api/cart/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      
      if (typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).json({ message: "Quantity must be a positive number" });
      }
      
      const updatedItem = await storage.updateCartItemQuantity(id, quantity);
      
      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: "Error updating cart item", error: (error as Error).message });
    }
  });

  app.delete("/api/cart/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await storage.removeFromCart(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error removing item from cart", error: (error as Error).message });
    }
  });
  
  // Clear entire cart for a session (used after successful payment)
  app.post("/api/cart/:sessionId/clear", async (req: Request, res: Response) => {
    try {
      const sessionId = req.params.sessionId;
      await storage.clearCart(sessionId);
      res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error clearing cart", error: (error as Error).message });
    }
  });
  
  // STRIPE PAYMENT ROUTES
  app.post("/api/create-payment-intent", async (req: Request, res: Response) => {
    try {
      const { amount, cartSessionId } = req.body;
      
      if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
      }
      
      // Create a payment intent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert dollars to cents
        currency: "usd",
        // Store metadata about the cart session for reference
        metadata: {
          cartSessionId
        },
        // This enables automatic payment methods for this intent
        automatic_payment_methods: {
          enabled: true,
        },
      });
      
      // Return the client secret to the client to complete the payment
      res.json({ 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ 
        message: "Error creating payment intent", 
        error: (error as Error).message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Initialize some sample data for the application
async function initializeData() {
  // Initialize categories
  const categories = [
    { name: "Headlights", description: "LED and HID headlight assemblies", imageUrl: "https://images.unsplash.com/photo-1558562720-1297f0183887?auto=format&fit=crop&q=80", productCount: 24 },
    { name: "Tail Lights", description: "LED and standard tail light assemblies", imageUrl: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&q=80", productCount: 19 },
    { name: "Signal Lights", description: "Turn signal light assemblies", imageUrl: "https://images.unsplash.com/photo-1501061987532-3a20cdbd5ebd?auto=format&fit=crop&q=80", productCount: 12 },
    { name: "Fog Lights", description: "Fog and driving light kits", imageUrl: "https://images.unsplash.com/photo-1516298773066-c48f8e9bd92b?auto=format&fit=crop&q=80", productCount: 8 }
  ];
  
  for (const category of categories) {
    await storage.createCategory(category);
  }

  // Initialize vehicle makes
  const makes = [
    { name: "Toyota" },
    { name: "Honda" },
    { name: "Mazda" },
    { name: "Subaru" },
    { name: "Nissan" },
    { name: "Mitsubishi" }
  ];
  
  for (const make of makes) {
    await storage.createVehicleMake(make);
  }

  // Initialize vehicle models
  const models = [
    { makeId: 1, name: "Corolla", yearStart: 2018, yearEnd: 2022 },
    { makeId: 1, name: "Camry", yearStart: 2018, yearEnd: 2023 },
    { makeId: 1, name: "RAV4", yearStart: 2019, yearEnd: 2023 },
    { makeId: 2, name: "Civic", yearStart: 2016, yearEnd: 2021 },
    { makeId: 2, name: "Accord", yearStart: 2018, yearEnd: 2023 },
    { makeId: 2, name: "CR-V", yearStart: 2017, yearEnd: 2022 },
    { makeId: 3, name: "Mazda 3", yearStart: 2019, yearEnd: 2023 },
    { makeId: 3, name: "CX-5", yearStart: 2017, yearEnd: 2023 },
    { makeId: 4, name: "Forester", yearStart: 2017, yearEnd: 2020 },
    { makeId: 4, name: "Impreza", yearStart: 2017, yearEnd: 2021 }
  ];
  
  for (const model of models) {
    await storage.createVehicleModel(model);
  }

  // Initialize products
  const products = [
    {
      name: "LED Headlight Assembly",
      description: "High-performance LED headlight assembly for Toyota Corolla. Provides better visibility and a modern look.",
      price: 299.99,
      brand: "DEPO",
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80",
      category: "Headlights",
      compatibleVehicles: ["Toyota Corolla 2018-2022"],
      featured: true,
      stockQuantity: 15,
      tags: ["LED", "Toyota", "Headlights", "New Arrival"]
    },
    {
      name: "Premium Tail Light Set",
      description: "Complete tail light set for Honda Civic. LED elements for enhanced visibility and modern styling.",
      price: 249.99,
      brand: "TYC",
      imageUrl: "https://images.unsplash.com/photo-1560294559-1774a164fb0a?auto=format&fit=crop&q=80",
      category: "Tail Lights",
      compatibleVehicles: ["Honda Civic 2016-2021"],
      featured: true,
      stockQuantity: 8,
      tags: ["LED", "Honda", "Tail Lights", "Best Seller"]
    },
    {
      name: "LED Fog Light Kit",
      description: "Complete fog light kit for Mazda 3. LED bulbs for maximum visibility in adverse weather conditions.",
      price: 199.99,
      brand: "LUCID",
      imageUrl: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&q=80",
      category: "Fog Lights",
      compatibleVehicles: ["Mazda 3 2019-2023"],
      featured: true,
      stockQuantity: 3,
      tags: ["LED", "Mazda", "Fog Lights", "Limited Stock"]
    },
    {
      name: "Signal Light Assembly",
      description: "Front signal light assembly for Subaru Forester. OEM quality replacement.",
      price: 129.99,
      brand: "DEPO",
      imageUrl: "https://images.unsplash.com/photo-1500463959177-e0869687df26?auto=format&fit=crop&q=80",
      category: "Signal Lights",
      compatibleVehicles: ["Subaru Forester 2017-2020"],
      featured: true,
      stockQuantity: 12,
      tags: ["LED", "Subaru", "Signal Lights", "Sale"]
    },
    {
      name: "LED DRL Kit",
      description: "Daytime running light kit with automatic on/off function. Easy installation.",
      price: 149.99,
      brand: "LUCID",
      imageUrl: "https://images.unsplash.com/photo-1542683205-2da0c3bf235e?auto=format&fit=crop&q=80",
      category: "Headlights",
      compatibleVehicles: ["Toyota Camry 2018-2023", "Honda Accord 2018-2023"],
      featured: false,
      stockQuantity: 7,
      tags: ["LED", "DRL", "Universal"]
    },
    {
      name: "HID Conversion Kit",
      description: "HID conversion kit with all necessary components for installation. 6000K white light.",
      price: 189.99,
      brand: "TYC",
      imageUrl: "https://images.unsplash.com/photo-1527247162509-cf96942232c1?auto=format&fit=crop&q=80",
      category: "Headlights",
      compatibleVehicles: ["Multiple vehicles"],
      featured: false,
      stockQuantity: 9,
      tags: ["HID", "Conversion", "Universal"]
    }
  ];
  
  for (const product of products) {
    await storage.createProduct(product);
  }
}
