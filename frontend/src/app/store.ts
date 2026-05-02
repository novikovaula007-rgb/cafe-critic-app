import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { usersSlice } from '../features/users/usersSlice';
import { placesReducer } from '../features/places/placesSlice.ts';
import { galleryReducer } from '../features/gallery/gallerySlice.ts';
import { reviewsReducer } from '../features/reviews/reviewsSlice.ts';

const usersReducer = usersSlice.reducer;

const userPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  places: placesReducer,
  gallery: galleryReducer,
  reviews: reviewsReducer,
  users: persistReducer(userPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
