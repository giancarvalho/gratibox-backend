import { v4 as tokenGenerator } from 'uuid';
import createToken from '../queries/sessions/createToken.js';
import getTokenData from '../queries/sessions/getTokenData.js';
import validateUser from '../validations/user.js';

async function signIn(req, res) {
  const userData = req.body;
  const { user, validation } = await validateUser(userData);

  try {
    if (validation.isInvalid) throw validation.errorCode;

    const tokenSearch = await getTokenData(user.id);

    let userToken;

    if (tokenSearch) {
      userToken = tokenSearch.token;
    } else {
      userToken = tokenGenerator();

      await createToken(user.id, userToken);
    }

    res.send({ name: user.name, token: userToken });
  } catch (error) {
    if (validation.isInvalid) {
      return res.status(error).send(validation.errorMessage);
    }
    res.sendStatus(500);
  }
}

export default signIn;
