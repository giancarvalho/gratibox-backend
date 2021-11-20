import insertAddressDB from '../queries/addresses/insertAddressDB';
import insertOptionsUserPlanDB from '../queries/plans/insertOptionsUserPlanDB';
import insertUserPlanDB from '../queries/plans/insertUserPlanDB';

async function signToPlan(req, res) {
  const { userId, planId, addressData, options } = req.body;

  try {
    const userPlanId = await insertUserPlanDB(userId, planId);
    await insertOptionsUserPlanDB(userPlanId, options);
    await insertAddressDB(userId, addressData);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default signToPlan;
