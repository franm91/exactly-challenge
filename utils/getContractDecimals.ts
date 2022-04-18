import { ethers } from "ethers";

export default function getContractDecimals(contract: ethers.Contract) {
  const decimals = contract.decimals();

  return decimals;
}
