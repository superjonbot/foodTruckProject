const fs = require('fs');
const csv = require('csv-parser');
const dotenv = require('dotenv');
dotenv.config();
const globalConfig = require(`../../config/${process.env.MY_ENV}.json`);

// Converts CSV file to JSON
const csvToJson = (csvFilePath) => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

const getConfig = () => {
  return globalConfig;
};

module.exports = {
  getConfig,
  csvToJson,
};
