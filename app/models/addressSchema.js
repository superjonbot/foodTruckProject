const { Joi } = require('celebrate');

const addressSchema = Joi.string()
  .pattern(/.*,\s*[A-Z]{2}\s*\d{5}(-\d{4})?$/)
  .min(5)
  .required()
  .messages({
    'string.base': 'Address must be a string.',
    'string.empty': 'Address cannot be empty.',
    'string.min': 'Address must be at least 5 characters long.',
    'string.pattern.base': 'Address must include a state abbreviation and end with a valid ZIP code.',
    'any.required': 'Address is required.',
  });

module.exports = addressSchema;
