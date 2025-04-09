import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;
import { log } from './vite';

// Get database connection details from environment variables
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  log('No DATABASE_URL found in environment variables', 'db');
  throw new Error('DATABASE_URL is required');
}

log(`Connecting to database: ${connectionString.split('@')[1] || 'postgresql'}`, 'db');

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 30000,
});

// Test the connection
pool.connect()
  .then(client => {
    log('Successfully connected to PostgreSQL database', 'db');
    client.release();
  })
  .catch(err => {
    log(`Error connecting to PostgreSQL database: ${err.message}`, 'db');
    throw err;
  });

// Create a drizzle instance
export const db = drizzle(pool);