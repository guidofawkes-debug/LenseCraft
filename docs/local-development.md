# Local Development Guide

This guide explains how to set up and run The Lense Shop e-commerce platform in your local development environment.

## Project Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm (usually comes with Node.js)

### Initial Setup

1. **Extract the project**

   Unzip the `the-lense-shop.zip` file to your desired location.

2. **Create environment configuration**

   Create a `.env` file in the root directory of the project with the following content:

   ```
   # Database Connection
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/thelenseshop
   
   # Optional - Stripe Integration
   STRIPE_SECRET_KEY=your_stripe_secret_key
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

   Replace `your_password` with your actual PostgreSQL password.

3. **Install dependencies**

   Open a terminal in the project root directory and run:

   ```bash
   npm install
   ```

4. **Set up the database**

   - Create a new PostgreSQL database named `thelenseshop`
   - Import the database dump:
     ```bash
     psql -U postgres -d thelenseshop -f thelenseshop_db_dump.sql
     ```

## Development Workflow

### Running the Application

1. **Start the development server**

   ```bash
   npm run dev
   ```

   This will start both the Express backend and React frontend with hot-reloading enabled.

2. **Access the application**

   Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

### Building for Production

To create a production build:

```bash
npm run build
```

To start the production version:

```bash
npm start
```

## Project Structure

Understanding the key files and directories:

### Frontend (React)

- `client/src/pages/` - React page components
- `client/src/components/` - Reusable UI components
- `client/src/hooks/` - Custom React hooks
- `client/src/lib/` - Utility functions and constants

### Backend (Express)

- `server/index.ts` - Express server entry point
- `server/routes.ts` - API endpoint definitions
- `server/storage.ts` - Data access layer
- `server/db.ts` - Database connection

### Shared

- `shared/schema.ts` - Database schemas using Drizzle ORM

## Customizing the Application

### Modifying the Database Schema

1. Update the Drizzle schema in `shared/schema.ts`
2. Run migration:
   ```bash
   npm run db:push
   ```

### Styling Modifications

The application uses Tailwind CSS:

- Global styles: `client/src/index.css`
- Component-specific styles: Within each component file
- Theme customization: `theme.json`

### Frontend Routes

Routes are defined in `client/src/App.tsx` using the wouter library.

## Common Development Tasks

### Adding a New Product

1. Insert a new product record in the `products` table
2. Ensure any related categories exist

### Adding a New Category

1. Insert a new category record in the `categories` table
2. Update products to use the new category

### Modifying Vehicle Makes/Models

1. Vehicle makes are stored in the `vehicle_makes` table
2. Vehicle models are stored in the `vehicle_models` table with a foreign key to makes

## Testing Stripe Integration

For testing payments locally:

1. Create a Stripe account and get API keys (test mode)
2. Update your `.env` file with the Stripe keys
3. Use Stripe's test card numbers for checkout:
   - Test success: `4242 4242 4242 4242`
   - Test failure: `4000 0000 0000 0002`

## Troubleshooting

### Module Not Found Errors

If you see errors related to missing modules:

```bash
npm install
```

### Database Connection Issues

If the application cannot connect to the database:

1. Verify PostgreSQL is running
2. Check the `DATABASE_URL` in your `.env` file
3. Make sure the database exists:
   ```sql
   psql -U postgres
   \l
   ```

### Port Conflicts

If port 5000 is already in use:

1. Modify the server port in `server/index.ts`
2. Update any hardcoded references to port 5000