import generateErrorMessage from '../factories/errorMessageFactory.js';
import findUser from '../queries/users/findUser.js';
import userSchema from './schemas/userSchema.js';

async function validateNewUser(userData) {
  const joiValidation = userSchema.validate(userData);
  let validation = { isInvalid: false };

  try {
    if (joiValidation.error) {
      validation = generateErrorMessage({
        errorCode: 400,
        message: joiValidation.error.details[0].message,
      });

      return { validation };
    }

    const isUser = await findUser(userData.email);

    if (isUser.length) {
      validation = generateErrorMessage({
        errorCode: 409,
        message: 'This email is already registered.',
      });

      return { validation };
    }

    return { validation };
  } catch (error) {
    validation = generateErrorMessage({ isUnknown: true });

    return { validation };
  }
}

export default validateNewUser;
