import { getPosts } from "@/app/async-thunk/get-posts";
import type { PostProps } from "@/app/reducers/post-reducer";
import type { CommentsProps } from "@/feature/comments/ui/Comments";
import type { ErrorResponse, StatusResponse } from "@/shared/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type InitialPostsState = {
  data: PostProps[];
  status: StatusResponse;
  error: ErrorResponse;
};

const initialState: InitialPostsState = {
  data: [],
  status: "idle",
  error: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<PostProps>) => {
      state.data.push(action.payload);
    },
    addPosts: (state, action: PayloadAction<PostProps[]>) => {
      state.data = action.payload;
    },
    editPostItem: (state, action: PayloadAction<PostProps>) => {
      if (!action.payload) return state;
      const post = state.data.findIndex(
        (findItem) => findItem.id === action.payload.id
      );
      if (post >= 0) {
        state.data[post] = action.payload;
      }
    },
    resetStatus: (state, action: PayloadAction<StatusResponse>) => {
      state.status = action.payload;
    },
    removePost: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((post) => post.id !== action.payload);
    },
    addCommentPosts: (
      state,
      action: PayloadAction<{ id: number; comment: CommentsProps }>
    ) => {
      const post = state.data.find((item) => item.id === action.payload.id);
      if (post) {
        post.comments?.push(action.payload.comment);
      }
    },
    removeCommentPosts: (
      state,
      action: PayloadAction<{
        id_post: number | undefined;
        id_comment: number | undefined;
      }>
    ) => {
      const post = state.data.find(
        (item) => item.id === action.payload.id_post
      );
      if (post) {
        post.comments = post.comments?.filter(
          (comment) => comment.id !== action.payload.id_comment
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
        state.data = [];
        state.error = "";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getPosts.rejected, (state, acttion) => {
        state.status = "failed";
        state.error = acttion.error.message;
      });
  },
});

export const {
  addPost,
  addPosts,
  editPostItem,
  removePost,
  addCommentPosts,
  removeCommentPosts,
  resetStatus,
} = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
