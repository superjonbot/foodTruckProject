const { ApiException } = require('../lib/apiException');
const { getDistance } = require('geolib');
const { getConfig } = require('../lib/utils');

const {
  foodTruck: { geocodeAPI },
} = getConfig();

const metersToMiles = 1609.34;
const mileInDegrees = 69;

// Geocode address to get latitude and longitude
const geocodeAddress = async (address) => {
  const response = await fetch(`${geocodeAPI}?q=${encodeURIComponent(address)}&format=json`);
  const data = await response.json();
  if (data.length === 0) {
    throw new ApiException(`The address, "${address}", failed @ ${geocodeAPI}`);
  }
  return {
    latitude: parseFloat(data[0].lat),
    longitude: parseFloat(data[0].lon),
  };
};

// Calculate distance between two coordinates in miles
const calculateDistanceMiles = (coord1, coord2) => {
  const distanceMeters = getDistance(coord1, coord2);
  return distanceMeters / metersToMiles;
};

// Get the lowest and highest latitude and longitude from jsonData
const getLatLonBounds = (jsonData, radiusMiles) => {
  const boundBuffer = radiusMiles / mileInDegrees;
  let minLat = Infinity,
    maxLat = -Infinity,
    minLon = Infinity,
    maxLon = -Infinity;

  jsonData.forEach((row) => {
    const latitude = parseFloat(row.Latitude);
    const longitude = parseFloat(row.Longitude);

    if (Number(latitude) !== 0 && Number(longitude) !== 0) {
      if (latitude < minLat) minLat = latitude;
      if (latitude > maxLat) maxLat = latitude;
      if (longitude < minLon) minLon = longitude;
      if (longitude > maxLon) maxLon = longitude;
    }
  });

  // give some buffer to the bounds
  minLat -= boundBuffer;
  maxLat += boundBuffer;
  minLon -= boundBuffer;
  maxLon += boundBuffer;

  return {
    minLat,
    maxLat,
    minLon,
    maxLon,
  };
};

// Get locations within a certain radius of an address
const getLocationsWithinRadius = async (reqData) => {
  const { address, radius: radiusMiles, jsonData } = reqData;

  const bounds = getLatLonBounds(jsonData, radiusMiles);

  try {
    const addressCoords = await geocodeAddress(address);

    if (
      addressCoords.latitude < bounds.minLat ||
      addressCoords.latitude > bounds.maxLat ||
      addressCoords.longitude < bounds.minLon ||
      addressCoords.longitude > bounds.maxLon
    ) {
      throw new ApiException(`The address, "${address}", is outside the bounds of the data.`);
    }
    const results = [];

    jsonData.forEach((row) => {
      const latitude = parseFloat(row.Latitude);
      const longitude = parseFloat(row.Longitude);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        const distanceMiles = calculateDistanceMiles(
          { latitude: addressCoords.latitude, longitude: addressCoords.longitude },
          { latitude, longitude }
        );

        if (distanceMiles <= radiusMiles) {
          results.push(row);
        }
      }
    });

    return results;
  } catch (error) {
    throw new ApiException(error.message);
  }
};

module.exports = {
  getLocationsWithinRadius,
};
