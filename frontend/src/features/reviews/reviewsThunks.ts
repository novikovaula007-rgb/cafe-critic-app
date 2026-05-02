import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI';
import { isAxiosError } from 'axios';
import type {
  GlobalError,
  Review,
  ReviewMutation,
  ValidationError,
} from '../../types';

export const fetchReviews = createAsyncThunk<
  Review[],
  string,
  { rejectValue: GlobalError }
>('reviews/fetchAll', async (placeId, { rejectWithValue }) => {
  try {
    const response = await axiosAPI.get<Review[]>(
      `/reviews?placeId=${placeId}`,
    );
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const createReview = createAsyncThunk<
  Review,
  ReviewMutation,
  { rejectValue: ValidationError }
>('reviews/create', async (reviewMutation, { rejectWithValue }) => {
  try {
    const response = await axiosAPI.post<Review>('/reviews', reviewMutation);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const deleteReview = createAsyncThunk<
  void,
  string,
  { rejectValue: GlobalError }
>('reviews/delete', async (reviewId, { rejectWithValue }) => {
  try {
    await axiosAPI.delete(`/reviews/${reviewId}`);
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});
