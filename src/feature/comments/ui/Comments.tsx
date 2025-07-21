import { CommentsForm, CommetsList } from "@/feature/comments/ui/internal";
import styles from "./Comments.module.scss";

export type CommentsProps = {
  readonly id?: number;
  name: string | null;
  comment: string;
  publiched_at: string;
  post_id: number;
};

export const Comments = () => {
  return (
    <div className={styles.commets}>
      <CommentsForm />
      <CommetsList />
    </div>
  );
};
