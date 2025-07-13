import { logOut } from "@/app/reducers/user-reducer";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

export const LogOutButton = () => {
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const session = useAppSelector((state) => state.user.session);
  const handleClick = () => {
    if (session) {
      dispath(logOut(session));
    }
    navigate("/");
  };

  return (
    <button onClick={handleClick}>
      <FontAwesomeIcon icon={faArrowRightToBracket} />
    </button>
  );
};
