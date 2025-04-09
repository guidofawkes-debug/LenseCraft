import { pgTable, text, serial, integer, boolean, jsonb, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Product model
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  brand: text("brand").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  compatibleVehicles: jsonb("compatible_vehicles").$type<string[]>().notNull(),
  featured: boolean("featured").default(false),
  stockQuantity: integer("stock_quantity").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

// Category model
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  productCount: integer("product_count").default(0),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

// Vehicle Make model (Toyota, Honda, etc.)
export const vehicleMakes = pgTable("vehicle_makes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const insertVehicleMakeSchema = createInsertSchema(vehicleMakes).omit({
  id: true,
});

// Vehicle Model (Corolla, Civic, etc.)
export const vehicleModels = pgTable("vehicle_models", {
  id: serial("id").primaryKey(),
  makeId: integer("make_id").notNull(),
  name: text("name").notNull(),
  yearStart: integer("year_start"),
  yearEnd: integer("year_end"),
});

export const insertVehicleModelSchema = createInsertSchema(vehicleModels).omit({
  id: true,
});

// Cart Items model
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
  createdAt: true,
});

// Define types
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type VehicleMake = typeof vehicleMakes.$inferSelect;
export type InsertVehicleMake = z.infer<typeof insertVehicleMakeSchema>;

export type VehicleModel = typeof vehicleModels.$inferSelect;
export type InsertVehicleModel = z.infer<typeof insertVehicleModelSchema>;

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

// Keep the User model from the original template
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
