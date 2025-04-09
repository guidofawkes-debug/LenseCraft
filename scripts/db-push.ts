import { db } from '../server/db';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import * as schema from '../shared/schema';

// Run the migrations
async function main() {
  console.log('Starting database migration...');
  try {
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main();