import clsx from "clsx";
import styles from "./Buttom.module.scss";

type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  name: string;
  variant?: "default" | "submit";
  onClick?: () => void;
  disabled: boolean;
};

export const Button = ({
  type = "button",
  name,
  variant = "default",
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(styles.btn, variant && styles[`btn--${variant}`])}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};
