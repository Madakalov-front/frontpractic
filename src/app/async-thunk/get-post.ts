import type { CommentsProps } from "@/feature/comments/ui/Comments";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPost = createAsyncThunk(
  "slicePost/getPost",
  async (id: number) => {
    if (!id) return;
    try {
      const postsFetch = await fetch(`/api/posts/${id}`);
      const commentsFecth = await fetch("/api/comments");
      if (!postsFetch.ok) {
        throw new Error(`status error - ${postsFetch.status}`);
      }
      if (!commentsFecth.ok) {
        throw new Error(`status error - ${commentsFecth.status}`);
      }
      const post = await postsFetch.json();
      const commets = await commentsFecth.json();
      post.status = "succeeded";
      post.comments =
        commets.filter(
          (comment: CommentsProps) => comment.post_id === post.id
        ) ?? [];
      return post;
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  }
);
