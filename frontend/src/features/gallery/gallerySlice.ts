import { createSlice } from '@reduxjs/toolkit';
import { uploadImages, deleteImage, fetchGallery } from './galleryThunks';
import type { RootState } from '../../app/store';
import type { GalleryImage, GlobalError } from '../../types';

interface GalleryState {
  items: GalleryImage[];
  fetchLoading: boolean;
  uploadLoading: boolean;
  deleteLoading: string | false;
  error: GlobalError | null;
}

const initialState: GalleryState = {
  items: [],
  fetchLoading: false,
  uploadLoading: false,
  deleteLoading: false,
  error: null,
};

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    clearGallery: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.uploadLoading = true;
        state.error = null;
      })
      .addCase(uploadImages.fulfilled, (state, { payload }) => {
        state.uploadLoading = false;
        state.items = [...state.items, ...payload];
      })
      .addCase(uploadImages.rejected, (state, { payload }) => {
        state.uploadLoading = false;
        state.error = payload || null;
      });

    builder
      .addCase(deleteImage.pending, (state, { meta }) => {
        state.deleteLoading = meta.arg;
      })
      .addCase(deleteImage.fulfilled, (state, { meta }) => {
        state.deleteLoading = false;
        state.items = state.items.filter((img) => img._id !== meta.arg);
      })
      .addCase(deleteImage.rejected, (state) => {
        state.deleteLoading = false;
      });

    builder
      .addCase(fetchGallery.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchGallery.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchGallery.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const { clearGallery } = gallerySlice.actions;

export const selectGalleryItems = (state: RootState) => state.gallery.items;
export const selectGalleryUploadLoading = (state: RootState) =>
  state.gallery.uploadLoading;
export const selectGalleryDeleteLoading = (state: RootState) =>
  state.gallery.deleteLoading;

export const galleryReducer = gallerySlice.reducer;
