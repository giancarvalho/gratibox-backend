import pool from '../../database.js';

async function getUserSubscriptionDB(userId) {
  const planDetails = await pool.query(
    'SELECT users_plans.id AS "userPlanId", users_plans.day, users_plans.timestamp, plans.name FROM users_plans JOIN plans ON plan_id=plans.id WHERE user_id = $1',
    [userId]
  );

  if (planDetails.rowCount > 0) {
    const subscriptionData = planDetails.rows[0];

    const optionsDetails = await pool.query(
      'SELECT options.name FROM users_plans JOIN options_users_plans ON options_users_plans.user_plan_id=users_plans.id JOIN options ON options_users_plans.option_id=options.id WHERE user_id = $1',
      [userId]
    );

    return [{ ...subscriptionData, options: optionsDetails.rows }];
  }

  return planDetails.rows;
}

export default getUserSubscriptionDB;
