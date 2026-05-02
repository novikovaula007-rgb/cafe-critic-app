import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import type {
  AuthResponse,
  GlobalError,
  LoginMutation,
  RegisterMutation,
  User,
  ValidationError,
} from '../../types';
import axiosAPI from '../../axiosAPI.ts';
import { isAxiosError } from 'axios';

export const login = createAsyncThunk<
  AuthResponse,
  LoginMutation,
  { rejectValue: GlobalError}
>('users/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosAPI.post<AuthResponse>(
      '/users/sessions',
      userData,
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }

    throw error;
  }
});

export const register = createAsyncThunk<
  User,
  RegisterMutation,
  { rejectValue: ValidationError }
>('users/register', async (registerMutation, { rejectWithValue }) => {
  try {
    const response = await axiosAPI.post<{ user: User; message: string }>(
      '/users',
      registerMutation,
    );
    toast.success(response.data.message);
    return response.data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
