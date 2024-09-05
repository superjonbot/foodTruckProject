const { Joi } = require('celebrate');

const addressSchema = require('./addressSchema'); // Import the address schema
const radiusSchema = require('./radiusSchema'); // Import the radius schema

module.exports = {
  query: {
    email: Joi.string().email().empty('').messages({ '*': 'Invalid email.' }),
    userId: Joi.string().min(8).empty('').messages({ '*': 'Invalid user ID.' }),
    address: addressSchema,
    radius: radiusSchema,
  },
};
