import pool from '../../database.js';

async function getPlanDB(planId) {
  const plan = await pool.query('SELECT * FROM plans WHERE plans.id = $1;', [
    planId,
  ]);

  const days = await pool.query(
    'SELECT name as "dayName", value FROM days WHERE plan_id = $1;',
    [planId]
  );

  return { planInfo: plan.rows[0], days: days.rows };
}

export default getPlanDB;
