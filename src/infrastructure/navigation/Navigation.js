import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AccountNavigator from './AccountNavigator';
import AppNavigator from './AppNavigator';

export default function Navigation() {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <NavigationContainer>
      {isAuthenticated || true ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
}
