import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Parse from 'parse/react-native';

const initialState = {
  keyword: 'San Francisco',
  geometry: {
    lng: -122.463,
    lat: 37.7648,
    viewport: {
      southwest: { lng: -122.517689744302, lat: 37.6044791770151 },
      northeast: { lng: -122.354986187987, lat: 37.8324289465257 },
    },
  },
  loading: null,
  error: null,
};

export const fetchLocation = createAsyncThunk(
  'location/fetchLocation',
  async (keyword) => {
    if (keyword) {
      const location = await Parse.Cloud.run('getLocation', {
        location: keyword,
      });
      return { location, keyword };
    }
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    clearLocation(state, action) {
      state.keyword = initialState.keyword;
      state.geometry = initialState.geometry;
      state.error = initialState.error;
      state.loading = initialState.loading;
    },
  },
  extraReducers: {
    [fetchLocation.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchLocation.fulfilled]: (state, action) => {
      state.loading = false;
      state.geometry = action.payload.location;
      state.keyword = action.payload.keyword;
    },
    [fetchLocation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { clearLocation } = locationSlice.actions;

export default locationSlice.reducer;
