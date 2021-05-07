import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsList } from '../../../redux/actions/restaurantActions';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { getStylesForProperty } from 'css-to-react-native';
import SafeArea from '../../../components/utils/SafeArea';
import RestaurantInfoCard from '../components/RestaurantInfoCard';
import Spacer from '../../../components/Spacer';

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantList = styled(FlatList).attrs((props) => ({
  contentContainerStyle: getStylesForProperty('padding', props.theme.space[3]),
}))``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export default function RestaurantsScreen() {
  const dispatch = useDispatch();
  const { restaurants, loading, error } = useSelector(
    (state) => state.restaurantsList
  );
  useEffect(() => {
    dispatch(getRestaurantsList());
  }, [dispatch]);

  return (
    <SafeArea>
      {loading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <SearchContainer>
        <Searchbar />
      </SearchContainer>
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => (
          <Spacer position='bottom' size='large'>
            <RestaurantInfoCard restaurant={item} />
          </Spacer>
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
}
