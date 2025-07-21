import { getUsers } from "@/app/async-thunk/get-users";
import type { ErrorResponse, StatusResponse } from "@/shared/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type InitialUsersState = {
  data:
    | {
        readonly id: number;
        role_id: number | null;
        registed_at: string | null;
        login: string | null;
      }[]
    | [];
  status: StatusResponse;
  error: ErrorResponse;
};

interface IdAndRolePayload {
  id: number;
  role_id: number;
}

const initialState: InitialUsersState = {
  data: [],
  status: "idle",
  error: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateRoleUsers: (state, action: PayloadAction<IdAndRolePayload>) => {
      const user = state.data.find((user) => user.id === action.payload.id);
      if (user) {
        user.role_id = action.payload.role_id;
      }
    },
    removeUser: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
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

export const { updateRoleUsers, removeUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
