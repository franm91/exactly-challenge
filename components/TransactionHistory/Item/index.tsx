import { ethers } from "ethers";
import styles from "./Item.module.css";
import { Dictionary } from "../../../types/dictionary";
import { historyEntities } from "../../../types/historyEntities";

import formatWallet from "../../../utils/formatWallet";
import { ListGroup } from "react-bootstrap";

type Props = {
  entry: historyEntities;
};

function Item({ entry }: Props) {
  const { type, amount, tokens, payer, borrower } = entry;

  const decimals: Dictionary<number> = {
    DAI: 18,
    cDAI: 8,
  };

  return (
    <ListGroup>
      <ListGroup.Item className={styles.item} variant="primary">
        <p>Transaction: {type}</p>
        {amount && (
          <p> DAI: {ethers.utils.formatUnits(amount, decimals.DAI)}</p>
        )}
        {tokens && (
          <p>cDAI: {ethers.utils.formatUnits(tokens, decimals.cDAI)}</p>
        )}
        {payer && <p>Payer: {formatWallet(payer)}</p>}
        {borrower && <p>Borrower: {formatWallet(borrower)}</p>}
      </ListGroup.Item>
    </ListGroup>
  );
}

export default Item;
