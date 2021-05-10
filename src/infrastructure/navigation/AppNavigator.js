import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text } from 'react-native';
import MapScreen from '../../features/map/screens/MapScreen';
import RestaurantsNavigator from './RestaurantsNavigator';
import SafeArea from '../../components/utils/SafeArea';
import { logout } from '../../features/account/slices/userSlice';
import {
  loadFavorites,
  saveFavorites,
} from '../../components/Favorites/favoritesSlice';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: 'md-restaurant',
  Map: 'md-map',
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

  const Settings = () => (
    <SafeArea>
      <Button
        title='logout'
        onPress={() => {
          dispatch(saveFavorites());
          dispatch(logout());
        }}
      />
      <Text>Settings</Text>
    </SafeArea>
  );

  useEffect(() => {
    dispatch(loadFavorites());
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
      <Tab.Screen name='Map' component={MapScreen} />
      <Tab.Screen name='Settings' component={Settings} />
    </Tab.Navigator>
  );
}
