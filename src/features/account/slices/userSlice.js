import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as firebase from 'firebase';

const initialState = { user: {}, isAuthenticated: false };

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
      state.isAuthenticated = state.isAuthenticated;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isAuthenticated = false;
    },
  },
});

export default userSlice.reducer;
