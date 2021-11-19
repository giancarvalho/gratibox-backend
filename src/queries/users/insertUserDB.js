import bcrypt from 'bcrypt';
import pool from '../../database.js';

async function insertUserDB(userData) {
  const password = bcrypt.hashSync(userData.password, 10);

  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id;',
    [userData.name, userData.email, password]
  );

  return result.rows[0].id;
}

export default insertUserDB;
