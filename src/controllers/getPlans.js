import getPlansDB from '../queries/plans/getPlansDB.js';

async function getPlans(req, res) {
  try {
    const plans = await getPlansDB();

    res.send(plans);
  } catch (error) {
    res.sendStatus(500);
  }
}

export default getPlans;
