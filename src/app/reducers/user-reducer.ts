import { server } from "@/bff";
import { ROLE_ID } from "@/shared/constants";
import type { UserType } from "@/shared/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type InitialUserState = {
  id: number | null;
  session: string | null;
  role_id: number | null;
  login: string | null;
  wasLogout: boolean;
  registed_at: string | null;
};

const initialUserState: InitialUserState = {
  id: null,
  session: null,
  login: null,
  role_id: ROLE_ID.GUEST,
  wasLogout: false,
  registed_at: "",
};

const localUser = localStorage.getItem("user");

const initialState: InitialUserState =
  (localUser && JSON.parse(localUser)) ?? initialUserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateRoleUser: (state, action: PayloadAction<number>) => {
      state.role_id = action.payload;
    },
    logOut: (_, action: PayloadAction<string>) => {
      server.logout(action.payload);
      return { ...initialUserState, wasLogout: false };
    },
  },
});

export const { setUser, logOut, updateRoleUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
