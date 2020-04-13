import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';
import React from 'react';
import Seach from "./Search";
import authenticationService from "../services/authenticationService";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.getCurrentUser()
    };
  }

  componentDidMount() {
    this.setState({
      currentUser: authenticationService.getCurrentUser()
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Navbar bg="light" variant="light" sticky="top">
        <Link href="/products" passHref>
          <Navbar.Brand>BookStore</Navbar.Brand>
        </Link>

        <Nav className="mr-auto">
          <Seach />
        </Nav>

        {
          currentUser && currentUser.username &&
          <Nav>
            <Link href={"/user/" + currentUser.username} passHref>
              <Nav.Link>Account</Nav.Link>
            </Link>
            <Link href={"/cart/" + currentUser.username} passHref>
              <Nav.Link>Cart</Nav.Link>
            </Link>
          </Nav>
        }

      </Navbar>
    );
  }
}

export default Header;