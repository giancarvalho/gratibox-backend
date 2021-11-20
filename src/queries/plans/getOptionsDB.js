import pool from '../../database.js';

async function getOptionsDB() {
  const result = await pool.query(`SELECT * FROM options;`);

  return result.rows;
}

export default getOptionsDB;
