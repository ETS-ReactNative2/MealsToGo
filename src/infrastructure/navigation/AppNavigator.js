import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from '../../features/map/screens/MapScreen';
import RestaurantsNavigator from './RestaurantsNavigator';
import SettingsNavigator from './SettingsNavigator';
import CheckoutNavigator from './CheckoutNavigator';
import { loadCart } from '../../features/checkout/slices/cartSlice';
import { loadFavorites } from '../../components/Favorites/favoritesSlice';
import { loadPhoto } from '../../features/account/slices/userSlice';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: 'md-restaurant',
  Map: 'md-map',
  Checkout: 'md-cart',
  Settings: 'md-settings',
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export default function AppNavigator() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCart());
    dispatch(loadFavorites());
    dispatch(loadPhoto());
  }, [dispatch]);

  return (
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name='Restaurants' component={RestaurantsNavigator} />
      <Tab.Screen name='Checkout' component={CheckoutNavigator} />
      <Tab.Screen name='Map' component={MapScreen} />
      <Tab.Screen name='Settings' component={SettingsNavigator} />
    </Tab.Navigator>
  );
}
