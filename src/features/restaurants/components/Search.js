import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLocation } from '../../../slices/location/locationSlice';
import { Searchbar } from 'react-native-paper';
import { SearchContainer } from './SearchStyles';

export default function Search({ isFavouritesToggled, onFavouritesToggle }) {
  const dispatch = useDispatch();
  const { keyword } = useSelector((state) => state.location);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        placeholder='Search for a location'
        icon={isFavouritesToggled ? 'heart' : 'heart-outline'}
        onIconPress={onFavouritesToggle}
        value={searchKeyword}
        onSubmitEditing={() => dispatch(fetchLocation(searchKeyword))}
        onChangeText={(text) => setSearchKeyword(text)}
      />
    </SearchContainer>
  );
}
