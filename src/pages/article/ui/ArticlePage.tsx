import { useParams } from "react-router";
import styles from "./ArticlePage.module.scss";
import { Comments } from "@/feature/comments";
import { useGetDataPost, useGetStorePost } from "@/shared/hooks";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { removePostData } from "@/app/async-thunk/remove-post-data";
import { removePost } from "@/app/reducers/posts-reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ROLE_ID } from "@/shared/constants";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { EditArticleModal } from "@/feature/edit-article-modal";
import { useState } from "react";

export const ArticlePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const role_id = useAppSelector((store) => store.user.role_id);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const { postFromStore } = useGetStorePost(Number(id));
  const { data: fetchPost, status, error } = useGetDataPost(Number(id));

  const post = postFromStore || fetchPost;

  const handleRemovePost = () => {
    removePostData(Number(id));
    if (id) {
      dispatch(removePost(Number(id)));
    }
  };
  const handleOpenEdit = () => setShowEdit(true);

  if (status === "loading") return <div>Load....</div>;
  if (status === "failed" || !post) {
    return <div>Ошибка: {error || "Не удалось загрузить статью"}</div>;
  }
  const { title, content, image_url, published_at } = post;

  return (
    <main className="article-page">
      <div className="container">
        <div
          className={styles["article-detail"]}
          style={{ backgroundImage: `url(${image_url})` }}
        >
          <div className={styles["article-detail__card"]}>
            <span className={styles["article-detail__date"]}>
              {published_at}
            </span>
            <h1 className={styles["article-detail__title"]}>{title}</h1>
            <p className={styles["article-detail__text"]}>{content}</p>
            {role_id !== null && role_id <= ROLE_ID.MODERATOR && (
              <div className={styles["article-detail-action"]}>
                <button onClick={handleOpenEdit}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button onClick={handleRemovePost}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            )}
          </div>
        </div>
        {showEdit && (
          <EditArticleModal post={post} showEditFlag={setShowEdit} />
        )}
        <Comments />
      </div>
    </main>
  );
};
