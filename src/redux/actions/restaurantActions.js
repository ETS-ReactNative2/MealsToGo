import * as restaurantConst from '../constants/restaurantConstants';
import { mocks, mockImages } from '../../mock/restaurants';
import camelize from 'camelize';

export const getRestaurantsList = (
  location = '37.7749295,-122.4194155'
) => async (dispatch) => {
  try {
    dispatch({ type: restaurantConst.RESTAURANTS_LIST_REQUEST });
    const mock = mocks[location];
    if (!mock) {
      throw new Error('not found');
    }
    const data = restaurantsTransform(mock);
    // dispatch({
    //   type: restaurantConst.RESTAURANTS_LIST_SUCCESS,
    //   payload: data,
    // });
    setTimeout(() => {
      dispatch({
        type: restaurantConst.RESTAURANTS_LIST_SUCCESS,
        payload: data,
      });
    }, 2000);
  } catch (err) {
    dispatch({
      type: restaurantConst.RESTAURANTS_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    restaurant.photos = restaurant.photos.map((p) => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    });
    return {
      ...restaurant,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
    };
  });

  return camelize(mappedResults);
};
