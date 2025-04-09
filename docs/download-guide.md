# Download and Migration Guide

This guide explains how to download the project and database from Replit and set it up in your local environment.

## Available Downloads

The project provides two ZIP archives that you can download:

1. **Project Archive**: `the-lense-shop.zip` - Contains all project files (code, configuration, etc.)
2. **Database Archive**: `thelenseshop-database.zip` - Contains database schema and data

## Creating the Archives

If the archives don't exist yet, you can create them using the provided scripts:

```bash
# Create project archive
./scripts/create-archive.sh

# Create database archive
./scripts/create-database-archive.sh
```

## Downloading from Replit

To download the archives from Replit:

1. In the Replit interface, locate the files in the file browser
2. Right-click on the file and select "Download"
3. Save the file to your local machine

## Setting Up Locally

### 1. Extract the Project Archive

```bash
unzip the-lense-shop.zip
cd the-lense-shop
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the Database

#### Extract the Database Archive

```bash
unzip thelenseshop-database.zip
```

This will create a `db` directory with three SQL files:
- `schema.sql`: Database structure only
- `data.sql`: Data only
- `full_backup.sql`: Complete database (structure and data)

#### Create a PostgreSQL Database

```bash
# Log in to PostgreSQL
psql -U postgres

# Create a database
CREATE DATABASE thelenseshop;

# Exit psql
\q
```

#### Import the Database

```bash
# Import the full backup (structure and data)
psql -U postgres -d thelenseshop -f db/full_backup.sql

# Or import separately:
# psql -U postgres -d thelenseshop -f db/schema.sql
# psql -U postgres -d thelenseshop -f db/data.sql
```

### 4. Configure Database Connection

Create a `.env` file in the project root directory:

```
DATABASE_URL=postgresql://username:password@localhost:5432/thelenseshop
```

Replace `username` and `password` with your PostgreSQL credentials.

### 5. Start the Application

```bash
npm run dev
```

## Using with WAMP/XAMPP

If you're using WAMP or XAMPP:

1. Place the extracted project files in your WAMP/XAMPP web directory (e.g., `htdocs` or `www`)
2. Install PostgreSQL separately (WAMP/XAMPP comes with MySQL, not PostgreSQL)
3. Set up the database as described above
4. Configure your application to connect to PostgreSQL
5. Start the application with `npm run dev`

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

1. Verify your database credentials in the `.env` file
2. Ensure PostgreSQL is running
3. Check that the database was created successfully
4. If using a non-default port, specify it in the connection string

### Missing Files or Dependencies

If you encounter missing files or dependencies:

1. Ensure you extracted the ZIP file correctly
2. Run `npm install` to install all dependencies
3. Check that all required files are present

### Port Conflicts

If there are port conflicts:

1. Change the port in your application by setting the `PORT` environment variable
2. Alternatively, stop any services using the conflicting port

## Backing Up Your Local Database

To create backups of your local database:

```bash
# Full backup
pg_dump -U postgres thelenseshop > local_backup.sql

# Schema only
pg_dump -U postgres --schema-only thelenseshop > local_schema.sql

# Data only
pg_dump -U postgres --data-only thelenseshop > local_data.sql
```