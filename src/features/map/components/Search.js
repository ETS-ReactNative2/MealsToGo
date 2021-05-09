import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLocation } from '../../../slices/location/locationSlice';

import styled from 'styled-components/native';
import { Searchbar } from 'react-native-paper';

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  z-index: 999;
  top: 40px;
  width: 100%;
`;

export default function Search() {
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
        icon='map'
        value={searchKeyword}
        onSubmitEditing={() => dispatch(fetchLocation(searchKeyword))}
        onChangeText={(text) => setSearchKeyword(text)}
      />
    </SearchContainer>
  );
}
