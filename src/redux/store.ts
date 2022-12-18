import { configureStore } from '@reduxjs/toolkit';
import fetchSlice from './slice/fetchSlice';

export const store = configureStore({
  reducer: {
    fetchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
