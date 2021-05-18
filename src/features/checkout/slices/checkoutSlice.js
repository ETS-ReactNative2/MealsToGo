import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import createStripe from 'stripe-client';
import Parse from 'parse/react-native';

const stripe = createStripe(
  'pk_test_51Ir3xdCLzGos844gmUeT6yeHtwdp3xpOetekhhiQcAIIV3z8UgEyH1An8ENRHCP2d4MdFuz7VuOYfvjzqt7rUTiJ00XIjjkrY5'
);

const initialState = { token: {}, succuss: false };

export const fetchCardToken = createAsyncThunk(
  'checkout/fetchCardToken',
  async (card) => {
    const token = await stripe.createToken({ card });
    return token;
  }
);

export const makePay = createAsyncThunk(
  'checkout/makePay',
  async (amount, { getState }) => {
    const { checkout } = getState();
    const data = await Parse.Cloud.run('makePay', {
      amount,
      tokenId: checkout.token.id,
    });
    return data;
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    clearSuccess(state, action) {
      state.succuss = false;
    },
  },
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
    [makePay.pending]: (state, action) => {
      state.loading = true;
    },
    [makePay.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = initialState.token;
      state.succuss = true;
    },
    [makePay.rejected]: (state, action) => {
      state.loading = false;
      state.token = initialState.token;
      state.error = action.error.message;
    },
  },
});

export const { clearSuccess } = checkoutSlice.actions;

export default checkoutSlice.reducer;
