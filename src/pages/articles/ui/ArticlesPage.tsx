import { CardArticle } from "@/entities";
import styles from "./ArticlesPage.module.scss";
import { useDataArticles } from "@/shared/hooks";
import { useEffect } from "react";
import { resetStatus } from "@/app/reducers/posts-reducer";
import { useAppDispatch } from "@/app/store";

export const ArticlesPage = () => {
  const { data, status, error } = useDataArticles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetStatus("idle"));
    };
  }, []);

  return (
    <main className={styles["articles-page"]}>
      <div className="container">
        <h1>Статьи</h1>
        {status === "loading" && <p>загрузка...</p>}
        {error && <p>ошибка...</p>}
        {status === "succeeded" && (
          <div className={styles["articles-page__inner"]}>
            {data &&
              data.map((article) => (
                <CardArticle key={article.id} {...article} />
              ))}
          </div>
        )}
      </div>
    </main>
  );
};
