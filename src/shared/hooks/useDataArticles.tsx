import { getPosts } from "@/app/async-thunk/get-posts";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useEffect } from "react";
import { useLocation } from "react-router";

export const useDataArticles = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const data = useAppSelector((store) => store.posts.data);
  const status = useAppSelector((store) => store.posts.status);
  const error = useAppSelector((store) => store.posts.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getPosts(pathname));
    }
  }, [status, dispatch, pathname]);

  return {
    data,
    status,
    error,
  };
};
