import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Search from './Search';
import authenticationService from '../services/authenticationService';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.getCurrentUser(),
    };
  }

  componentDidMount() {
    this.setState({
      currentUser: authenticationService.getCurrentUser(),
    });
  }

  render() {
    const { currentUser } = this.state;

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
            <Link to="/insights">
              <Nav.Link>Insights</Nav.Link>
            </Link>
            {
                currentUser && currentUser.username
                  && (
                  <>
                    <Link to={`/user/${currentUser.username}`}>
                      <Nav.Link>Account</Nav.Link>
                    </Link>
                    <Link to={`/cart/${currentUser.username}`}>
                      <Nav.Link>Cart</Nav.Link>
                    </Link>
                  </>
                  )
              }
          </Nav>

        </Navbar>
      </>
    );
  }
}

export default Header;
