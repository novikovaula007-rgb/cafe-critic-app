import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPlaces,
  createPlace,
  deletePlace,
  fetchOnePlace,
} from './placesThunks';
import type { RootState } from '../../app/store';
import type { GlobalError, Place, ValidationError } from '../../types';

interface PlacesState {
  items: Place[];
  onePlace: Place | null;
  fetchLoading: boolean;
  createLoading: boolean;
  fetchOneLoading: boolean;
  deleteLoading: string | false;
  error: GlobalError | null;
  createError: ValidationError | null;
}

const initialState: PlacesState = {
  items: [],
  onePlace: null,
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
  fetchOneLoading: false,
  error: null,
  createError: null,
};

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchPlaces.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchPlaces.rejected, (state, { payload }) => {
        state.fetchLoading = false;
        state.error = payload || null;
      });

    builder
      .addCase(createPlace.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createPlace.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createPlace.rejected, (state, { payload }) => {
        state.createLoading = false;
        state.createError = payload || null;
      });

    builder
      .addCase(deletePlace.pending, (state, { meta }) => {
        state.deleteLoading = meta.arg;
      })
      .addCase(deletePlace.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deletePlace.rejected, (state) => {
        state.deleteLoading = false;
      });

    builder
      .addCase(fetchOnePlace.pending, (state) => {
        state.fetchOneLoading = true;
        state.onePlace = null;
      })
      .addCase(fetchOnePlace.fulfilled, (state, { payload }) => {
        state.fetchOneLoading = false;
        state.onePlace = payload;
      })
      .addCase(fetchOnePlace.rejected, (state) => {
        state.fetchOneLoading = false;
      });
  },
});

export const selectPlaces = (state: RootState): Place[] => state.places.items;
export const selectPlacesFetchLoading = (state: RootState) =>
  state.places.fetchLoading;
export const selectPlacesCreateLoading = (state: RootState) =>
  state.places.createLoading;
export const selectPlacesDeleteLoading = (state: RootState) =>
  state.places.deleteLoading;
export const selectPlacesError = (state: RootState) => state.places.error;
export const selectPlacesCreateError = (state: RootState) =>
  state.places.createError;
export const selectOnePlace = (state: RootState): Place | null =>
  state.places.onePlace;
export const selectPlaceFetchLoading = (state: RootState): boolean =>
  state.places.fetchOneLoading;

export const placesReducer = placesSlice.reducer;
