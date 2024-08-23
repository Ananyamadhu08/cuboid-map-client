import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import mapSlice from "../slices/mapSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    map: mapSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
