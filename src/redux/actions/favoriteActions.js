import * as favoriteConst from '../constants/favoriteConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initFavoriteRestaurant = () => async (dispatch) => {
  try {
    const storageFavorites = await AsyncStorage.getItem('@favorites');
    dispatch({
      type: favoriteConst.FAVORITE_INIT,
      payload: storageFavorites ? JSON.parse(storageFavorites) : [],
    });
  } catch (err) {
    console.log(err);
  }
};

export const addFavoriteRestaurant = (resaurant) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: favoriteConst.FAVORITE_ADD,
      payload: resaurant,
    });
    const jsonValue = JSON.stringify(getState().favorite.favorites);
    await AsyncStorage.setItem('@favorites', jsonValue);
  } catch (err) {
    console.log(err);
  }
};

export const removeFavoriteRestaurant = (resaurant) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: favoriteConst.FAVORITE_REMOVE,
      payload: resaurant,
    });
    const jsonValue = JSON.stringify(getState().favorite.favorites);
    await AsyncStorage.setItem('@favorites', jsonValue);
  } catch (err) {
    console.log(err);
  }
};
