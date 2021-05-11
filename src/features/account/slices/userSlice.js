import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';

const initialState = { info: {}, isAuthenticated: false };

export const isLoggedIn = createAsyncThunk('user/isLoggedIn', async () => {
  const user = await Parse.User.currentAsync();
  return { username: user.get('username'), email: user.get('email') };
});

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const user = await Parse.User.logIn(email, password);
    return { username: user.get('username'), email: user.get('email') };
  }
);

export const register = createAsyncThunk(
  'user/register',
  async ({ email, password, repeatedPassword }) => {
    if (password !== repeatedPassword) {
      throw Error('Error: Passwords do not match');
    }
    const user = await Parse.User.signUp(email, password, { email: email });
    return { username: user.get('username'), email: user.get('email') };
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  return await Parse.User.logOut();
});

export const savePhoto = createAsyncThunk(
  'user/savePhoto',
  async (photo, { getState }) => {
    const { user } = getState();
    await AsyncStorage.setItem(`${user.info.username}-photo`, photo.uri);
    return photo.uri;
  }
);

export const loadPhoto = createAsyncThunk(
  'user/loadPhoto',
  async (_, { getState }) => {
    const { user } = getState();
    const photoUri = await AsyncStorage.getItem(`${user.info.objectId}-photo`);
    return photoUri;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [isLoggedIn.fulfilled]: (state, action) => {
      if (action.payload) {
        state.info = action.payload;
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
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

export default userSlice.reducer;
