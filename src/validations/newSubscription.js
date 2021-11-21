import generateErrorMessage from '../factories/errorMessageFactory.js';
import getOptionsDB from '../queries/plans/getOptionsDB.js';
import getPlansDB from '../queries/plans/getPlansDB.js';
import daySchema from './schemas/daySchema.js';
import addressSchema from './schemas/newAddress.js';
import optionsSchema from './schemas/optionsSchema.js';

async function validateNewSubscription(planDetails, addressData, options) {
  const joiAddressValidation = addressSchema.validate(addressData);
  const joiDayValidation = daySchema.validate(planDetails.day);
  const joiOptionsValidation = optionsSchema.validate(options);

  let validation = { isInvalid: false };

  try {
    if (
      joiAddressValidation.error ||
      joiDayValidation.error ||
      joiOptionsValidation.error
    ) {
      validation = generateErrorMessage({
        errorCode: 400,
        message:
          joiAddressValidation.error?.details[0].message ||
          joiDayValidation.error?.details[0].message ||
          joiOptionsValidation.error?.details[0].message,
      });

      return { validation };
    }

    const plans = await getPlansDB();
    const areValidPlans = plans.some((plan) => plan.id === planDetails.planId);

    if (!areValidPlans) {
      validation = generateErrorMessage({
        errorCode: 400,
        message: "Plan chosen doesn't exist.",
      });

      return { validation };
    }

    if (!options || !options.length) {
      validation = generateErrorMessage({
        errorCode: 400,
        message: 'Request must contain at least one option.',
      });

      return { validation };
    }

    const availableOptions = (await getOptionsDB()).map((option) => option.id);
    const areValidOptions = options.every((optionId) =>
      availableOptions.includes(optionId)
    );

    if (!areValidOptions) {
      validation = generateErrorMessage({
        errorCode: 400,
        message: 'Some options are not registered.',
      });

      return { validation };
    }

    return { validation };
  } catch (error) {
    validation = generateErrorMessage({ isUnknown: true });

    return { validation };
  }
}

export default validateNewSubscription;
