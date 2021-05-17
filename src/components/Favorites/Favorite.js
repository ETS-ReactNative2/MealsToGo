import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { addFavorite, removeFavorite } from './favoritesSlice';
import { FavouriteButton } from './favoritesStyles';

export default function Favorite({ restaurant }) {
  const { favorites } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const isFavourite = favorites.find((r) => r.placeId === restaurant.placeId);

  return (
    <FavouriteButton
      onPress={() =>
        !isFavourite
          ? dispatch(addFavorite(restaurant))
          : dispatch(removeFavorite(restaurant))
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
