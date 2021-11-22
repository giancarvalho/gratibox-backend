import pool from '../../database.js';

async function findUser(email) {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1;`, [
    email,
  ]);

  return result.rows;
}

export default findUser;
