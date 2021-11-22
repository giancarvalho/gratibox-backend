import pool from '../../database.js';

async function getTokenData(query) {
  const filter = Number(query) ? `user_id` : 'token';

  const result = await pool.query(
    `SELECT * FROM sessions WHERE ${filter} = $1;`,
    [query]
  );

  return result.rows[0];
}

export default getTokenData;
