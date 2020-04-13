import Link from 'next/link';
import { Button, Navbar, Nav } from 'react-bootstrap';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Navbar bg="light" variant="light">
    <Navbar.Brand href="/products">BookStore</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/products">Products</Nav.Link>
      <Nav.Link href="/user/{username}">Account</Nav.Link>
      <Nav.Link href="/cart/{username}">Cart</Nav.Link>
    </Nav>
  </Navbar>
    
  </div>
);

export default Header;