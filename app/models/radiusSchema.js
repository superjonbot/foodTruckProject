const { Joi } = require('celebrate');

const radiusSchema = Joi.number().greater(0).less(25).required().messages({
  'number.base': 'Radius must be a number.',
  'number.greater': 'Radius must be larger than 0 miles.',
  'number.less': 'Radius must be smaller than 25 miles.',
  'any.required': 'Radius is required.',
});

module.exports = radiusSchema;
