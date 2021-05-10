import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as firebase from 'firebase';

const initialState = { info: {}, isAuthenticated: false };

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return user;
  }
);

export const register = createAsyncThunk(
  'user/register',
  async ({ email, password, repeatedPassword }) => {
    if (password !== repeatedPassword) {
      throw Error('Error: Passwords do not match');
    }
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return user;
  }
);

export const isLoggedIn = createAsyncThunk('user/isLoggedIn', async () => {
  firebase.auth().onAuthStateChanged((usr) => {
    if (usr) {
      return usr.user;
    } else {
      return;
    }
  });
});

export const logout = createAsyncThunk('user/logout', async () => {
  return firebase.auth().signOut();
});

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
      state.info = action.payload;
      state.isAuthenticated = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isAuthenticated = false;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
      state.isAuthenticated = state.isAuthenticated;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.info = action.payload;
      state.isAuthenticated = true;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isAuthenticated = false;
    },
    [isLoggedIn.fulfilled]: (state, action) => {
      state.info = action.payload;
      state.isAuthenticated = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.info = null;
      state.isAuthenticated = false;
    },
  },
});

export default userSlice.reducer;
