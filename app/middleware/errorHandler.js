const { isCelebrateError, Joi } = require('celebrate');
const response = require('../lib/response');
const log = require('../lib/logger');

const { ValidationError } = Joi;

const getErrorMessage = (err) => {
  if (err.details) {
    const [, detail] = Array.from(err.details.entries()).pop();
    return detail.message;
  }

  return err.message;
};

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err) || ValidationError.isError(err)) {
    const message = getErrorMessage(err);

    log.error(`Validation failed: ${message}`);

    return res.status(400).json(response({ message }, 400));
  } else if (err instanceof SyntaxError && 'body' in err) {
    log.error('Bad JSON');

    return res.status(400).json(response('Bad JSON'), 400);
  }

  log.error('Error Handler', err);
  next();
};
