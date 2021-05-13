/* eslint-disable no-undef */
const {
  restaurantsMocks,
  getMockImage,
  getMockIcon,
  getMockIsOpenNow,
  getMockRating,
} = require('./mock/index.js');

Parse.Cloud.define('getNearbyRestaurants', async (request) => {
  const { location } = request.params;
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    return restaurantsTransform(
      restaurantsMocks[`${location.lat},${location.lng}`]
    );
  }
  const { proximity, bbox } = locationToString(location);
  const { data } = await Parse.Cloud.httpRequest({
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant.json?limit=15&proximity=${proximity}&bbox=${bbox}&access_token=${process.env.MAPBOX_TOKEN}`,
  });
  return restaurantsTransform(data);
});

const locationToString = (location) => {
  const { lng, lat, viewport } = location;
  return {
    proximity: `${lng},${lat}`,
    bbox: `${viewport.southwest.lng},${viewport.southwest.lat},${viewport.northeast.lng},${viewport.northeast.lat}`,
  };
};

const restaurantsTransform = (rawData) => {
  const formatRestaurants = rawData.features.map((restaurant) => {
    const { geometry, text, properties, id } = restaurant;
    return {
      name: text,
      icon: getMockIcon(),
      photos: [getMockImage()],
      address: properties.address,
      category: properties.category,
      isOpenNow: getMockIsOpenNow(),
      rating: getMockRating(),
      placeId: id,
      geometry: {
        lng: geometry.coordinates[0],
        lat: geometry.coordinates[1],
      },
    };
  });
  return formatRestaurants;
};
