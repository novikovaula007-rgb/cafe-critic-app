import { createSlice } from '@reduxjs/toolkit';
import { fetchReviews, createReview, deleteReview } from './reviewsThunks';
import type { RootState } from '../../app/store';
import type { GlobalError, Review, ValidationError } from '../../types';

interface ReviewsState {
  items: Review[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: string | false;
  fetchError: GlobalError | null;
  createError: ValidationError | null;
}

const initialState: ReviewsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
  fetchError: null,
  createError: null,
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchReviews.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchReviews.rejected, (state, { payload }) => {
        state.fetchLoading = false;
        state.fetchError = payload || null;
      });

    builder
      .addCase(createReview.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createReview.fulfilled, (state, { payload }) => {
        state.createLoading = false;
        state.items.unshift(payload);
      })
      .addCase(createReview.rejected, (state, { payload }) => {
        state.createLoading = false;
        state.createError = payload || null;
      });

    builder
      .addCase(deleteReview.pending, (state, { meta }) => {
        state.deleteLoading = meta.arg;
      })
      .addCase(deleteReview.fulfilled, (state, { meta }) => {
        state.deleteLoading = false;
        state.items = state.items.filter((review) => review._id !== meta.arg);
      })
      .addCase(deleteReview.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const selectReviews = (state: RootState) => state.reviews.items;
export const selectReviewsFetchLoading = (state: RootState) =>
  state.reviews.fetchLoading;
export const selectReviewsCreateLoading = (state: RootState) =>
  state.reviews.createLoading;
export const selectReviewsDeleteLoading = (state: RootState) =>
  state.reviews.deleteLoading;
export const selectReviewsCreateError = (state: RootState) =>
  state.reviews.createError;

export const reviewsReducer = reviewsSlice.reducer;
