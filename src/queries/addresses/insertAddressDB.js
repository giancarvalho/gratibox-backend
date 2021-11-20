import pool from '../../database.js';

async function insertAddressDB(userId, addressData) {
  const { address, city, stateId, zipcode, recipient } = addressData;

  const result = await pool.query(
    `INSERT INTO addresses (user_id, address, city, state_id, zipcode, recipient) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`,
    [userId, address, city, stateId, zipcode, recipient]
  );

  return result.rows[0].id;
}

export default insertAddressDB;
