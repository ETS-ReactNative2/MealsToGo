import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Parse from 'parse/react-native';

const initialState = { restaurants: [] };

export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async (location) => {
    const restaurants = await Parse.Cloud.run('getNearbyRestaurants', {
      location,
    });
    if (!restaurants) {
      throw new Error('not found');
    }
    return restaurants;
  }
);

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRestaurants.pending]: (state, action) => {
      state.loading = true;
      state.restaurants = [];
    },
    [fetchRestaurants.fulfilled]: (state, action) => {
      state.loading = false;
      state.restaurants = action.payload;
    },
    [fetchRestaurants.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default restaurantsSlice.reducer;
