import pool from '../../database.js';

async function insertUserPlanDB(userId, planDetails) {
  const { planId, day } = planDetails;

  const result = await pool.query(
    `INSERT INTO users_plans (user_id, plan_id, day) VALUES ($1, $2, $3) RETURNING id;`,
    [userId, planId, day]
  );

  return result.rows[0].id;
}

export default insertUserPlanDB;
