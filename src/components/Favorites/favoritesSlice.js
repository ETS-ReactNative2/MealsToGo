import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = { favorites: [] };

export const initFavorites = createAsyncThunk(
  'favorites/initFavorites',
  async () => {
    const storageFavorites = await AsyncStorage.getItem('@favorites');
    return storageFavorites ? JSON.parse(storageFavorites) : [];
  }
);

export const addFavorite = createAsyncThunk(
  'favorites/addFavortie',
  async (resaurant, { getState }) => {
    const jsonValue = JSON.stringify(getState().favorites.favorites);
    await AsyncStorage.setItem('@favorites', jsonValue);
    return resaurant;
  }
);

export const removeFavorite = createAsyncThunk(
  'favorites/removeFavorite',
  async (resaurant, { getState }) => {
    const jsonValue = JSON.stringify(getState().favorites.favorites);
    await AsyncStorage.setItem('@favorites', jsonValue);
    return resaurant;
  }
);

const favoritesSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: {
    [initialState.fulfilled]: (state, action) => {
      state.favorites = action.payload;
    },
    [addFavorite.fulfilled]: (state, action) => {
      state.favorites.push(action.payload);
    },
    [removeFavorite.fulfilled]: (state, action) => {
      state.favorites = state.favorites.filter(
        (x) => x.placeId !== action.payload.placeId
      );
    },
  },
});

export default favoritesSlice.reducer;
