import type { PostProps } from "@/app/reducers/post-reducer";
import { createSlug } from "@/shared/utils/create-slug";
import { generateDate } from "@/bff/generate-date";
import { addPostForDB } from "@/app/async-thunk/add-post";
import { useAppDispatch } from "@/app/store";
import { addPost } from "@/app/reducers/posts-reducer";
import type { FormDataPost } from "@/shared/schema";
import { PostForm } from "@/entities";
import { useValidPost } from "@/shared/hooks";

export const NewPostForm = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, setValue } = useValidPost();

  const onSubmit = async (data: FormDataPost) => {
    const newPost: PostProps = {
      title: data.title,
      content: data.content,
      image_url: data.image_url,
      slug: createSlug(data.title),
      published_at: generateDate(),
    };
    setValue("title", "");
    setValue("content", "");
    setValue("image_url", "");
    const post = await addPostForDB(newPost);
    dispatch(addPost(post));
  };
  return (
    <PostForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      name_button="создать"
    />
  );
};
