# The Lense Shop Documentation

Welcome to the documentation for The Lense Shop project. This documentation will guide you through setting up, understanding, and extending the project.

## Available Documentation

- [Installation Guide](installation-guide.md) - How to set up the project locally
- [Database Guide](database-guide.md) - Database structure and management
- [Code Structure Guide](code-structure.md) - Project architecture and organization
- [Download Guide](download-guide.md) - How to download and migrate the project

## Quick Start

For a quick start, follow these steps:

1. Download the project and database archives:
   - `the-lense-shop.zip` - Project files
   - `thelenseshop-database.zip` - Database files

2. Extract the project archive:
   ```bash
   unzip the-lense-shop.zip
   cd the-lense-shop
   ```

3. Set up the database:
   - Create a PostgreSQL database named `thelenseshop`
   - Import the database from the extracted database archive:
     ```bash
     psql -U postgres -d thelenseshop -f path/to/extracted/db/full_backup.sql
     ```

4. Configure the database connection:
   - Create a `.env` file with your database credentials:
     ```
     DATABASE_URL=postgresql://username:password@localhost:5432/thelenseshop
     ```

5. Install dependencies and start the application:
   ```bash
   npm install
   npm run dev
   ```

## Utility Scripts

The project includes several utility scripts to make development easier:

- `./scripts/export-database.sh` - Export the database to SQL files
- `./scripts/create-archive.sh` - Create a ZIP archive of the project
- `./scripts/create-database-archive.sh` - Create a ZIP archive of the database

## Need Help?

If you encounter any issues or have questions, please refer to the detailed documentation or contact the development team.