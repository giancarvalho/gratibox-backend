import getUserSubscriptionDB from '../queries/plans/getUserSubscriptionDB.js';
import getTokenDataDB from '../queries/sessions/getTokenDataDB.js';

async function getUserSubscription(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  try {
    const userId = (await getTokenDataDB(token)).user_id;
    const subscription = (await getUserSubscriptionDB(userId))[0];

    res.send(subscription);
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
}

export default getUserSubscription;
