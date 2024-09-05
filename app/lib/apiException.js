const response = require('./response');
const log = require('./logger');
class ApiException extends Error {
  constructor(message = 'Server error', code = 500) {
    super(message);
    this.code = code;
  }
}

module.exports = {
  ApiException,
  exceptionResponse(e, res) {
    const code = e.code || 400;

    log.error(e.message);

    return res
      .status(code)
      .json(response({ message: e.message || 'There was an error processing your request.' }, code));
  },
};
