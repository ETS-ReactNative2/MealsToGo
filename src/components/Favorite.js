import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import {
  addFavoriteRestaurant,
  removeFavoriteRestaurant,
} from '../redux/actions/favoriteActions';

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

export default function Favourite({ restaurant }) {
  const { favorites } = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  const isFavourite = favorites.find((r) => r.placeId === restaurant.placeId);

  return (
    <FavouriteButton
      onPress={() =>
        !isFavourite
          ? dispatch(addFavoriteRestaurant(restaurant))
          : dispatch(removeFavoriteRestaurant(restaurant))
      }
    >
      <AntDesign
        name={isFavourite ? 'heart' : 'hearto'}
        size={24}
        color={isFavourite ? 'red' : 'white'}
      />
    </FavouriteButton>
  );
}
