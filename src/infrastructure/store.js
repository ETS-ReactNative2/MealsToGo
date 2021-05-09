// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import * as restaurantsReducers from './reducers/restaurantReducers';
// import * as locationReducers from './reducers/locationReducers';
// import * as favoriteReducers from './reducers/favoriteReducers';
// import * as userReducers from './reducers/userReducers';

// import { initFavoriteRestaurant } from './actions/favoriteActions';

// const reducer = combineReducers({
//   restaurantsList: restaurantsReducers.restaurantsListReducer,
//   location: locationReducers.locationReducer,
//   favorite: favoriteReducers.favoriteReducer,
//   userLogin: userReducers.userLoginReducer,
// });

// const initialState = {};
// const middleware = [thunk];
// const store = createStore(
//   reducer,
//   initialState,
//   applyMiddleware(...middleware)
// );

// store.dispatch(initFavoriteRestaurant());

// export default store;

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { initFavorites } from '../components/Favorites/favoritesSlice';

import userReducer from '../features/account/slices/userSlice';
import restaurantsReducer from '../features/restaurants/slices/restaurantsSlice';
import locationReducer from '../slices/location/locationSlice';
import favoritesReducer from '../components/Favorites/favoritesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    restaurants: restaurantsReducer,
    location: locationReducer,
    favorites: favoritesReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

store.dispatch(initFavorites());

export default store;
