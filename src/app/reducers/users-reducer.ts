import { getUsers } from "@/app/async-thunk/get-users";
import { createSlice } from "@reduxjs/toolkit";

type InitialUsersState = {
  data:
    | {
        readonly id: number;
        role_id: number | null;
        registed_at: string | null;
        login: string | null;
      }[]
    | [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
};

const initialState: InitialUsersState = {
  data: [],
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    test: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { test } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
