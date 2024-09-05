const { celebrate } = require('celebrate');

const validate = (schema) => {
  return celebrate(schema, { allowUnknown: true });
};

module.exports = validate;
