import fetch from 'isomorphic-unfetch';
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

