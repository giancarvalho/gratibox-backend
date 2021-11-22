import Joi from 'joi';

const optionsSchema = Joi.array().items(Joi.number().min(1)).required();

export default optionsSchema;
