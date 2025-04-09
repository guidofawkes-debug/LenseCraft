# The Lense Shop

![The Lense Shop](https://i.imgur.com/OjR2ISW.png)

A premium e-commerce platform specializing in high-quality Japanese vehicle lighting products, with complete offline deployment support.

## 📋 Project Overview

**The Lense Shop** is a modern, fully-featured e-commerce platform built with these key capabilities:

- **Product Catalog** - Organized by categories with advanced filtering
- **Vehicle-Specific Search** - Find parts matching specific makes and models
- **Shopping Cart** - Seamless shopping experience with session-based cart
- **Stripe Payment Integration** - Secure checkout process
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **WhatsApp Business Integration** - Direct customer support channels
- **Offline Deployment** - Support for WAMP/XAMPP local development

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PostgreSQL](https://www.postgresql.org/download/) (v14+ recommended)
- [WAMP](https://www.wampserver.com/en/) (Windows) or [XAMPP](https://www.apachefriends.org/index.html) (Cross-platform)

### Installation

1. **Download & Extract** the complete project archive:
   - Project source code: `the-lense-shop.zip`
   - Database export: `thelenseshop_db_dump.sql`

2. **Set up the database**:
   ```sql
   CREATE DATABASE thelenseshop;
   ```
   Then import the database dump:
   ```bash
   psql -U postgres -d thelenseshop -f thelenseshop_db_dump.sql
   ```

3. **Configure environment**:
   Create a `.env` file in the project root:
   ```
   # Database Connection
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/thelenseshop
   
   # Stripe Integration (optional)
   STRIPE_SECRET_KEY=your_stripe_secret_key
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Launch the application**:
   ```bash
   npm run dev  # Development mode with hot-reloading
   # or
   npm start    # Production mode
   ```

   The application will be available at `http://localhost:5000`

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React, Tailwind CSS, Shadcn UI components |
| **Backend** | Express.js, Node.js |
| **Database** | PostgreSQL with Drizzle ORM |
| **Payment** | Stripe API |
| **State Management** | TanStack Query (React Query) |
| **Form Handling** | React Hook Form with Zod validation |

## 📁 Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   └── types/        # TypeScript type definitions
│   └── index.html
├── server/               # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API endpoints
│   ├── storage.ts        # Data access layer
│   └── db.ts             # Database connection
├── shared/               # Shared code between client and server
│   └── schema.ts         # Database schema with Drizzle ORM
└── docs/                 # Detailed documentation
    ├── database-guide.md # Database setup instructions
    ├── xampp-wamp-guide.md # XAMPP/WAMP integration guide
    └── local-development.md # Development workflow guide
```

## 🎨 Branding & Customization

The Lense Shop brand identity features:

- **Primary colors**: 
  - Red: `#E53935` 
  - White: `#FFFFFF`
  - Black: `#000000`
- **Brand Tagline**: "Let there be light"
- **Visual Motif**: Gear + lens icon
- **Positioning**: Japanese‑vehicle spares & accessories specialist—technical, reliable, performance‑driven

These values can be customized in:
- `theme.json` - Main theme colors
- Component styles - For component-specific styling

## 🔌 Integrations

### Stripe Payment Gateway

To enable payments:

1. Sign up for a [Stripe account](https://dashboard.stripe.com/register)
2. Get your API keys from the Stripe Dashboard
3. Update the `.env` file with your keys
4. Test the checkout flow with Stripe's test cards:
   - Success card: `4242 4242 4242 4242`
   - Failure card: `4000 0000 0000 0002`

### WhatsApp Business

The application includes direct WhatsApp integration with configurable message templates. Update the WhatsApp number in `client/src/lib/constants.ts` to change the contact number.

## 📊 Database Schema

The application uses these primary tables:

- `products` - Catalog items with pricing and inventory
- `categories` - Product classifications
- `vehicle_makes` - Car manufacturers
- `vehicle_models` - Specific vehicle models
- `cart_items` - User shopping cart
- `users` - User accounts and authentication

Full database documentation is available in `docs/database-guide.md`.

## 🔍 Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| **Database Connection Errors** | Verify PostgreSQL is running and credentials in `.env` are correct |
| **Missing Dependencies** | Run `npm install` to ensure all packages are installed |
| **Port Conflicts** | Check if another application is using port 5000 and update if needed |
| **Node.js Errors** | Ensure you're using Node.js v16+ (`node -v` to check) |

### Extended Documentation

For more detailed instructions, see:
- Database setup: `docs/database-guide.md`
- WAMP/XAMPP integration: `docs/xampp-wamp-guide.md`
- Local development: `docs/local-development.md`

## 📬 Support

For further assistance:
- **Email**: info@thelenseshop.com
- **WhatsApp**: 0772 377 137
- **Business Hours**: Mon-Fri (8:30 AM - 5:30 PM), Sat (9:00 AM - 2:00 PM)