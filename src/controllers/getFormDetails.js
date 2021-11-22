import getStatesDB from '../queries/addresses/getStatesDB.js';
import getOptionsDB from '../queries/plans/getOptionsDB.js';
import getPlanDB from '../queries/plans/getPlanDB.js';

async function getFormDetails(req, res) {
  const { planId } = req.query;
  try {
    if (!planId) return res.sendStatus(400);

    const states = await getStatesDB();
    const plan = await getPlanDB(planId);
    const options = await getOptionsDB();

    res.send({ states, options, plan });
  } catch (error) {
    res.sendStatus(500);
  }
}

export default getFormDetails;
