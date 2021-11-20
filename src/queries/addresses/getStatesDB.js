import pool from '../../database.js';

async function getStatesDB() {
  const result = await pool.query(`SELECT * FROM states;`);

  return result.rows;
}

export default getStatesDB;
