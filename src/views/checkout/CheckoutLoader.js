import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectJwt } from '../../redux/authenticationSlice';
import Loader from '../shared/components/Loader';
import { getCartByUsername } from '../../api/checkoutApi';
import Checkout from './Checkout';
import config from '../../config';

const CheckoutLoader = () => {
  const { username } = useParams();
  const jwt = useSelector(selectJwt);

  if (!jwt) {
    window.location = config.LOGIN_URL;
    return null;
  }

  return (
    <Loader
      component={Checkout}
      action={() => getCartByUsername(username, jwt)}
      extraProps={{ username }}
    />
  );
};

export default CheckoutLoader;
