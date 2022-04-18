import Head from "next/head";
import Layout from "@/Layout/layout";
import RedeemAction from "components/Redeem";
import { useWeb3Context } from "context/web3Context";

export default function Redeem() {
  const { address } = useWeb3Context();
  return (
    <Layout>
      <>
        <Head>
          <title>Redeem</title>
        </Head>
        <h1>Redeem</h1>
        {address ? <RedeemAction /> : ""}
      </>
    </Layout>
  );
}
