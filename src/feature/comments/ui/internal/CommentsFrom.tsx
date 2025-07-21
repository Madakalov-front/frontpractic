import { addCommentPost } from "@/app/reducers/post-reducer";
import { addCommentPosts } from "@/app/reducers/posts-reducer";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { generateDate } from "@/bff/generate-date";
import { setCommetForPost } from "@/feature/comments/model/setCommetForPost";
import {
  useFormComments,
  type FormDataComments,
} from "@/feature/comments/model/useFormComments";
import type { CommentsProps } from "@/feature/comments/ui/Comments";
import { Button } from "@/shared";
import { MAX_LENGTH, ROLE_ID } from "@/shared/constants";
import { useParams } from "react-router";
import { Link } from "react-router";
import styles from "./CommentForm.module.scss";

export const CommentsForm = () => {
  const { id: idPage } = useParams();
  const { role_id, login } = useAppSelector((store) => store.user);
  const notGuest = role_id !== ROLE_ID.GUEST;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useFormComments();

  const dispatch = useAppDispatch();
  const onSubmit = async (data: FormDataComments) => {
    const newComment: CommentsProps = {
      name: login,
      comment: data.comment,
      publiched_at: generateDate(),
      post_id: Number(idPage),
    };
    setValue("comment", "");
    const comment = await setCommetForPost(newComment);
    dispatch(addCommentPosts({ id: Number(idPage), comment: comment }));
    dispatch(addCommentPost(comment));
  };

  return (
    <div className={styles["comments-text-area"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          id="comment"
          {...register("comment")}
          maxLength={MAX_LENGTH}
          data-error-message={errors.comment?.message}
          disabled={!notGuest}
        ></textarea>
        <Button
          type="submit"
          disabled={!notGuest || isSubmitting}
          name={isSubmitting ? "отправка..." : "отправить"}
        />
      </form>

      {notGuest ? (
        <div className={styles["comments-text-area__info"]}>
          <span>
            {watch("comment")?.length ?? 0} / {MAX_LENGTH}
          </span>
          {errors.comment?.message && (
            <span className={styles["comments-text-area__error"]}>
              {errors.comment.message}
            </span>
          )}
        </div>
      ) : (
        <p className={styles["comments-text-area__login-hint"]}>
          <Link to="/login">Войдите</Link>, чтобы оставить комментарий
          {errors.comment?.message}
        </p>
      )}
    </div>
  );
};
