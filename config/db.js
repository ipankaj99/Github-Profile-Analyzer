import { Pool } from "pg";
// import mysql from 'mysql2/promise';

// const pool=mysql.createPool({
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_NAME,
//     connectionLimit:20
// })

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;