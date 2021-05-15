import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [], restaurant: {}, sum: 0 };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      if (
        state.restaurant &&
        state.restaurant.placeId === action.payload.restaurant.placeId
      ) {
        state.items.push(action.payload.item);
        state.sum = state.sum + action.payload.item.price;
      } else {
        state.restaurant = action.payload.restaurant;
        state.items = [action.payload.item];
        state.sum = action.payload.item.price;
      }
    },
    clearCart(state, action) {
      state.items = [];
      state.restaurant = {};
      state.sum = 0;
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
