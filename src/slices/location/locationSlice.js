import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { locations } from '../../mock/location';
import camelize from 'camelize';

const initialState = { keyword: 'San Francisco' };

export const fetchLocation = createAsyncThunk(
  'location/fetchLocation',
  async (keyword) => {
    if (keyword) {
      const locationMock = locations[keyword.toLowerCase()];
      if (!locationMock) {
        throw new Error('not found');
      }
      return locationTransform(locationMock);
    }
  }
);

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLocation.pending]: (state, action) => {
      state.loading = true;
      state.keyword = action.payload;
    },
    [fetchLocation.fulfilled]: (state, action) => {
      state.loading = false;
      state.location = action.payload;
      state.keyword = state.keyword;
    },
    [fetchLocation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default locationSlice.reducer;
