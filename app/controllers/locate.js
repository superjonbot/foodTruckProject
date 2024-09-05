const response = require('../lib/response');
const log = require('../lib/logger');
const foodTruckApi = require('../services/foodTruckAPI');
const { exceptionResponse } = require('../lib/apiException');

const { getConfig, csvToJson } = require('../lib/utils');
const {
  foodTruck: { csv },
} = getConfig();

module.exports = {
  async foodTruck(req, res) {
    try {
      const { email, address, radius } = req.query;

      const jsonData = await csvToJson(csv);

      log.debug(`attempting to get results with ${radius} of ${address}`);

      const results = await foodTruckApi.getLocationsWithinRadius({ ...req.query, jsonData });
      res.json(response({ results, email, address, radius, count: results.length }));
    } catch (e) {
      exceptionResponse(e, res);
    }
  },
};
