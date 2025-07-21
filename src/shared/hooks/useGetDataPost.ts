import { getPost } from "@/app/async-thunk/get-post";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useEffect } from "react";

export const useGetDataPost = (id: number) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((store) => store.post.data);
  const status = useAppSelector((store) => store.post.status);
  const error = useAppSelector((store) => store.post.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getPost(id));
    }
  }, [status, dispatch]);

  return {
    data,
    status,
    error,
  };
};
