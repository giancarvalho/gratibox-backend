import pool from '../../database.js';

async function insertUserPlanDB(userId, planId) {
  const result = await pool.query(
    `INSERT INTO users_plans (user_id, plan_id) VALUES ($1, $2) RETURNING id;`,
    [userId, planId]
  );

  return result.rows[0].id;
}

export default insertUserPlanDB;
