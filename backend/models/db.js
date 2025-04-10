// models/db.js
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

console.log('DATABASE_URL:', process.env.DATABASE_URL); // ✅ Add this line

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
