import Head from "next/head";
import styles from "./layout.module.css";
import React, { ReactChild } from "react";
import { NavigationBar } from "../NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useWeb3Context } from "../../context/web3Context";
import { Card } from "react-bootstrap";
import TransactionHistory from "../TransactionHistory";

interface Props {
  children: ReactChild;
}
export default function Layout({ children }: Props) {
  const { network } = useWeb3Context();

  return (
    <>
      <Head>
        <title>Layouts Example</title>
      </Head>
      <NavigationBar />
      <h1 className={styles.title}>Exactly Challenge</h1>
      <section className={styles.section}>
        {network?.name?.toLowerCase() != "kovan" ? (
          network?.name && (
            <>
              <p className={styles.networkText}>
                You are currently connected to{" "}
                <strong>{network?.name.toUpperCase()}</strong> <br />
                This only works on <strong>KOVAN</strong>
              </p>
            </>
          )
        ) : (
          <p>
            You are currently connected to{" "}
            <strong>{network?.name.toUpperCase()}</strong> network
          </p>
        )}
      </section>
      <main className={styles.main}>{children}</main>
      <section className={styles.section}>
        {network ? (
          <Card
            className={styles.main}
            border="primary"
            style={{ width: "50rem" }}
          >
            <TransactionHistory />
          </Card>
        ) : (
          ""
        )}
      </section>
    </>
  );
}
