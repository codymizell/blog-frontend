import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user';
import loginService from '../services/login';
import registerService from '../services/register';
import { setNotification } from './notificationReducer';

const initialState = userService.getUser();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUser(state, action) {
      return action.payload;
    },
    removeUser() {
      return null;
    }
  }
});

export const {
  storeUser,
  removeUser
} = userSlice.actions;

export const login = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials);
    if (user.username) {
      userService.setUser(user);
      dispatch(storeUser(user));
    } else {
      dispatch(setNotification(user.response.data.error));
      return new Error(user.response.data.error);
    }
  };
};

export const logout = () => {
  return async dispatch => {
    userService.clearUser();
    dispatch(removeUser());
  };
};

export const register = (credentials) => {
  return async dispatch => {
    const user = await registerService.register(credentials);
    if (user.username) {
      userService.setUser(user);
      dispatch(storeUser(user));
    } else {
      dispatch(setNotification(user.response.data.error));
      return new Error(user.response.data.error);
    }
  };
};

export default userSlice.reducer;