
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import pinReducer from './slices/pinSlice';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    pins: pinReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
