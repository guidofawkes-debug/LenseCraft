# Database Guide for The Lense Shop

This document provides detailed information about the database setup, schema, and how to transfer it from Replit to your local environment.

## Database Overview

The Lense Shop uses PostgreSQL as its database system, managed through Drizzle ORM. The database schema is defined in `shared/schema.ts` and includes tables for products, categories, vehicle makes and models, cart items, and users.

## Database Schema

### Entity Relationship Diagram (Conceptual)

```
Users
  ↓
Products ←→ CartItems
  ↓
Categories

VehicleMakes → VehicleModels
```

### Relationships

- **Products to CartItems**: One-to-many relationship (one product can be in many cart items)
- **VehicleMakes to VehicleModels**: One-to-many relationship (one make has many models)

## How to Export the Database

### Using the Export Script

We've provided a script to make exporting the database easy:

1. Make the script executable:
   ```bash
   chmod +x scripts/export-database.sh
   ```

2. Run the script:
   ```bash
   ./scripts/export-database.sh
   ```

3. This will create three files in the `backup/db` directory:
   - `schema.sql`: Contains only the database structure
   - `data.sql`: Contains only the data
   - `full_backup.sql`: Contains both structure and data

### Manual Export

If you prefer to export manually:

```bash
# Export schema only
pg_dump --no-owner --no-acl --schema-only -U $PGUSER -h $PGHOST -p $PGPORT $PGDATABASE > schema.sql

# Export data only
pg_dump --no-owner --no-acl --data-only -U $PGUSER -h $PGHOST -p $PGPORT $PGDATABASE > data.sql

# Full export
pg_dump --no-owner --no-acl -U $PGUSER -h $PGHOST -p $PGPORT $PGDATABASE > full_backup.sql
```

## Local PostgreSQL Setup

### Windows

1. Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. During installation, set a password for the default 'postgres' user
3. Open pgAdmin (comes with PostgreSQL) to manage your databases
4. Create a new database named 'thelenseshop'
5. Import your exported database:
   ```bash
   psql -U postgres -d thelenseshop -f full_backup.sql
   ```

### macOS

1. Install PostgreSQL via Homebrew:
   ```bash
   brew install postgresql@14
   brew services start postgresql@14
   ```
2. Create a database:
   ```bash
   createdb thelenseshop
   ```
3. Import your database:
   ```bash
   psql -d thelenseshop -f full_backup.sql
   ```

### Linux

1. Install PostgreSQL:
   ```bash
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   ```
2. Switch to the PostgreSQL user:
   ```bash
   sudo -i -u postgres
   ```
3. Create a database:
   ```bash
   createdb thelenseshop
   ```
4. Import your database:
   ```bash
   psql -d thelenseshop -f /path/to/full_backup.sql
   ```

## Connecting Your Local App to the Database

Create a `.env` file in your project root with:

```
DATABASE_URL=postgresql://username:password@localhost:5432/thelenseshop
```

Replace `username` and `password` with your PostgreSQL credentials.

## Using with XAMPP/WAMP

If you prefer using XAMPP or WAMP:

1. Install PostgreSQL separately from XAMPP/WAMP
2. Configure your application to connect to PostgreSQL as described above
3. Use XAMPP/WAMP only for the web server functionality

**Note**: XAMPP and WAMP come with MariaDB/MySQL by default, but our application is designed for PostgreSQL. While it's possible to adapt the code to work with MySQL, it would require changes to the schema definitions and possibly some query syntax.

## Creating Migrations

If you need to make changes to the database schema:

1. Update the schema definitions in `shared/schema.ts`
2. Run the migration:
   ```bash
   npm run db:push
   ```

## Database Management Tools

Some recommended tools for managing PostgreSQL databases:

- **pgAdmin**: Full-featured GUI for PostgreSQL
- **DBeaver**: Universal database tool with PostgreSQL support
- **TablePlus**: Modern, native database management tool
- **DataGrip**: JetBrains IDE for databases

## Troubleshooting Database Issues

### Connection Problems

If you experience connection issues:

1. Check that PostgreSQL is running:
   ```bash
   # Windows
   net start postgresql-x64-14
   
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status postgresql
   ```

2. Verify your connection string in the `.env` file
3. Ensure your PostgreSQL user has the correct permissions
4. Check if the port (default 5432) is not blocked by a firewall

### Import/Export Issues

If you encounter problems with imports or exports:

1. Ensure you have the PostgreSQL client tools installed
2. Check database permissions
3. For large databases, try using the `--single-transaction` flag with pg_dump
4. For encoding issues, specify the encoding with `--encoding=UTF8`