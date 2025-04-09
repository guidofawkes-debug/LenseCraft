#!/bin/bash

# Create backup directory
mkdir -p backup/db

echo "Exporting database from Replit to backup/db..."

# Export the schema
pg_dump --no-owner --no-acl --schema-only -U $PGUSER -h $PGHOST -p $PGPORT $PGDATABASE > backup/db/schema.sql
echo "Schema exported to backup/db/schema.sql"

# Export the data
pg_dump --no-owner --no-acl --data-only -U $PGUSER -h $PGHOST -p $PGPORT $PGDATABASE > backup/db/data.sql
echo "Data exported to backup/db/data.sql"

# Export everything
pg_dump --no-owner --no-acl -U $PGUSER -h $PGHOST -p $PGPORT $PGDATABASE > backup/db/full_backup.sql
echo "Full backup exported to backup/db/full_backup.sql"

echo "Database export completed successfully!"
echo "You can download these files and import them into your local PostgreSQL database."