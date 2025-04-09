# The Lense Shop

A modern e-commerce platform for Japanese vehicle lighting products with WhatsApp integration for customer inquiries.

## Features

- **Product Browsing**: Browse through a catalog of lighting products
- **Vehicle-Specific Search**: Find products compatible with specific vehicle makes and models
- **Shopping Cart**: Add products to cart and manage quantities
- **WhatsApp Integration**: Contact sellers directly through WhatsApp
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Premium Visuals**: Animated backgrounds and interactive elements for a premium feel

## Tech Stack

- **Frontend**: React, TailwindCSS, Shadcn UI
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: React Query
- **Routing**: Wouter

## Getting Started

### Prerequisites

- Node.js v18+
- npm
- PostgreSQL

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database (see [Database Guide](docs/database-guide.md))
4. Create a `.env` file with your database connection string:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/thelenseshop
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Documentation

Detailed documentation can be found in the `docs` directory:

- [Installation Guide](docs/installation-guide.md): Complete installation instructions
- [Database Guide](docs/database-guide.md): Database setup and management
- [Code Structure](docs/code-structure.md): Project architecture and code organization

## Database Backup and Restore

The project includes scripts to easily backup and restore the database:

```bash
# Export the database
./scripts/export-database.sh

# The exports will be saved to:
# - backup/db/schema.sql (structure only)
# - backup/db/data.sql (data only)
# - backup/db/full_backup.sql (structure and data)
```

These files can be used to restore the database on your local environment.

## Running Locally with WAMP/XAMPP

See the [Installation Guide](docs/installation-guide.md) for detailed instructions on running this project with WAMP or XAMPP.

## Development Workflow

1. Make changes to the code
2. The development server will automatically reload
3. Test your changes
4. Run database migrations if needed: `npm run db:push`

## Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
├── client/                 # Frontend React code
├── server/                 # Backend Express.js code
├── shared/                 # Shared code (schemas, types)
├── scripts/                # Utility scripts
├── docs/                   # Documentation
├── backup/                 # Database backups
└── various config files
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## License

This project is licensed under the MIT License.