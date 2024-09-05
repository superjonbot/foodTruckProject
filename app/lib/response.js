module.exports = (results = {}, code = 200, status) => {
  const statusMap = {
    200: 'Ok',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Server Error',
  };

  status = status || statusMap[code] || 'Ok';

  return {
    code,
    status,
    results,
  };
};
