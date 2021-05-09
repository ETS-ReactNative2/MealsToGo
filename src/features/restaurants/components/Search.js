import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLocation } from '../../../slices/location/locationSlice';
import styled from 'styled-components/native';
import { Searchbar } from 'react-native-paper';

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export default function Search({ isFavouritesToggled, onFavouritesToggle }) {
  const dispatch = useDispatch();
  const { keyword } = useSelector((state) => state.location);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    dispatch(fetchLocation('San Francisco'));
  }, [dispatch]);

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
