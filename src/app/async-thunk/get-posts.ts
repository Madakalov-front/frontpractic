import {
  setPageCount,
  setRequestPosts,
} from "@/app/reducers/pagination-posts-reducer";
import type { PostProps } from "@/app/reducers/post-reducer";
import type { RootState } from "@/app/store";
import type { CommentsProps } from "@/feature/comments/ui/Comments";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk<
  PostProps[],
  string,
  { state: RootState }
>("postsSlice/getPosts", async (pathname, thunkAPI) => {
  try {
    const { current_page, limit_count } = thunkAPI.getState().paginationPost;
    const query = new URLSearchParams({
      _page: current_page.toString(),
      _limit: limit_count.toString(),
    });

    const postsFetch = await fetch(
      `/api/posts?${pathname === "/" ? query.toString() : ""}`
    );

    if (!postsFetch.ok) {
      return thunkAPI.rejectWithValue("Ошибка при загрузке данных");
    }
    if (pathname === "/") {
      thunkAPI.dispatch(
        setPageCount(Number(postsFetch.headers.get("X-Total-Count")))
      );
    }
    const commentsFetch = await fetch(`/api/comments`);
    if (!commentsFetch.ok) {
      return thunkAPI.rejectWithValue("Ошибка при загрузке данных");
    }
    const posts = await postsFetch.json();
    const comments = await commentsFetch.json();
    const updatePosts = posts.map((post: PostProps) => ({
      ...post,
      comments:
        comments.filter(
          (comment: CommentsProps) => comment.post_id === post.id
        ) ?? [],
    }));
    if (pathname === "/") {
      thunkAPI.dispatch(setRequestPosts(updatePosts));
    }
    return updatePosts;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
});
