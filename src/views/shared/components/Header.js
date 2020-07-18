import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Search from './Search';
import { getCurrentUser } from '../../../api/authenticationApi';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: getCurrentUser(),
    };
  }

  componentDidMount() {
    this.setState({
      currentUser: getCurrentUser(),
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
            <Nav.Link as={Link} to="/insights">Insights</Nav.Link>
            {
              currentUser && currentUser.username
              && (
                <>
                  <Nav.Link as={Link} to={`/user/${currentUser.username}`}>Account</Nav.Link>
                  <Nav.Link as={Link} to={`/cart/${currentUser.username}`}>Cart</Nav.Link>
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
