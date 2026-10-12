import app from './app.js';
import { env } from './config/env.js';
import { initializeDatabase } from './db/init.js';

// Initialize DB schema & seed if necessary
initializeDatabase();

const server = app.listen(env.PORT, () => {
  console.log(`====================================================`);
  console.log(`✦ The Date Crew (TDC) Matchmaker Engine Running`);
  console.log(`✦ Server: http://localhost:${env.PORT}`);
  console.log(`✦ API Health: http://localhost:${env.PORT}/api/health`);
  console.log(`✦ Database: ${env.DB_PATH}`);
  console.log(`====================================================`);
});

export default server;
