import React from 'react';
import { useSelector } from 'react-redux';
import RestaurantsMap from '../components/RestaurantsMap';

import { Map } from '../components/mapStyles';

export default function MapScreen({ navigation }) {
  const { geometry } = useSelector((state) => state.location);
  if (!geometry) {
    return (
      <Map
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  } else {
    return <RestaurantsMap navigation={navigation} />;
  }
}
