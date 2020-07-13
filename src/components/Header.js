import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';
import React from 'react';
import Search from "./Search";
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

        <Nav id="search-nav">
          <Search />
        </Nav>

        <Nav>
            <Link href="/insights" passHref>
              <Nav.Link>Insights</Nav.Link>
            </Link>
        {
          currentUser && currentUser.username &&
            <><Link href={"/user/" + currentUser.username} passHref>
              <Nav.Link>Account</Nav.Link>
            </Link>
            <Link href={"/cart/" + currentUser.username} passHref>
              <Nav.Link>Cart</Nav.Link>
            </Link></>
        }
        </Nav>

      </Navbar>
    );
  }
}

export default Header;