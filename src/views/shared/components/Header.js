import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/authorization';
import Search from './Search';
import config from '../../../config';

const Header = props => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const username = useSelector(selectIsLoggedIn);

  return (
    <>
      <Navbar bg="light" variant="light" sticky="top">
        <Link to="/">
          <Navbar.Brand>BookStore</Navbar.Brand>
        </Link>

        <Nav id="search-nav">
          <Search />
        </Nav>

        <Nav>
          <Nav.Link as={Link} to="/insights">Insights</Nav.Link>
          {isLoggedIn ? (
            <>
              {/* Logging out redirects to another URL which resets state anyways */}
              {/* So no need to set isLoggedIn to false */}
              <Nav.Link href={config.LOGOUT_URL}>Log&nbsp;Out</Nav.Link>
              {/* <Nav.Link as={Link} to={`/user/${currentUser.username}`}>Account</Nav.Link> */}
              {/* <Nav.Link as={Link} to={`/cart/${currentUser.username}`}>Cart</Nav.Link> */}
            </>
          ) : (
            <Nav.Link href={config.LOGIN_URL}>Login</Nav.Link>
          )}
        </Nav>

      </Navbar>
    </>
  );
};

export default Header;
