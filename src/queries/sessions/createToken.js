import pool from '../../database.js';

async function createToken(id, token) {
  await pool.query(`INSERT INTO sessions (user_id, token) VALUES ($1, $2)`, [
    id,
    token,
  ]);
}

export default createToken;
