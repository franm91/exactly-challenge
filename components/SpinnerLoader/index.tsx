import { Spinner } from "react-bootstrap";
import styles from "./SpinnerLoader.module.css";

function SpinnerLoader() {
  return <Spinner className={styles.spinner} animation="border" />;
}

export default SpinnerLoader;
