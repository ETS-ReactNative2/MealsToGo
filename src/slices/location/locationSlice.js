import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Parse from 'parse/react-native';

const initialState = { keyword: 'San Francisco' };

export const fetchLocation = createAsyncThunk(
  'location/fetchLocation',
  async (keyword) => {
    if (keyword) {
      const location = await Parse.Cloud.run('getLocation', {
        location: keyword,
      });
      if (!location) {
        throw new Error('not found');
      }
      return location;
    }
  }
);

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
      state.geometry = action.payload;
      state.keyword = state.keyword;
    },
    [fetchLocation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default locationSlice.reducer;
