import pool from '../../database.js';

async function getPlansDB() {
  const result = await pool.query(
    `SELECT id, name, img_url AS img, description FROM plans;`
  );

  return result.rows;
}

export default getPlansDB;
