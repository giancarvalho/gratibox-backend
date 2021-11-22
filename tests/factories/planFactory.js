import getPlansDB from '../../src/queries/plans/getPlansDB';
import chooseRandom from './randomNumberFactory';

async function getRandomPlan() {
  const plans = await getPlansDB();
  const plan = chooseRandom(plans);

  const day =
    plan.name === 'mensal'
      ? chooseRandom([1, 10, 20])
      : chooseRandom([0, 1, 2, 3, 4, 5, 6]);

  return { planId: plan.id, day };
}

export default getRandomPlan;
