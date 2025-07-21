import { editPostData } from "@/app/async-thunk/egit-post-data";
import { editPost, type PostProps } from "@/app/reducers/post-reducer";
import { useAppDispatch } from "@/app/store";
import { PostForm } from "@/entities";
import { useValidPost } from "@/shared/hooks";
import type { FormDataPost } from "@/shared/schema";
import { createSlug } from "@/shared/utils/create-slug";
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { editPostItem } from "@/app/reducers/posts-reducer";

import styles from "./EditArticleModal.module.scss";
type EditArticleModalProps = {
  post: PostProps;
  showEditFlag: Dispatch<SetStateAction<boolean>>;
};

export const EditArticleModal = ({
  post,
  showEditFlag,
}: EditArticleModalProps) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useValidPost();
  const initPost = useRef<boolean>(false);

  useEffect(() => {
    if (post && !initPost.current) {
      reset(post);
      initPost.current = true;
    }
  }, [post, reset]);

  const onSubmit = async (data: FormDataPost) => {
    if (!post) return;
    const title = post.title !== data.title ? data.title : post.title;
    const content = post.content !== data.content ? data.content : post.content;
    const image_url =
      post.image_url !== data.image_url ? data.image_url : post.image_url;
    const slug = post.title !== data.title ? createSlug(data.title) : post.slug;
    const newPost: PostProps = {
      ...post,
      title,
      content,
      image_url,
      slug,
    };
    const postFetch = await editPostData(newPost);
    dispatch(editPostItem(postFetch));
    dispatch(editPost(postFetch));
    showEditFlag(false);
  };

  return (
    <div className={styles["edit-article-modal"]}>
      <div className={styles["edit-article-modal__overlay"]}></div>
      <PostForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        name_button="сохранить"
      />
    </div>
  );
};
