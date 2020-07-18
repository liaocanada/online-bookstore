import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../shared/components/Loader';
import { getCartByUsername } from '../../api/checkoutApi';
import Checkout from './Checkout';

const CheckoutLoader = () => {
  const { username } = useParams();

  return (
    <Loader
      component={Checkout}
      action={() => getCartByUsername(username)}
      extraProps={{ username }}
    //   selector={res => res.product}
    //   propsKey="product"
    />
  );
};

export default CheckoutLoader;
