import Joi from 'joi';

const addressSchema = Joi.object({
  recipient: Joi.string().min(3).max(30).required(),
  address: Joi.string().min(3).max(60).required(),
  zipcode: Joi.string()
    .pattern(/^([\d]{2})\.?([\d]{3})-?([\d]{3})/)
    .required(),
  city: Joi.string().min(3).max(80).required(),
  stateId: Joi.number().required(),
});

export default addressSchema;
