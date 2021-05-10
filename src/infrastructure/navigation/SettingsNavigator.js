import React from 'react';
import SettingsScreen from '../../features/settings/screens/SettingsScreen';
import FavoritesScreen from '../../features/settings/screens/FavoritesScreen';
import CameraScreen from '../../features/settings/screens/CameraScreen';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

const SettingsStack = createStackNavigator();

export default function SettingsNavigator({ route, navigation }) {
  return (
    <SettingsStack.Navigator
      headerMode='screen'
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        options={{
          header: () => null,
        }}
        name='Settings'
        component={SettingsScreen}
      />
      <SettingsStack.Screen name='Favorites' component={FavoritesScreen} />
      <SettingsStack.Screen name='Camera' component={CameraScreen} />
    </SettingsStack.Navigator>
  );
}
