import CustomButton from "@/Button";
import { useWeb3Context } from "context/web3Context";

function WalletConnectButton() {
  const { connect, disconnect, address } = useWeb3Context();

  return (
    <>
      {!address && connect && (
        <CustomButton text="Connect Wallet" onClick={connect} color="success" />
      )}
      {address && disconnect && (
        <CustomButton
          text="Disconnect Wallet"
          onClick={disconnect}
          color="danger"
        />
      )}
    </>
  );
}

export default WalletConnectButton;
