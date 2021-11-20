import format from 'pg-format';
import pool from '../../database.js';

async function insertOptionsUserPlanDB(userPlanId, options) {
  const optionsValues = [];

  options.forEach((option) => {
    optionsValues.push([option.id, userPlanId]);
  });

  await pool.query(
    format(
      'INSERT INTO options_users_plans (option_id, user_plan_id) VALUES %L;',
      optionsValues
    ),
    []
  );
}

export default insertOptionsUserPlanDB;
