import Layout from "../components/Layout/layout";
import Head from "next/head";
import Mint from "../components/Mint";
import { useWeb3Context } from "../context/web3Context";

export default function Supply() {
  const { address } = useWeb3Context();
  return (
    <Layout>
      <>
        <Head>
          <title>Supply</title>
        </Head>
        <h1>Supply</h1>
        {address ? <Mint /> : ""}
      </>
    </Layout>
  );
}
