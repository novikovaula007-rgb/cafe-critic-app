import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI';
import { isAxiosError } from 'axios';
import type { GalleryImage, GlobalError } from '../../types';

export const uploadImages = createAsyncThunk<
  GalleryImage[],
  { placeId: string; images: File[] },
  { rejectValue: GlobalError }
>('gallery/upload', async ({ placeId, images }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    images.forEach((file) => {
      formData.append('images', file);
    });

    const response = await axiosAPI.post<GalleryImage[]>(
      `/gallery/${placeId}`,
      formData,
    );
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const deleteImage = createAsyncThunk<
  void,
  string,
  { rejectValue: GlobalError }
>('gallery/delete', async (imageId, { rejectWithValue }) => {
  try {
    await axiosAPI.delete(`/gallery/${imageId}`);
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});
