import getPlansDB from '../../src/queries/plans/getPlansDB';
import createRandomNumber from './randomNumberFactory';

async function getRandomPlan() {
  const plans = await getPlansDB();
  const plan = plans[createRandomNumber(plans.length - 1)];
  const day =
    plan.name === 'mensal' ? createRandomNumber(30) : createRandomNumber(6);

  return { planId: plan.id, day };
}

export default getRandomPlan;
