import pool from '../../database.js';

async function getUserSubscriptionDB(userId) {
  const result = await pool.query(
    'SELECT users_plans.day, users_plans.timestamp, plans.name FROM users_plans JOIN plans ON plan_id=plans.id WHERE user_id = $1',
    [userId]
  );

  return result.rows;
}

export default getUserSubscriptionDB;
