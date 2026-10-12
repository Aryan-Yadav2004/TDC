import { initializeDatabase } from './init.js';

console.log('Force re-seeding TDC database...');
initializeDatabase({ force: true });
console.log('Done!');
process.exit(0);
