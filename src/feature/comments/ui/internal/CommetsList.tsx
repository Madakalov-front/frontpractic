import { useAppDispatch, useAppSelector } from "@/app/store";
import { setFirstSymUpperCase } from "@/shared/utils";

import styles from "./CommentsList.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { removeComment } from "@/app/async-thunk/remove-comment";
import { removeCommentPosts } from "@/app/reducers/posts-reducer";
import { removeCommentPost } from "@/app/reducers/post-reducer";
import type { CommentsProps } from "@/feature/comments/ui/Comments";
import { ROLE_ID } from "@/shared/constants";

export const CommetsList = () => {
  const comments = useAppSelector((store) => store.post.data.comments);
  const role_id = useAppSelector((store) => store.user.role_id);

  const dispatch = useAppDispatch();
  const handleRemoveComment = (comment: CommentsProps) => {
    removeComment(comment.id);
    dispatch(
      removeCommentPosts({
        id_post: comment.post_id,
        id_comment: comment.id,
      })
    );
    dispatch(removeCommentPost(comment.post_id));
  };
  return (
    <>
      {comments && comments.length ? (
        <div className={styles["comments-list"]}>
          {comments.map((comment) => (
            <div className={styles["comments-list__item"]} key={comment.id}>
              <div>
                <time dateTime={comment.publiched_at}>
                  {comment.publiched_at}
                </time>
                <h3>{setFirstSymUpperCase(comment.name)}</h3>
                <p>{comment.comment}</p>
              </div>
              {role_id !== null && role_id <= ROLE_ID.MODERATOR && (
                <button onClick={() => handleRemoveComment(comment)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <h3>Комментариев пока нет</h3>
      )}
    </>
  );
};
