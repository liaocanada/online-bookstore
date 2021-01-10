import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUsername } from '../../../redux/authenticationSlice';
import Search from './Search';
import redirectToLogin from '../helpers/redirectToLogin';
import redirectToLogout from '../helpers/redirectToLogout';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const username = useSelector(selectUsername);
  const currentPath = useLocation().pathname;

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
              <Nav.Link as={Link} to={`/user/${username}`}>Account</Nav.Link>
              <Nav.Link as={Link} to={`/cart/${username}`}>Cart</Nav.Link>
              <Nav.Link onClick={() => redirectToLogout(currentPath)}>Log&nbsp;Out</Nav.Link>
            </>
          ) : (
            <Nav.Link onClick={() => redirectToLogin(currentPath)}>Login</Nav.Link>
          )}
        </Nav>

      </Navbar>
    </>
  );
};

export default Header;
