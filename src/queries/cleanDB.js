import pool from '../database.js';

async function cleanDB() {
  await pool.query('DELETE FROM users;');
}

export default cleanDB;
