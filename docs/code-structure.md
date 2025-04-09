# Code Structure Guide for The Lense Shop

This document provides an in-depth explanation of the project's code structure, architecture, and key files.

## Architecture Overview

The Lense Shop is built using a modern full-stack JavaScript architecture:

- **Frontend**: React with Vite, TailwindCSS, and Shadcn UI components
- **Backend**: Express.js server with REST APIs
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: React Query for server state
- **Routing**: Wouter for client-side routing

## Directory Structure

```
project-root/
├── client/                 # Frontend code
├── server/                 # Backend code
├── shared/                 # Shared code between frontend and backend
├── scripts/                # Utility scripts
├── docs/                   # Documentation
└── various config files    # Configuration files for different tools
```

## Key Files & Their Purpose

### Root Directory

- `package.json`: Defines project dependencies and scripts
- `drizzle.config.ts`: Configuration for Drizzle ORM and database connection
- `tailwind.config.ts`: TailwindCSS configuration
- `vite.config.ts`: Vite bundler configuration
- `tsconfig.json`: TypeScript configuration
- `theme.json`: UI theme configuration for Shadcn components

### Shared Directory

- `schema.ts`: Database schema definitions using Drizzle ORM
  - Defines database tables and their relationships
  - Contains Zod validation schemas for data structures
  - Exports TypeScript types for the application

### Server Directory

- `index.ts`: Entry point for the Express server
  - Sets up middleware
  - Imports and registers routes
  - Configures sessions and auth (if applicable)
  
- `db.ts`: Database connection setup
  - Creates a connection pool to PostgreSQL
  - Exports a Drizzle instance for database operations
  
- `storage.ts`: Data access layer
  - Implements the IStorage interface
  - Provides methods for accessing and manipulating data
  - Abstracts database operations from the route handlers
  
- `routes.ts`: API route definitions
  - Defines all API endpoints
  - Handles request validation
  - Calls appropriate storage methods

- `vite.ts`: Vite development server setup
  - Configures Vite middleware for development
  - Handles static file serving

### Client Directory

- `index.html`: Main HTML template
- `src/main.tsx`: Client entry point
  - Renders the main App component
  - Sets up global providers

- `src/App.tsx`: Main application component
  - Defines client-side routes
  - Sets up global layout
 
- `src/components/`: UI components
  - `ui/`: Shadcn UI components
  - Other custom components for the application
  
- `src/lib/`: Utility functions and constants
  - `queryClient.ts`: React Query setup with API request helpers
  - `constants.ts`: Application constants
  - `types.ts`: Frontend type definitions
  - `utils.ts`: Utility functions
  
- `src/hooks/`: Custom React hooks
  
- `src/pages/`: Page components for each route

## Database Implementation

### Schema Definition

The database schema is defined in `shared/schema.ts` using Drizzle ORM. For each table, we define:

1. The table structure with columns and constraints
2. Zod validation schemas for inserting data
3. TypeScript types for type-safe data access
4. Relationships between tables

Example:
```typescript
// Table definition
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  // other columns...
});

// Insert schema for validation
export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

// Type definitions
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

// Relations
export const productsRelations = relations(products, ({ many }) => ({
  cartItems: many(cartItems),
}));
```

### Database Connection

The database connection is managed in `server/db.ts`. It creates a connection pool to PostgreSQL and exports a Drizzle instance that's used throughout the application.

### Storage Implementation

The `server/storage.ts` file implements the data access layer using the `IStorage` interface. This provides a consistent API for accessing data regardless of the underlying storage mechanism (PostgreSQL in this case).

## Frontend Implementation

### State Management

The application uses React Query for managing server state. API requests are made through helper functions in `client/src/lib/queryClient.ts`.

### Component Structure

Components follow a hierarchical structure:
- **Pages**: Top-level components tied to routes
- **Layout Components**: Define the overall page structure
- **Feature Components**: Implement specific features (e.g., product list, cart)
- **UI Components**: Low-level, reusable UI elements

### Styling

The project uses TailwindCSS for styling with Shadcn UI components for a consistent design. The theme is configured in `theme.json` at the root.

## API Endpoints

The API endpoints are defined in `server/routes.ts` and follow RESTful conventions:

- `GET /api/products`: List products
- `GET /api/products/:id`: Get a specific product
- `GET /api/categories`: List categories
- `GET /api/vehicle-makes`: List vehicle makes
- `GET /api/vehicle-models`: List vehicle models
- `GET /api/cart/:sessionId`: Get cart items
- `POST /api/cart`: Add an item to cart
- `PUT /api/cart/:id`: Update cart item
- `DELETE /api/cart/:id`: Remove item from cart

## Authentication

The application includes a simple authentication system with:
- `POST /api/login`: Log in a user
- `POST /api/register`: Register a new user
- `GET /api/user`: Get the current user

## Migrating to Your Own Environment

When migrating this code to your own environment:

1. Update the database connection in `server/db.ts` to point to your local database
2. Check `drizzle.config.ts` to ensure it's correctly configured for your database
3. Update any environment-specific configurations
4. Run database migrations with `npm run db:push` if needed

## Development Workflow

1. Make changes to the code
2. Start the development server with `npm run dev`
3. The server will automatically reload when you make changes
4. Use the React Developer Tools to debug frontend issues
5. Check the console for backend logs

## Building for Production

To build the application for production:

1. Run `npm run build` to create optimized production builds
2. The frontend will be built to the `dist` directory
3. The backend will be compiled and bundled
4. Deploy the application with `npm run start`