import insertUserDB from '../queries/users/insertUserDB.js';
import validateNewUser from '../validations/newUser.js';

async function signUp(req, res) {
  const userData = req.body;
  const { validation } = await validateNewUser(userData);

  try {
    if (validation.isInvalid) throw validation.errorCode;

    await insertUserDB(userData);

    res.sendStatus(201);
  } catch (error) {
    if (validation.isInvalid) {
      return res.status(error).send(validation.errorMessage);
    }

    res.sendStatus(500);
  }
}

export default signUp;
