/* eslint-disable no-unused-vars */
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config();
}

const Location = require('./location/index.js');
const Restaurants = require('./restaurants/index.js');
const Checkout = require('./checkout/index.js');
