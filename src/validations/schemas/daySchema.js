import Joi from 'joi';

const daySchema = Joi.number().min(0).max(30).required();

export default daySchema;
