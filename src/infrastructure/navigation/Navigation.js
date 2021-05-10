import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AccountNavigator from './AccountNavigator';
import AppNavigator from './AppNavigator';
import { isLoggedIn } from '../../features/account/slices/userSlice';
import * as firebase from 'firebase';

export default function Navigation() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((usr) => {
      if (usr) {
        return dispatch(isLoggedIn(usr));
      } else {
        return;
      }
    });
  }, [dispatch]);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
}
