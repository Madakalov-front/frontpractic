import { HeaderActionItem } from "@/widgets/header/ui/internal/HeaderAction/HeaderActionItem";
import { LogOutButton } from "@/widgets/header/ui/internal/Icon/LogOutButton";
import { LogInButton } from "@/widgets/header/ui/internal/Icon/LogInButton";
import { BackIcon } from "@/widgets/header/ui/internal/Icon/BackIcon";
import { NewArcticleIcon } from "@/widgets/header/ui/internal/Icon/NewArcticleIcon";
import { UsersListIcon } from "@/widgets/header/ui/internal/Icon/UsersListIcon";
import { useAppSelector } from "@/app/store";

import styles from "./HeaderAction.module.scss";
import { ROLE_ID } from "@/shared/constants";

export const HeaderAction = () => {
  const { login, role_id } = useAppSelector((state) => state.user);

  return (
    <div className={styles["header-action"]}>
      <HeaderActionItem modClass="login">
        {role_id && role_id === ROLE_ID.GUEST ? (
          <LogInButton />
        ) : (
          <>
            <span>{login}</span>
            <LogOutButton />
          </>
        )}
      </HeaderActionItem>
      <HeaderActionItem modClass="back-home">
        <BackIcon />
      </HeaderActionItem>
      <HeaderActionItem modClass="new-article">
        <NewArcticleIcon />
      </HeaderActionItem>
      <HeaderActionItem modClass="users-list">
        <UsersListIcon />
      </HeaderActionItem>
    </div>
  );
};
