import Link from 'next/link';
import { Button } from '@material-ui/core';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/products">
      <Button variant="contained">Home</Button>
    </Link>
    
    <Link href="/user/{username}">
      <Button variant="contained">Account</Button>
    </Link>
    <Link href="/cart/{username}">
      <Button variant="contained">Cart</Button>
    </Link>
    <hr />
  </div>
);

export default Header;