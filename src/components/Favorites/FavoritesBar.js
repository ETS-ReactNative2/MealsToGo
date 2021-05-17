import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Spacer from '../utils/Spacer';
import CompactRestaurantInfo from '../CompactRestaurantInfo/CompactRestaurantInfo';
import Text from '../utils/Text';
import { Card } from 'react-native-paper';

const FavoritesWrapper = styled(Card)`
  padding: 10px;
  z-index: 999;
  border-radius: 15px;
`;
export default function FavoritesBar({ onNavigate }) {
  const { favorites } = useSelector((state) => state.favorites);

  if (!favorites.length) {
    return null;
  }
  return (
    <FavoritesWrapper elevation={3}>
      <Spacer variant='left.large'>
        <Text variant='caption'>Favorites</Text>
      </Spacer>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favorites.map((restaurant) => {
          return (
            <Spacer key={restaurant.placeId} position='left' size='medium'>
              <TouchableOpacity
                onPress={() =>
                  onNavigate('RestaurantDetails', {
                    restaurant,
                  })
                }
              >
                <CompactRestaurantInfo restaurant={restaurant} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavoritesWrapper>
  );
}
