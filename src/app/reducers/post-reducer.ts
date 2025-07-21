import { getPost } from "@/app/async-thunk/get-post";
import type { CommentsProps } from "@/feature/comments/ui/Comments";
import type { ErrorResponse, StatusResponse } from "@/shared/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type PostProps = {
  readonly id?: number;
  title: string;
  slug: string;
  image_url: string;
  content: string;
  published_at: string;
  comments?: CommentsProps[];
};

type InitialPostState = {
  data: PostProps | undefined;
  status: StatusResponse;
  error: ErrorResponse;
};

const initialState: InitialPostState = {
  data: undefined,
  status: "idle",
  error: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addCommentPost: (state, action: PayloadAction<CommentsProps>) => {
      if (state.data) state.data.comments?.push(action.payload);
    },
    removeCommentPost: (state, action: PayloadAction<number>) => {
      if (state.data)
        state.data.comments = state.data.comments?.filter(
          (comment) => comment.id !== action.payload
        );
    },
    loadPost: (state, action: PayloadAction<PostProps>) => {
      state.data = action.payload;
      state.status = "succeeded";
    },
    editPost: (state, action: PayloadAction<PostProps>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addCommentPost, removeCommentPost, loadPost, editPost } =
  postSlice.actions;
export const postReducer = postSlice.reducer;
