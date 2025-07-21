import { removeUser } from "@/app/reducers/users-reducer";
import { useAppDispatch } from "@/app/store";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./DeleteUserButton.module.scss";
import { fetchRemoveUser } from "@/app/async-thunk/remove-user";

type DeleteUserButtonProps = {
  id: number;
};

export const DeleteUserButton = ({ id }: DeleteUserButtonProps) => {
  const dispatch = useAppDispatch();

  const handleRemoveUser = () => {
    dispatch(removeUser(id));
    fetchRemoveUser(id);
  };
  return (
    <button onClick={handleRemoveUser} className={styles["delete-button"]}>
      <FontAwesomeIcon icon={faUserSlash} />
    </button>
  );
};
