import type { CommentsProps } from "@/feature/comments/ui/Comments";

export const setCommetForPost = async (comments: CommentsProps) => {
  try {
    const res = await fetch(`/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comments),
    });
    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
};
