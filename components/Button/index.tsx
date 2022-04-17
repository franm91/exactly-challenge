import { MouseEventHandler } from "react";
import { Button } from "react-bootstrap";
import styles from "./Button.module.css";

type Props = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  color?: string;
  disable?: boolean;
};

function CustomButton({ text, onClick, color, disable }: Props) {
  return (
    <Button
      className={styles.button}
      variant={color}
      onClick={onClick}
      disabled={disable}
    >
      {text}
    </Button>
  );
}

export default CustomButton;
