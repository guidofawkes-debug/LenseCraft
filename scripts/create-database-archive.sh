#!/bin/bash

# Make sure the database backup exists
if [ ! -d "backup/db" ]; then
  echo "Database backup not found. Running export-database.sh first..."
  ./scripts/export-database.sh
fi

# Create ZIP archive of the database backup
echo "Creating database backup archive..."
cd backup
zip -r ../thelenseshop-database.zip db

echo "Database backup archive created: thelenseshop-database.zip"
echo "You can download this file to import the database into your local PostgreSQL instance."