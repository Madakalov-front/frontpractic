import { CardArticle } from "@/entities";
import styles from "./CardGrid.module.scss";
import { useDataArticles } from "@/shared/hooks";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useSearchParams } from "react-router";
import { getPosts } from "@/app/async-thunk/get-posts";
import { addPosts } from "@/app/reducers/posts-reducer";
import { setCurrentPage } from "@/app/reducers/pagination-posts-reducer";
import clsx from "clsx";
import { useLocation } from "react-router";
export const CardGrid = () => {
  const { limit_count, page_count, current_page, request_posts } =
    useAppSelector((store) => store.paginationPost);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: posts, status, error } = useDataArticles();
  const filteredPosts = useMemo(
    () =>
      posts.filter(
        (post) => post.title.includes(" ") || post.content.includes(" ")
      ),
    [posts]
  );

  useEffect(() => {
    const newParams = new URLSearchParams({
      _page: current_page.toString(),
      _limit: limit_count.toString(),
    });
    setSearchParams(newParams);
  }, [current_page, limit_count, setSearchParams, searchParams]);

  const handlePage = (page: number) => {
    dispatch(setCurrentPage(page));
    if (page in request_posts) {
      dispatch(addPosts(request_posts[page]));
    } else {
      dispatch(getPosts(pathname));
    }
  };

  return (
    <div className={styles["card-grid"]}>
      <div className={styles["card-grid__list"]}>
        {status === "loading" && <p>load...</p>}
        {error && <p>ошибка загрузки...</p>}
        {filteredPosts &&
          filteredPosts.map((post, index) => (
            <div key={index} className={styles["card-grid__item"]}>
              <CardArticle {...post} />
            </div>
          ))}
      </div>

      <div className={styles["card-grid__pagination"]}>
        {Array.from({ length: page_count }, (_, i) => (
          <button
            key={i}
            className={clsx(
              styles["card-grid__page"],
              current_page === i + 1 && styles["card-grid__page--active"]
            )}
            onClick={() => handlePage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
