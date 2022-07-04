import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user';
import loginService from '../services/login';

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
    userService.setUser(user);
    dispatch(storeUser(user));
  };
};

export const logout = () => {
  return async dispatch => {
    userService.clearUser();
    dispatch(removeUser());
  };
};

export default userSlice.reducer;