import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mocks, mockImages } from './mock';
import camelize from 'camelize';

const initialState = { restaurants: [] };

export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async (location) => {
    const locationString = `${location.lat},${location.lng}`;
    const mock = mocks[locationString];
    if (!mock) {
      throw new Error('not found');
    }
    return restaurantsTransform(mock);
  }
);

const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    restaurant.photos = restaurant.photos.map((p) => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    });
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
    };
  });

  return camelize(mappedResults);
};

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
