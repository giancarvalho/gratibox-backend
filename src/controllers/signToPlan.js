import insertAddressDB from '../queries/addresses/insertAddressDB';
import insertOptionsUserPlanDB from '../queries/plans/insertOptionsUserPlanDB';
import insertUserPlanDB from '../queries/plans/insertUserPlanDB';
import validateNewSubscription from '../validations/newSubscription';

async function signToPlan(req, res) {
  const { userId, planDetails, addressData, options } = req.body;
  const { validation } = await validateNewSubscription(
    planDetails,
    addressData,
    options
  );

  try {
    if (validation.isInvalid) throw validation.errorCode;

    const userPlanId = await insertUserPlanDB(userId, planDetails);
    await insertOptionsUserPlanDB(userPlanId, options);
    await insertAddressDB(userPlanId, addressData);

    res.sendStatus(200);
  } catch (error) {
    if (validation.isInvalid) {
      return res.status(error).send(validation.errorMessage);
    }

    console.log(error);
    res.sendStatus(500);
  }
}

export default signToPlan;
