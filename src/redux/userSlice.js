import { createSlice } from '@reduxjs/toolkit';
import storage from '~/helpers/localStorage';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    saveNewRefreshToken: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.user = {
        ...state.user,
        accessToken: action.payload,
      };
    },
    loginStart: (state) => {
      state.user = null;
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    loginFail: (state) => {
      state.user = null;
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.user = null;
      state.isFetching = false;
      state.error = false;
      storage.clearStorage();
    },
  },
});

export const { loginStart, loginSuccess, loginFail, saveNewRefreshToken, logout } = userSlice.actions;
export default userSlice.reducer;
