# The Lense Shop

A premium e-commerce platform for Japanese vehicle lighting products with complete offline deployment support.

## Project Overview

**The Lense Shop** is a modern e-commerce platform specializing in high-quality Japanese vehicle lighting products with these key features:

- Product catalog with categories and filtering
- Vehicle-specific product search
- Shopping cart functionality
- Stripe payment integration
- Responsive design with mobile support
- WhatsApp business integration

## Tech Stack

- **Frontend**: React, Tailwind CSS, Shadcn UI components
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Payment**: Stripe API

## Offline Deployment Guide

### Prerequisites

- [WAMP](https://www.wampserver.com/en/) (Windows) or [XAMPP](https://www.apachefriends.org/index.html) (Cross-platform)
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PostgreSQL](https://www.postgresql.org/download/) (v14+ recommended)

### Database Setup

1. **Install PostgreSQL** if you haven't already
   - During installation, note your admin password

2. **Create a new database**
   ```sql
   CREATE DATABASE thelenseshop;
   ```

3. **Import the database dump**
   - Open pgAdmin or use psql command-line tool
   - Connect to your `thelenseshop` database
   - Import the SQL dump file: `thelenseshop_db_dump.sql`

   Using psql command line:
   ```bash
   psql -U postgres -d thelenseshop -f path/to/thelenseshop_db_dump.sql
   ```

### Environment Setup

1. **Create a `.env` file in the project root**:

   ```
   # Database Connection
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/thelenseshop
   
   # Optional: Stripe Integration (if you want to test payments)
   STRIPE_SECRET_KEY=your_stripe_secret_key
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```
   
   Replace `your_password` with your PostgreSQL password and the Stripe keys if needed.

### Installation and Setup

1. **Extract the project files** from `the-lense-shop.zip`

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

   The application should now be running at `http://localhost:5000`

### Development Mode

For development with hot-reloading:

```bash
npm run dev
```

## Database Schema

The application uses the following tables:

- `products`: Store product details (name, description, price, etc.)
- `categories`: Product categories
- `vehicle_makes`: Vehicle manufacturers
- `vehicle_models`: Vehicle models linked to makes
- `cart_items`: Shopping cart items
- `users`: User accounts

## Customization

### Branding

The brand uses the following color scheme:
- Primary Red: `#E53935`
- White: `#FFFFFF`
- Black: `#000000`

These values can be modified in `theme.json` and various component files.

## Stripe Integration (Optional)

To enable payments, update your `.env` file with valid Stripe API keys:

1. Sign up for a [Stripe account](https://dashboard.stripe.com/register)
2. Get your API keys from the Stripe Dashboard
3. Update the `.env` file with your keys

## Troubleshooting

### Database Connection Issues

If you encounter database connection problems:

1. Verify PostgreSQL is running
2. Check your database credentials in `.env`
3. Ensure the database name matches

### Node.js Version Issues

This project requires Node.js v16+. If you encounter compatibility issues:

1. Check your Node.js version: `node -v`
2. Update Node.js if needed

## Support

For further assistance, please contact:
- Email: info@thelenseshop.com
- WhatsApp: 0772 377 137