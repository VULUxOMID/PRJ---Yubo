import { configureStore } from '@reduxjs/toolkit';
import demoReducer from './slices/demoSlice';

export const store = configureStore({
  reducer: {
    demo: demoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 