import { ChangeEventHandler } from "react";
import styles from "./Input.module.css";

type Props = {
  onChange?: ChangeEventHandler;
  value: string;
};

function Input({ value, onChange }: Props) {
  return <input className={styles.input} value={value} onChange={onChange} />;
}

export default Input;
