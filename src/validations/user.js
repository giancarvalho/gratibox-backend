import bcrypt from 'bcrypt';
import generateErrorMessage from '../factories/errorMessageFactory.js';
import findUser from '../queries/users/findUser.js';

async function validateUser(userData) {
  let validation = { isInvalid: false };

  try {
    if (!userData.email || !userData.password) {
      validation = generateErrorMessage({
        errorCode: 400,
        message: 'Email or password is missing,',
      });

      return { validation };
    }
    const user = (await findUser(userData.email))[0];

    if (!user) {
      validation = generateErrorMessage({
        errorCode: 404,
        message: 'User is not registered',
      });

      return { validation };
    }

    const isPasswordCorrect = bcrypt.compareSync(
      userData.password,
      user.password
    );

    if (!isPasswordCorrect) {
      validation = generateErrorMessage({
        errorCode: 401,
        message: 'Wrong password.',
      });

      return { validation };
    }

    return { validation, user };
  } catch (error) {
    console.log(error);
    validation = generateErrorMessage({ isUnknown: true });

    return { validation };
  }
}

export default validateUser;
