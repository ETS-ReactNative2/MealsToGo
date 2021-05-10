import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

import SafeArea from '../../../components/utils/SafeArea';
import Text from '../../../components/utils/Text';
import Spacer from '../../../components/utils/Spacer';

import { RestaurantList } from '../../restaurants/components/RestaurantListStyles';
import RestaurantInfoCard from '../../restaurants/components/RestaurantInfoCard';

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;
export default function FavoritesScreen({ navigation }) {
  const { favorites } = useSelector((state) => state.favorites);

  return favorites.length ? (
    <SafeArea>
      <RestaurantList
        data={favorites}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RestaurantDetails', {
                  restaurant: item,
                })
              }
            >
              <Spacer position='bottom' size='large'>
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text center>No favourites yet</Text>
    </NoFavouritesArea>
  );
}
