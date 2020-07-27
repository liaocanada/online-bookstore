import fetch from './helpers/fetchWithRetry';
import fetchWithToken from './helpers/fetchWithToken';
import config from '../config';

export const addProductToCart = async (username, productId) => {
  const requestBody = {
    product_id: productId,
    quantity: 1,
  };
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };

  const url = `${config.API_GATEWAY_ENDPOINT}/cart/${username}`;

  const res = await fetch(url, fetchOptions);
  return res;
};

export const getCartByUsername = async (username, jwt) => {
  const url = `${config.API_GATEWAY_ENDPOINT}/cart/${username}`;

  const res = await fetchWithToken(url, jwt);

  return {
    username,
    products: await res.json() // TODO make sure 200
  };
};

// Just the qty
export const editProductInCart = async (productId, newQuantity, username) => {
  const requestBody = {
    quantity: newQuantity
  };
  const fetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };
  const url = `${config.API_GATEWAY_ENDPOINT}/cart/${username}/${productId}`;

  const res = await fetch(url, fetchOptions);
  // TODO throw if non-success
};

export const submitOrder = async (username, billedTo, shippedTo) => {
  const requestBody = {
    username,
    billed_to: billedTo,
    shipped_to: shippedTo,
  };
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };
  const url = `${config.API_GATEWAY_ENDPOINT}/orders`;

  const res = await fetch(url, fetchOptions); // TODO error handling
  const orderNumber = (await res.json()).order_number;
  return orderNumber;
};
