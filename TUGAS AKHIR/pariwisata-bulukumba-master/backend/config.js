// ANCHOR: Database connection pool (MySQL)
// Provides a shared MySQL connection pool and a small query helper.
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'bulukumba_tourism_db',
  DB_PORT = '3306',
} = process.env;

// export const pool = mysql.createPool({
//   host: "localhost",
//   user: "isad8273_bulukumba_tourism",
//   password: "isad8273_bulukumba_tourism",
//   database: "isad8273_bulukumba_tourism",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

export const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
});

export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}


