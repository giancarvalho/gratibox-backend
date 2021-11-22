import { v4 as tokenGenerator } from 'uuid';
import insertTokenDB from '../queries/sessions/insertTokenDB.js';
import getTokenDataDB from '../queries/sessions/getTokenDataDB.js';
import validateUser from '../validations/user.js';
import getUserSubscriptionDB from '../queries/plans/getUserSubscriptionDB.js';

async function signIn(req, res) {
  const userData = req.body;
  const { user, validation } = await validateUser(userData);

  try {
    if (validation.isInvalid) throw validation.errorCode;

    const tokenSearch = await getTokenDataDB(user.id);

    const isSubscribed = (await getUserSubscriptionDB(user.id)).length > 0;

    let userToken;

    if (tokenSearch) {
      userToken = tokenSearch.token;
    } else {
      userToken = tokenGenerator();

      await insertTokenDB(user.id, userToken);
    }

    res.send({ name: user.name, token: userToken, isSubscribed });
  } catch (error) {
    if (validation.isInvalid) {
      return res.status(error).send(validation.errorMessage);
    }
    res.sendStatus(500);
  }
}

export default signIn;
