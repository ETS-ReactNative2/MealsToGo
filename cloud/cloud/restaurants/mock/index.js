const antwerp = require('./antwerp.js');
const chicago = require('./chicago.js');
const toronto = require('./toronto.js');
const san_francisco = require('./san_francisco.js');

module.exports.restaurantsMocks = {
  '51.2211097,4.3997081': antwerp,
  '43.6529,-79.3849': toronto,
  '41.8756,-87.6244': chicago,
  '37.7648,-122.463': san_francisco,
};

const mockImages = [
  'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
  'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-oranges-ice-600x750.jpg',
  'https://www.foodiesfeed.com/wp-content/uploads/2020/08/detail-of-pavlova-strawberry-piece-of-cake-600x800.jpg',
  'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-baking-600x750.jpg',
  'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-pancakes-600x750.jpg',
  'https://www.foodiesfeed.com/wp-content/uploads/2019/02/messy-pizza-on-a-black-table-600x400.jpg',
  'https://www.foodiesfeed.com/wp-content/uploads/2019/02/pizza-ready-for-baking-600x400.jpg',
];

module.exports.getMockImage = () => {
  return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
};

const mockIcon =
  'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png';

module.exports.getMockIcon = () => {
  return mockIcon;
};

module.exports.getMockIsOpenNow = () => {
  return Math.random() > 0.15 ? true : false;
};

module.exports.getMockRating = () => {
  return Math.floor(Math.random() * 2) + 4;
};
