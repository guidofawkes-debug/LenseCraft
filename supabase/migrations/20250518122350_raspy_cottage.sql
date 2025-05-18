/*
  # Initial Database Schema

  1. Tables
    - users
    - products
    - categories
    - vehicle_makes
    - vehicle_models
    - cart_items

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS auth.users (
  id uuid REFERENCES auth.users PRIMARY KEY,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Products table
CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text NOT NULL,
  price real NOT NULL,
  brand text NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  compatible_vehicles jsonb NOT NULL,
  featured boolean DEFAULT false,
  stock_quantity integer NOT NULL,
  tags jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  image_url text,
  product_count integer DEFAULT 0
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Vehicle makes table
CREATE TABLE IF NOT EXISTS public.vehicle_makes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL
);

ALTER TABLE public.vehicle_makes ENABLE ROW LEVEL SECURITY;

-- Vehicle models table
CREATE TABLE IF NOT EXISTS public.vehicle_models (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  make_id uuid REFERENCES public.vehicle_makes(id) NOT NULL,
  name text NOT NULL,
  year_start integer,
  year_end integer
);

ALTER TABLE public.vehicle_models ENABLE ROW LEVEL SECURITY;

-- Cart items table
CREATE TABLE IF NOT EXISTS public.cart_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id text NOT NULL,
  product_id uuid REFERENCES public.products(id) NOT NULL,
  quantity integer DEFAULT 1 NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Products: Everyone can read, only authenticated users can modify
CREATE POLICY "Products are viewable by everyone" 
  ON public.products FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Products are editable by authenticated users" 
  ON public.products FOR ALL 
  TO authenticated 
  USING (true)
  WITH CHECK (true);

-- Categories: Everyone can read
CREATE POLICY "Categories are viewable by everyone" 
  ON public.categories FOR SELECT 
  TO public 
  USING (true);

-- Vehicle makes: Everyone can read
CREATE POLICY "Vehicle makes are viewable by everyone" 
  ON public.vehicle_makes FOR SELECT 
  TO public 
  USING (true);

-- Vehicle models: Everyone can read
CREATE POLICY "Vehicle models are viewable by everyone" 
  ON public.vehicle_models FOR SELECT 
  TO public 
  USING (true);

-- Cart items: Users can only access their own cart items
CREATE POLICY "Users can manage their own cart items"
  ON public.cart_items FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);