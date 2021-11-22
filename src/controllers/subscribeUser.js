import insertAddressDB from '../queries/addresses/insertAddressDB.js';
import insertOptionsUserPlanDB from '../queries/plans/insertOptionsUserPlanDB.js';
import insertUserPlanDB from '../queries/plans/insertUserPlanDB.js';
import getTokenDataDB from '../queries/sessions/getTokenDataDB.js';
import validateNewSubscription from '../validations/newSubscription.js';

async function subscribeUser(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const { planDetails, addressData, options } = req.body;
  const { validation } = await validateNewSubscription(
    planDetails,
    addressData,
    options
  );

  try {
    if (validation.isInvalid) throw validation.errorCode;
    const userId = (await getTokenDataDB(token)).user_id;

    const userPlanId = await insertUserPlanDB(userId, planDetails);
    await insertOptionsUserPlanDB(userPlanId, options);
    await insertAddressDB(userPlanId, addressData);

    res.sendStatus(200);
  } catch (error) {
    if (validation.isInvalid) {
      return res.status(error).send(validation.errorMessage);
    }

    res.sendStatus(500);
  }
}

export default subscribeUser;
