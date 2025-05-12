import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;
import { log } from './vite';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from secrets.txt
try {
  const secretsPath = path.join(process.cwd(), 'secrets.txt');
  const secrets = fs.readFileSync(secretsPath, 'utf8');
  
  secrets.split('\n').forEach(line => {
    if (line.trim()) {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    }
  });
} catch (err) {
  log('Error loading secrets.txt file', 'db');
  throw err;
}

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