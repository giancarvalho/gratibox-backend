import pool from '../database.js';

async function cleanDB() {
  await pool.query('DELETE FROM options_users_plans;');
  await pool.query('DELETE FROM addresses;');
  await pool.query('DELETE FROM users_plans;');
  await pool.query('DELETE FROM sessions;');
  await pool.query('DELETE FROM users;');
}

export default cleanDB;
