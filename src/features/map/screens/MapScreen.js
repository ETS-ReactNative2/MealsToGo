import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MapView from 'react-native-maps';
import MapCallout from '../components/MapCallout';

import styled from 'styled-components/native';
import Search from '../components/Search';

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;
export default function MapScreen({ navigation }) {
  const { location } = useSelector((state) => state.location);
  const { restaurants } = useSelector((state) => state.restaurantsList);
  const [latDelta, setLatDelta] = useState(0);
  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <MapView.Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <MapView.Callout
                onPress={() =>
                  navigation.navigate('RestaurantDetails', {
                    restaurant,
                  })
                }
              >
                <MapCallout restaurant={restaurant} />
              </MapView.Callout>
            </MapView.Marker>
          );
        })}
      </Map>
    </>
  );
}
