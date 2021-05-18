import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../slices/restaurantsSlice';
import { Colors } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import SafeArea from '../../../components/utils/SafeArea';
import Search from '../components/Search';
import RestaurantInfoCard from '../components/RestaurantInfoCard';
import Spacer from '../../../components/utils/Spacer';
import FavoritesBar from '../../../components/Favorites/FavoritesBar';
import FadeInView from '../../../components/animations/FadeInView';
import {
  Loading,
  LoadingContainer,
  RestaurantList,
  ErrorIconContainer,
  ErorIcon,
} from '../components/RestaurantsStyles';
import { colors } from '../../../infrastructure/theme/colors';
import Text from '../../../components/utils/Text';

export default function RestaurantsScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isToggled, setIsToggled] = useState(false);
  const { restaurants, loading, error } = useSelector(
    (state) => state.restaurants
  );
  console.log(error);
  const { geometry } = useSelector((state) => state.location);
  useEffect(() => {
    if (geometry) {
      dispatch(fetchRestaurants(geometry));
    }
  }, [dispatch, geometry]);

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
      {error ? (
        <ErrorIconContainer>
          <ErorIcon icon='close' bg={colors.ui.error} />
          <Text variant='body'>
            Unable to load restaurants, please try again
          </Text>
        </ErrorIconContainer>
      ) : (
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
                <FadeInView>
                  <RestaurantInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.placeId}
        />
      )}
    </SafeArea>
  );
}
