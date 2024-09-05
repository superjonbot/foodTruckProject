const response = require('../lib/response');

module.exports = {
  index(req, res) {
    return res.json(response());
  },

  notFound(req, res) {
    return res.status(404).json(response({}, 404));
  },
};
