import { MouseEventHandler } from "react";
import { Button } from "react-bootstrap";

type Props = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  color?: string;
  disable?: boolean;
};

function CustomButton({ text, onClick, color, disable }: Props) {
  return (
    <Button variant={color} onClick={onClick} disabled={disable}>
      {text}
    </Button>
  );
}

export default CustomButton;
