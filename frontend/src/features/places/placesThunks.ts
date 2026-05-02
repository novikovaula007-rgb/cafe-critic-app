import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI';
import { isAxiosError } from 'axios';
import type {
  GlobalError,
  Place,
  PlaceMutation,
  ValidationError,
} from '../../types';

export const fetchPlaces = createAsyncThunk<
  Place[],
  void,
  { rejectValue: GlobalError }
>('places/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosAPI.get<Place[]>('/places');
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const createPlace = createAsyncThunk<
  void,
  PlaceMutation,
  { rejectValue: ValidationError }
>('places/create', async (placeMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append('title', placeMutation.title);
    formData.append('description', placeMutation.description);
    formData.append('agreement', String(placeMutation.agreement || false));

    if (placeMutation.mainPhoto) {
      formData.append('mainPhoto', placeMutation.mainPhoto);
    }

    await axiosAPI.post('/places', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const deletePlace = createAsyncThunk<
  void,
  string,
  { rejectValue: GlobalError }
>('places/delete', async (placeId, { rejectWithValue }) => {
  try {
    await axiosAPI.delete(`/places/${placeId}`);
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const fetchOnePlace = createAsyncThunk<
  Place,
  string,
  { rejectValue: GlobalError }
>('places/fetchOne', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosAPI.get<Place>(`/places/${id}`);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});
