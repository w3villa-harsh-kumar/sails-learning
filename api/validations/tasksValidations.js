const Joi = require('joi');

module.exports = {
  create: Joi.object({
    title: Joi.string().required().messages({
      'string.base': `Title should be a type of 'text'`,
      'string.empty': `Title cannot be an empty field`,
      'any.required': `Title is a required field`,
    }),
    description: Joi.string().required().messages({
      'string.base': `Description should be a type of 'text'`,
      'string.empty': `Description cannot be an empty field`,
      'any.required': `Description is a required field`,
    }),
    status: Joi.string().valid('pending', 'ongoing', 'completed').messages({
      'string.base': `Status should be a type of 'text'`,
    }),
    uuid: Joi.string().valid(Joi.ref('$uuid')).messages({
      'string.base': `UUID should be a type of 'text'`,
      'any.required': `UUID is a required field`,
    }),
  }),
  update: Joi.object({
    title: Joi.string().messages({
      'string.base': `Title should be a type of 'text'`,
      'string.empty': `Title cannot be an empty field`,
      'any.required': `Title is a required field`,
    }),
    description: Joi.string().messages({
      'string.base': `Description should be a type of 'text'`,
      'string.empty': `Description cannot be an empty field`,
      'any.required': `Description is a required field`,
    }),
    status: Joi.string().valid('pending', 'ongoing', 'completed').messages({
      'string.base': `Status should be a type of 'text'`,
    }),
  }),
};
