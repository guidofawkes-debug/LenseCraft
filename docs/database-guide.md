# Database Migration Guide

This document provides detailed instructions for migrating The Lense Shop database from Replit to a local PostgreSQL installation for offline development and testing.

## Database Schema Overview

The Lense Shop uses the following tables:

- `products`: Product catalog items
- `categories`: Product categories 
- `vehicle_makes`: Available vehicle manufacturers
- `vehicle_models`: Vehicle models associated with makes
- `cart_items`: Shopping cart state
- `users`: User accounts

## Migration Steps

### 1. Install PostgreSQL

#### Windows
1. Download the PostgreSQL installer from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer and follow the setup wizard
3. Choose a password for the postgres user and make note of it
4. The default port is 5432 - keep this unless you have a reason to change it
5. Complete the installation

#### macOS
1. Use Homebrew: `brew install postgresql`
2. Start the service: `brew services start postgresql`

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Create Database

1. Open a terminal/command prompt
2. Connect to PostgreSQL:
   ```bash
   # Windows (after adding psql to your PATH)
   psql -U postgres
   
   # macOS
   psql postgres
   
   # Linux
   sudo -u postgres psql
   ```

3. Create the database:
   ```sql
   CREATE DATABASE thelenseshop;
   ```

4. Verify the database was created:
   ```sql
   \l
   ```

### 3. Import Database Data

#### Using psql Command Line

1. Navigate to the folder containing your `thelenseshop_db_dump.sql` file
2. Run the following command:
   ```bash
   # Windows
   psql -U postgres -d thelenseshop -f thelenseshop_db_dump.sql
   
   # macOS/Linux
   psql -U postgres -d thelenseshop -f thelenseshop_db_dump.sql
   ```

#### Using pgAdmin

1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Right-click on your `thelenseshop` database and select "Restore..."
4. Browse to and select the `thelenseshop_db_dump.sql` file
5. Click "Restore" to import the data

### 4. Configure Application

1. Create a `.env` file in the project root directory:
   ```
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/thelenseshop
   ```
   
   Replace `your_password` with your PostgreSQL password.

2. If using XAMPP/WAMP, ensure your PostgreSQL service is running before starting the application.

### 5. Verify Connection

1. Start your application
2. If the product data displays correctly, your database is successfully connected

## Troubleshooting

### Connection Issues

If you see database connection errors:

1. Verify PostgreSQL is running:
   ```bash
   # Windows
   sc query postgresql
   
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status postgresql
   ```

2. Check your credentials in the `.env` file
3. Make sure the port (5432) is not blocked by a firewall

### Import Errors

If you encounter errors during import:

1. Check the SQL dump file for any database-specific commands that might not be compatible
2. Verify you have the correct permissions to create tables and import data

## Database Schema Diagram

```
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│   products    │       │  categories   │       │ vehicle_makes │
├───────────────┤       ├───────────────┤       ├───────────────┤
│ id            │       │ id            │       │ id            │
│ name          │       │ name          │       │ name          │
│ description   │       │ description   │       │ createdAt     │
│ price         │       │ imageUrl      │       └───────┬───────┘
│ brand         │       │ productCount  │               │
│ imageUrl      │       │ createdAt     │               │
│ category      │       └───────────────┘               │
│ stock         │                                       │
│ featured      │                                       │
│ createdAt     │                                       │
└───────┬───────┘                                       │
        │                                               │
        ▼                                               ▼
┌───────────────┐                           ┌───────────────────┐
│   cart_items  │                           │  vehicle_models   │
├───────────────┤                           ├───────────────────┤
│ id            │                           │ id                │
│ sessionId     │                           │ makeId            │
│ productId     │                           │ name              │
│ quantity      │                           │ yearStart         │
│ createdAt     │                           │ yearEnd           │
└───────────────┘                           │ createdAt         │
                                           └───────────────────┘
```

## Backup Strategy

To create regular backups of your local database:

```bash
# Create backup
pg_dump -U postgres -d thelenseshop > backup_$(date +%Y%m%d).sql

# Restore from backup
psql -U postgres -d thelenseshop -f backup_filename.sql
```

It's recommended to create backups before significant changes or on a regular schedule.