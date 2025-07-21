import { loadPost } from "@/app/reducers/post-reducer";
import { useAppDispatch, useAppSelector } from "@/app/store";

export const useGetStorePost = (id: number) => {
  const dispatch = useAppDispatch();

  const postFromStore = useAppSelector((store) =>
    store.posts.data.find((item) => item.id === Number(id))
  );

  if (postFromStore) {
    dispatch(loadPost(postFromStore));
  }

  return {
    postFromStore,
  };
};
