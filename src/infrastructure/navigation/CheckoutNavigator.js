import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

const CheckoutStack = createStackNavigator();

import CheckoutScreen from '../../features/checkout/screens/CheckoutScreen';
import CheckoutErrorScreen from '../../features/checkout/screens/CheckoutErrorScreen';
import CheckoutSuccessScreen from '../../features/checkout/screens/CheckoutSuccessScreen';

export default function CheckoutNavigator() {
  return (
    <CheckoutStack.Navigator headerMode='none'>
      <CheckoutStack.Screen name='Checkout' component={CheckoutScreen} />
      <CheckoutStack.Screen
        name='CheckoutSuccess'
        component={CheckoutSuccessScreen}
      />
      <CheckoutStack.Screen
        name='CheckoutError'
        component={CheckoutErrorScreen}
      />
    </CheckoutStack.Navigator>
  );
}
