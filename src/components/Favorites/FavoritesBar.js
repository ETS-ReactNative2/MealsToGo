import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Spacer from '../utils/Spacer';
import CompactRestaurantInfo from '../CompactRestaurantInfo/CompactRestaurantInfo';
import Text from '../utils/Text';

const FavoritesWrapper = styled.View`
  padding: 10px;
`;
export default function FavoritesBar({ onNavigate }) {
  const { favorites } = useSelector((state) => state.favorites);

  if (!favorites.length) {
    return null;
  }
  return (
    <FavoritesWrapper>
      <Spacer variant='left.large'>
        <Text variant='caption'>Favorites</Text>
      </Spacer>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favorites.map((restaurant) => {
          const key = restaurant.name;
          return (
            <Spacer key={key} position='left' size='medium'>
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
