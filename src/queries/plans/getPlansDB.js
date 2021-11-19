import pool from '../../database.js';

async function getPlansDB() {
  const result = await pool.query(`SELECT * FROM plans;`);

  return result.rows;
}

export default getPlansDB;
