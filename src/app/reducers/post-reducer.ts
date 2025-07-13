import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    test: (state) => {
      return state;
    },
  },
});

export const { test } = postSlice.actions;
export const postReducer = postSlice.reducer;
