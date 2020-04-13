import Link from 'next/link';
import { Navbar, Nav, Form, Button, NavDropdown } from 'react-bootstrap';
import React from 'react';
import Seach from "./Search";

class Header extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Navbar bg="light" variant="light" sticky="top">
        <Link href="/products" passHref>
          <Navbar.Brand>BookStore</Navbar.Brand>
        </Link>

        <Nav className="mr-auto">
          {/* <Link href="/products" passHref>
            <Nav.Link>Products</Nav.Link>
          </Link> */}
          <Seach />
        </Nav>

        <Nav>
          <Link href="/user/{username}" passHref>
            <Nav.Link>Account</Nav.Link>
          </Link>
          <Link href="/cart/{username}" passHref>
            <Nav.Link>Cart</Nav.Link>
          </Link>
        </Nav>

      </Navbar>
    );
  }
}

export default Header;