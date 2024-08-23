import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import mapSlice from "../slices/mapSlice";
import { setupInterceptors } from "../utils/api";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    map: mapSlice,
  },
});

setupInterceptors(store); // Call this after the store is created

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
