import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
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

// {ignoredActions: [
//   'login',
//   'user/login/fulfilled',
//   'user/login',
//   'login.fulfilled',
// ],}

export default store;
