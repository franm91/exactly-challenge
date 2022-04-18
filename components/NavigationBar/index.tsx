import { Nav, Navbar } from "react-bootstrap";
import styles from "./NavigationBar.module.css";
import Address from "@/Address";
import Link from "next/link";
import WalletConnectButton from "@/WalletConnectButton";

export const NavigationBar = () => (
  <Navbar collapseOnSelect expand="lg" variant="light" className={styles.nav}>
    <Navbar.Brand>
      <Link href="/">Home</Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Link href="/supply" passHref>
          <Nav.Link>Supply</Nav.Link>
        </Link>
        <Link href="/redeem" passHref>
          <Nav.Link>Redeem</Nav.Link>
        </Link>
      </Nav>
      <Nav>
        <WalletConnectButton />

        <Address />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
