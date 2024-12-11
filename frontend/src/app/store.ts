import { configureStore } from "@reduxjs/toolkit";
import { entriesReducer } from "../slices/EntriesSlice.ts";

export const store = configureStore({
  reducer: {
    entries: entriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
