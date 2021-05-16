/* eslint-disable no-undef */
const stripeClient = require('stripe')(process.env.STRIPE);

Parse.Cloud.define('makePay', async (request) => {
  const { tokenId, amount } = request.params;
  const paymentIntent = await stripeClient.paymentIntents.create({
    amount: amount * 100,
    currency: 'usd',
    payment_method_types: ['card'],
    payment_method_data: {
      type: 'card',
      card: {
        token: tokenId,
      },
    },
    confirm: true,
  });
  return paymentIntent;
});
