import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = { items: [], restaurant: {}, sum: 0 };

export const loadCart = createAsyncThunk(
  'cart/loadCart',
  async (_, { getState }) => {
    const { user } = getState();
    const storageCart = await AsyncStorage.getItem(
      `@cart-${user.info.username}`
    );
    return storageCart ? JSON.parse(storageCart) : initialState;
  }
);

export const saveCart = createAsyncThunk(
  'cart/saveCart',
  async (_, { getState }) => {
    const { cart, user } = getState();
    const jsonValue = JSON.stringify(cart);
    await AsyncStorage.setItem(`@cart-${user.info.username}`, jsonValue);
    return;
  }
);

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
  extraReducers: {
    [loadCart.fulfilled]: (state, action) => {
      state.items = action.payload.items;
      state.restaurant = action.payload.restaurant;
      state.sum = action.payload.sum;
    },
    [saveCart.fulfilled]: (state, action) => {
      state.items = initialState.items;
      state.restaurant = initialState.restaurant;
      state.sum = initialState.sum;
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
