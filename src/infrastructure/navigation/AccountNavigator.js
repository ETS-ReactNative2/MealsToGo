import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '../../features/account/screens/accountScreen';
import LoginScreen from '../../features/account/screens/loginScreen';
import RegisterScreen from '../../features/account/screens/registerScreen';

const Stack = createStackNavigator();

export default function AccountNavigator() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Main' component={AccountScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  );
}
