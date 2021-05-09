import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../slices/restaurantsSlice';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { getStylesForProperty } from 'css-to-react-native';
import SafeArea from '../../../components/utils/SafeArea';
import Search from '../components/Search';
import RestaurantInfoCard from '../components/RestaurantInfoCard';
import Spacer from '../../../components/utils/Spacer';
import FavoritesBar from '../../../components/Favorites/FavoritesBar';

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

export default function RestaurantsScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isToggled, setIsToggled] = useState(false);
  const { restaurants, loading, error } = useSelector(
    (state) => state.restaurants
  );
  const { location } = useSelector((state) => state.location);
  useEffect(() => {
    if (location) {
      dispatch(fetchRestaurants(location));
    }
  }, [dispatch, location]);

  return (
    <SafeArea>
      {loading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && <FavoritesBar onNavigate={navigation.navigate} />}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => (
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
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
}
