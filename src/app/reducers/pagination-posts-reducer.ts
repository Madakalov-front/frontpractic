import type { PostProps } from "@/app/reducers/post-reducer";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type InitialPaginationPostsState = {
  limit_count: number;
  page_count: number;
  current_page: number;
  request_posts: {
    [key: number]: PostProps[];
  };
};

const initialState: InitialPaginationPostsState = {
  limit_count: 3,
  page_count: 0,
  current_page: 1,
  request_posts: {},
};

const paginationPostsSlide = createSlice({
  name: "pagination-post",
  initialState,
  reducers: {
    setPageCount: (state, action: PayloadAction<number>) => {
      const totalItems = action.payload;
      state.page_count = Math.ceil(totalItems / state.limit_count);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.current_page = id;
    },
    setRequestPosts: (state, action: PayloadAction<PostProps[]>) => {
      const id = state.current_page;
      if (!(id in state.request_posts)) {
        state.request_posts[id] = action.payload;
      }
    },
  },
});

export const { setPageCount, setCurrentPage, setRequestPosts } =
  paginationPostsSlide.actions;

export const paginationPostReducer = paginationPostsSlide.reducer;
