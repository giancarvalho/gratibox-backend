import getStatesDB from '../queries/addresses/getStatesDB.js';
import getOptionsDB from '../queries/plans/getOptionsDB.js';
import getPlansDB from '../queries/plans/getPlansDB.js';

async function getFormDetails(req, res) {
  try {
    const states = await getStatesDB();
    const plans = await getPlansDB();
    const options = await getOptionsDB();

    res.send({ states, options, plans });
  } catch (error) {
    res.sendStatus(500);
  }
}

export default getFormDetails;
