import { createSlice } from "@reduxjs/toolkit";
import { IEntry } from "../types";
import { RootState } from "../app/store.ts";
import { createEntry, fetchAllEntries } from "../thunks/EntriesThunk.ts";

interface EntriesState {
  entries: IEntry[];
  isFetchLoading: boolean;
  isAddLoading: boolean;
}

const initialState: EntriesState = {
  entries: [],
  isFetchLoading: false,
  isAddLoading: false,
};

export const selectFetchLoading = (state: RootState) =>
  state.entries.isFetchLoading;
export const selectAddLoading = (state: RootState) =>
  state.entries.isAddLoading;
export const selectEntries = (state: RootState) => state.entries.entries;

export const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllEntries.pending, (state) => {
      state.isFetchLoading = true;
    });
    builder.addCase(
      fetchAllEntries.fulfilled,
      (state, { payload: messages }) => {
        state.isFetchLoading = false;
        state.entries = messages;
      },
    );
    builder.addCase(fetchAllEntries.rejected, (state) => {
      state.isFetchLoading = false;
    });

    builder.addCase(createEntry.pending, (state) => {
      state.isAddLoading = true;
    });

    builder.addCase(createEntry.fulfilled, (state) => {
      state.isAddLoading = false;
    });

    builder.addCase(createEntry.rejected, (state) => {
      state.isAddLoading = false;
    });
  },
});
export const entriesReducer = entriesSlice.reducer;
