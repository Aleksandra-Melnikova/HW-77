import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi.ts";
import { IEntry, IInputEntry } from "../types";

export const fetchAllEntries = createAsyncThunk<IEntry[], void>(
  "entries/fetchAllEntries",
  async () => {
    const entriesResponse = await axiosApi.get<IEntry[]>("/entries");
    return entriesResponse.data || [];
  },
);

export const createEntry = createAsyncThunk<void, IInputEntry>(
  "entries/createEntry",
  async (inputEntry) => {
    const formData = new FormData();

    const keys = Object.keys(inputEntry) as (keyof IInputEntry)[];

    keys.forEach((key) => {
      const value = inputEntry[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    return axiosApi.post("/entries", formData);
  },
);
