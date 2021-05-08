import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import RestaurantsScreen from '../../features/restaurants/screens/RestaurantsScreen';
import RestaurantDetailsScreen from '../../features/restaurants/screens/RestaurantDetailsScreen';

const RestaurantStack = createStackNavigator();

export default function RestaurantsNavigator() {
  return (
    <RestaurantStack.Navigator
      headerMode='none'
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <RestaurantStack.Screen
        name='Restaurants'
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        name='RestaurantDetails'
        component={RestaurantDetailsScreen}
      />
    </RestaurantStack.Navigator>
  );
}
