import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => (
  <Navbar bg="light" variant="light">
    <Link href="/products" passHref>
      <Navbar.Brand>BookStore</Navbar.Brand>
    </Link>

    <Nav className="mr-auto">
      <Link href="/products" passHref>
        <Nav.Link>Products</Nav.Link>
      </Link>
      <Link href="/user/{username}" passHref>
        <Nav.Link>Account</Nav.Link>
      </Link>
      <Link href="/cart/{username}" passHref>
        <Nav.Link>Cart</Nav.Link>
      </Link>
    </Nav>
    
  </Navbar>
);

export default Header;