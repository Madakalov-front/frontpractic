import { HeaderActionItem } from "@/widgets/header/ui/internal/HeaderAction/HeaderActionItem";
import { LogInIcon } from "@/widgets/header/ui/internal/Icon/LogInIcon";
import { BackIcon } from "../Icon/BackIcon";
import { NewArcticleIcon } from "@/widgets/header/ui/internal/Icon/NewArcticleIcon";
import { UsersListIcon } from "@/widgets/header/ui/internal/Icon/UsersListIcon";
import styles from "./HeaderAction.module.scss";

export const HeaderAction = () => {
  return (
    <div className={styles["header-action"]}>
      <HeaderActionItem modClass="login">
        <LogInIcon />
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
