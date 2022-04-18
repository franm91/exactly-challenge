import { useEffect, useState } from "react";
import { ethers } from "ethers";
import styles from "./Item.module.css";
import { ContractDecimals } from "types/contractDecimals";
import { historyEntities } from "types/historyEntities";
import formatWallet from "utils/formatWallet";
import { ListGroup } from "react-bootstrap";
import { useWeb3Context } from "context/web3Context";
import getContract from "utils/getContract";
import getContractDecimals from "utils/getContractDecimals";

type Props = {
  entry: historyEntities;
};

function Item({ entry }: Props) {
  const { type, amount, tokens, payer, borrower } = entry;
  const { web3Provider } = useWeb3Context();

  const [contractDecimals, setContractDecimals] = useState<ContractDecimals>(
    {}
  );

  useEffect(() => {
    handleDecimals();
  }, [web3Provider]);

  async function handleDecimals() {
    const cDaiContract = await getContract(web3Provider, "cDai", true);
    const cDaiDecimals = await getContractDecimals(cDaiContract);

    const daiContract = await getContract(web3Provider, "dai", true);
    const daiDecimals = await getContractDecimals(daiContract);

    setContractDecimals({ cDai: cDaiDecimals, dai: daiDecimals });
  }

  return (
    <ListGroup>
      <ListGroup.Item className={styles.item} variant="primary">
        <p>Transaction: {type}</p>
        {amount && (
          <p> DAI: {ethers.utils.formatUnits(amount, contractDecimals.DAI)}</p>
        )}
        {tokens && (
          <p>cDAI: {ethers.utils.formatUnits(tokens, contractDecimals.cDai)}</p>
        )}
        {payer && <p>Payer: {formatWallet(payer)}</p>}
        {borrower && <p>Borrower: {formatWallet(borrower)}</p>}
      </ListGroup.Item>
    </ListGroup>
  );
}

export default Item;
