const response = require('../lib/response');

module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-requested-with');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('X-Xss-Protection', '1; mode=block');

  if (req.method === 'OPTIONS') {
    return res.status(200).json(response({}, 200));
  }

  next();
};
