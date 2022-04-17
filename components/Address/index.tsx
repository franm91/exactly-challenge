import { useWeb3Context } from "../../context/web3Context";
import formatWallet from "../../utils/formatWallet";
import { Card } from "react-bootstrap";
import styles from "./Address.module.css";

function Address() {
  const { address } = useWeb3Context();

  const formattedWallet = address && formatWallet(address);

  return (
    <>
      {address && (
        <Card>
          <Card.Body className={styles.address}>
            Address: {formattedWallet}
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default Address;
