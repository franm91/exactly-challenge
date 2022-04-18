import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@/Layout/layout";
import "bootstrap/dist/css/bootstrap.min.css";

const Home: NextPage = () => {
  return (
    <div className="test">
      <Layout>
        <>
          <Head>
            <title>Exactly Challenge</title>
            <meta name="description" content="Francisco Marienhoff Challenge" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
        </>
      </Layout>
    </div>
  );
};

export default Home;
