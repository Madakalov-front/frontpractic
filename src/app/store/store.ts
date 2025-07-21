import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  paginationPostReducer,
  postReducer,
  postsReducer,
  userReducer,
  usersReducer,
} from "@/app/reducers";

export const store = configureStore({
  reducer: {
    post: postReducer,
    posts: postsReducer,
    user: userReducer,
    users: usersReducer,
    paginationPost: paginationPostReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
