import * as favoriteConst from '../constants/favoriteConstants';

export const favoriteReducer = (state = { favorites: [] }, action) => {
  switch (action.type) {
    case favoriteConst.FAVORITE_INIT:
      return {
        favorites: action.payload,
      };
    case favoriteConst.FAVORITE_ADD:
      return {
        favorites: [...state.favorites, action.payload],
      };
    case favoriteConst.FAVORITE_REMOVE:
      return {
        favorites: state.favorites.filter(
          (x) => x.placeId !== action.payload.placeId
        ),
      };
    default:
      return state;
  }
};
