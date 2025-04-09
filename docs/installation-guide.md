# The Lense Shop - Local Installation Guide

This document provides instructions for setting up and running The Lense Shop project locally using WAMP or XAMPP.

## Prerequisites

- WAMP/XAMPP with PHP 8.0+
- Node.js v18+ and npm
- PostgreSQL (can be installed separately or use XAMPP's MariaDB)
- Git (optional)

## Project Structure Overview

```
├── client/                 # Frontend React code
│   ├── src/                # Source files
│   │   ├── components/     # UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── pages/          # Page components
│   │   ├── App.tsx         # Main application component
│   │   └── main.tsx        # Application entry point
│   └── index.html          # HTML template
├── server/                 # Backend code
│   ├── db.ts               # Database connection
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Data storage interface
│   └── vite.ts             # Vite server setup
├── shared/                 # Shared between client and server
│   └── schema.ts           # Database schema definitions
├── scripts/                # Utility scripts
├── drizzle.config.ts       # Drizzle ORM configuration
├── package.json            # Project dependencies
└── docs/                   # Documentation
```

## Step 1: Download the Project

Clone or download the project files from your Replit workspace.

## Step 2: Database Setup

### Option 1: PostgreSQL (Recommended)

1. Install PostgreSQL on your local machine
2. Create a new database:
   ```sql
   CREATE DATABASE thelenseshop;
   ```
3. Create a database user (optional):
   ```sql
   CREATE USER lenseshop WITH PASSWORD 'yourpassword';
   GRANT ALL PRIVILEGES ON DATABASE thelenseshop TO lenseshop;
   ```
4. Export schema and data from Replit database (see below for export instructions)
5. Import the data to your local database

### Option 2: Export and Import Database Schema/Data

To export the database from Replit:

```bash
# Create a backup directory
mkdir -p backup/db

# Export the schema
pg_dump --no-owner --no-acl --schema-only -U $PGUSER -h $PGHOST -p $PGPORT $PGDATABASE > backup/db/schema.sql

# Export the data
pg_dump --no-owner --no-acl --data-only -U $PGUSER -h $PGHOST -p $PGPORT $PGDATABASE > backup/db/data.sql

# Alternatively, export everything
pg_dump --no-owner --no-acl -U $PGUSER -h $PGHOST -p $PGPORT $PGDATABASE > backup/db/full_backup.sql
```

To import to your local PostgreSQL:

```bash
# Import to your local database
psql -U youruser -d thelenseshop -f backup/db/schema.sql
psql -U youruser -d thelenseshop -f backup/db/data.sql

# Or import the full backup
psql -U youruser -d thelenseshop -f backup/db/full_backup.sql
```

## Step 3: Project Setup

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Configure the database connection:
   Create a `.env` file in the root directory with your database credentials:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/thelenseshop
   ```

3. Push the schema to your database (if importing from scratch):
   ```bash
   npm run db:push
   ```

## Step 4: Running the Application

### Development Mode

```bash
npm run dev
```

This starts both the backend server and frontend development server.

### Production Build

```bash
npm run build
npm run start
```

## Database Schema

The application uses the following database tables:

### users
- `id`: Primary key (serial)
- `username`: User's username (text, unique)
- `password`: User's password (text)

### products
- `id`: Primary key (serial)
- `name`: Product name (text)
- `description`: Product description (text)
- `price`: Product price (real)
- `brand`: Product brand (text)
- `imageUrl`: URL to product image (text)
- `category`: Product category (text)
- `compatibleVehicles`: Array of compatible vehicles (jsonb)
- `featured`: Whether product is featured (boolean)
- `stockQuantity`: Available quantity (integer)
- `tags`: Array of product tags (jsonb)
- `createdAt`: Creation timestamp (timestamp)

### categories
- `id`: Primary key (serial)
- `name`: Category name (text)
- `description`: Category description (text, nullable)
- `imageUrl`: URL to category image (text, nullable)
- `productCount`: Number of products in this category (integer)

### vehicle_makes
- `id`: Primary key (serial)
- `name`: Vehicle make name (text)

### vehicle_models
- `id`: Primary key (serial)
- `makeId`: Foreign key to vehicle_makes (integer)
- `name`: Model name (text)
- `yearStart`: Starting year (integer, nullable)
- `yearEnd`: Ending year (integer, nullable)

### cart_items
- `id`: Primary key (serial)
- `sessionId`: Session identifier (text)
- `productId`: Foreign key to products (integer)
- `quantity`: Product quantity (integer)
- `createdAt`: Creation timestamp (timestamp)

## API Endpoints

The application provides the following API endpoints:

### Products
- `GET /api/products`: Get all products (supports filtering)
- `GET /api/products/:id`: Get product by ID

### Categories
- `GET /api/categories`: Get all categories
- `GET /api/categories/:id`: Get category by ID

### Vehicle Makes
- `GET /api/vehicle-makes`: Get all vehicle makes
- `GET /api/vehicle-makes/:id`: Get vehicle make by ID

### Vehicle Models
- `GET /api/vehicle-models`: Get all vehicle models (supports filtering by make)
- `GET /api/vehicle-models/:id`: Get vehicle model by ID

### Cart
- `GET /api/cart/:sessionId`: Get cart items for a session
- `POST /api/cart`: Add item to cart
- `PUT /api/cart/:id`: Update cart item quantity
- `DELETE /api/cart/:id`: Remove item from cart

## Troubleshooting

1. **Database Connection Issues**: 
   - Verify your database credentials in the `.env` file
   - Ensure PostgreSQL service is running
   - Check that the database and user have been created

2. **Port Conflicts**:
   - The default port for the server is 5000. If this port is in use, you can change it by setting the `PORT` environment variable.

3. **Missing Node Modules**:
   - Run `npm install` to install all dependencies
   - If you encounter issues with specific packages, try removing `node_modules` folder and `package-lock.json` file, then run `npm install` again

4. **TypeScript Errors**:
   - Run `npm run check` to verify TypeScript typings

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [React Query Documentation](https://tanstack.com/query/latest/docs/react/overview)