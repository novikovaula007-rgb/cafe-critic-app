import { createSlice } from '@reduxjs/toolkit';
import type { GlobalError, User } from '../../types';
import { login, register } from './usersThunks';

interface UsersState {
  user: User | null;
  loginLoading: boolean;
  registerLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  loginLoading: false,
  registerLoading: false,
  loginError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginError = null;
        state.loginLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loginLoading = false;
        state.user = payload.user;
      })
      .addCase(login.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      })
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.registerLoading = false;
        state.user = payload;
      })
      .addCase(register.rejected, (state) => {
        state.registerLoading = false;
      });
  },
});

export const { unsetUser } = usersSlice.actions;

export const selectUser = (state: { users: UsersState }) => state.users.user;
export const selectLoginError = (state: { users: UsersState }) => state.users.loginError;

export default usersSlice.reducer;