import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3Context } from "context/web3Context";
import CustomButton from "@/Button";
import { transaction } from "types/transaction";
import getContract from "utils/getContract";
import getContractAddresses from "utils/getContractAddresses";
import styles from "./Redeem.module.css";
import Input from "@/Input";
import SpinnerLoader from "@/SpinnerLoader";
import getContractDecimals from "utils/getContractDecimals";

function RedeemAction() {
  const { web3Provider, address } = useWeb3Context();

  const [amount, setAmount] = useState<string>("0");
  const [transaction, setTransaction] = useState<transaction | undefined>(
    undefined
  );

  const [allowance, setAllowance] = useState<boolean>(true);
  const [disable, setDisable] = useState<boolean>(false);

  useEffect(() => {
    checkAllowance();
  }, [address, web3Provider]);

  async function handleDeposit() {
    const contract = await getContract(web3Provider, "cDai", true);

    const tx = await contract.redeemUnderlying(
      ethers.utils.parseUnits(amount, 18)
    );

    setTransaction({ status: "PENDING" });

    const txCompleted = await tx.wait();

    setTransaction({ status: "COMPLETED", hash: txCompleted.transactionHash });
  }

  async function handleApprove() {
    const contract = await getContract(web3Provider, "dai", true);

    await contract.approve(
      getContractAddresses("cDai"),
      ethers.utils.parseUnits("99999999999999999")
    );

    setAllowance(false);
  }

  async function checkAllowance() {
    const contract = await getContract(web3Provider, "dai", true);

    const allowance = await contract.allowance(
      address,
      getContractAddresses("cDai")
    );

    const formattedAllowance =
      allowance && parseFloat(ethers.utils.formatEther(allowance));

    if (formattedAllowance > parseFloat(amount)) {
      setAllowance(false);
    }
  }

  async function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const re = /^[0-9.\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setAmount(e.target.value);
    }

    const contract = await getContract(web3Provider, "dai", true);
    const currentBalance = await contract.balanceOf(address);
    const decimals = await getContractDecimals(contract);
    const formattedBalance = Number(
      ethers.utils.formatUnits(currentBalance, decimals)
    );
    const inputValue = Number(e.target.value);

    formattedBalance < inputValue ? setDisable(true) : setDisable(false);
  }

  return (
    <>
      {address && (
        <section className={styles.section}>
          {!transaction && (
            <>
              <Input value={amount} onChange={(e: any) => handleOnChange(e)} />

              <CustomButton
                text={allowance ? "Approve" : "Redeem"}
                onClick={allowance ? handleApprove : handleDeposit}
                disable={disable}
              />
            </>
          )}
          {transaction && (
            <div className={styles.success}>
              <p>{transaction.status}</p>
              {transaction.status == "PENDING" ? <SpinnerLoader /> : ""}
              {transaction.hash && (
                <>
                  <a
                    className={styles.scanLink}
                    href={`https://kovan.etherscan.io/tx/${transaction.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver en Etherscan
                  </a>
                  <CustomButton
                    text="Redeem again"
                    onClick={() => setTransaction(undefined)}
                  />
                </>
              )}
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default RedeemAction;
