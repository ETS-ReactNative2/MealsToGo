import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = { favorites: [] };

export const loadFavorites = createAsyncThunk(
  'favorites/loadFavorites',
  async (_, { getState }) => {
    const { user } = getState();
    const storageFavorites = await AsyncStorage.getItem(
      `@favorites-${user.info.username}`
    );
    return storageFavorites ? JSON.parse(storageFavorites) : [];
  }
);

export const saveFavorites = createAsyncThunk(
  'favorites/saveFavorites',
  async (_, { getState }) => {
    const { favorites, user } = getState();
    const jsonValue = JSON.stringify(favorites.favorites);
    await AsyncStorage.setItem(`@favorites-${user.info.username}`, jsonValue);
    return;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action) {
      state.favorites.push(action.payload);
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter(
        (x) => x.placeId !== action.payload.placeId
      );
    },
    clearFavorites(state, action) {
      state.favorites = initialState.favorites;
    },
  },
  extraReducers: {
    [loadFavorites.fulfilled]: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
