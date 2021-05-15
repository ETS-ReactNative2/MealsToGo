import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import createStripe from 'stripe-client';

const stripe = createStripe(
  'pk_test_51HzDwlIfEuMDL6nvAXXM3pbywxTyQjerlEGqAyg8sUESBJKtAy6j86uMoCvYLInPpahyRSC3S8G65md8jbkGYPNE002bZm2QZf'
);

const initialState = { token: {} };

export const fetchCardToken = createAsyncThunk(
  'checkout/fetchCardToken',
  async (card) => {
    const token = await stripe.createToken({ card });
    return token;
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCardToken.pending]: (state, action) => {
      state.loading = true;
      state.token = {};
    },
    [fetchCardToken.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = action.payload;
    },
    [fetchCardToken.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default checkoutSlice.reducer;
