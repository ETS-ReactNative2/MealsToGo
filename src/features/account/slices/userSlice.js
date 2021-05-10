import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export const logout = createAsyncThunk('user/logout', async () => {
  return firebase.auth().signOut();
});

export const savePhoto = createAsyncThunk(
  'user/savePhoto',
  async (photo, { getState }) => {
    const { user } = getState();
    await AsyncStorage.setItem(`${user.info.uid}-photo`, photo.uri);
    return photo.uri;
  }
);

export const loadPhoto = createAsyncThunk(
  'user/savePhoto',
  async (_, { getState }) => {
    const { user } = getState();
    const photoUri = await AsyncStorage.getItem(`${user.info.uid}-photo`);
    return photoUri;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    isLoggedIn(state, action) {
      state.info = action.payload;
      state.isAuthenticated = true;
    },
  },
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
    [logout.fulfilled]: (state, action) => {
      state.info = null;
      state.photo = null;
      state.isAuthenticated = false;
    },
    [savePhoto.fulfilled]: (state, action) => {
      state.photo = action.payload;
    },
    [loadPhoto.fulfilled]: (state, action) => {
      state.photo = action.payload;
    },
  },
});

export const { isLoggedIn } = userSlice.actions;

export default userSlice.reducer;
