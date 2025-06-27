import { IconLink } from "@/shared/ui/IconLink/IconLink";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LogInIcon = () => {
  return (
    <IconLink
      to="/login"
      icon={<FontAwesomeIcon icon={faArrowRightToBracket} />}
      className="login"
    />
  );
};
