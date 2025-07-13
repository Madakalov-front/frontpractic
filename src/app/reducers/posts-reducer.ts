import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    test: (state) => {
      return state;
    },
  },
});

export const { test } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
