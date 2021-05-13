/* eslint-disable no-undef */
const { locationsMock } = require('./mock.js');

Parse.Cloud.define('getLocation', async (request) => {
  const { location } = request.params;
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    return locationTransform(locationsMock[location.toLowerCase()]);
  }
  const formatLocation = location.replace(/ /gi, '%20');
  const { data } = await Parse.Cloud.httpRequest({
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${formatLocation}.json?limit=1&access_token=${process.env.MAPBOX_TOKEN}`,
  });
  return locationTransform(data);
});

const locationTransform = (data) => {
  const location = data.features[0];

  return {
    lng: location.center[0],
    lat: location.center[1],
    viewport: {
      southwest: {
        lng: location.bbox[0],
        lat: location.bbox[1],
      },
      northeast: {
        lng: location.bbox[2],
        lat: location.bbox[3],
      },
    },
  };
};
