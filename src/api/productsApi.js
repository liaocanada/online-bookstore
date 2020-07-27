import fetch from './helpers/fetchWithRetry';
import config from '../config';

export const getAllProducts = async q => {
  const query = q ?
    `?name=${q}&genre=${q}&isbn=${q}&author_name=${q}&series=${q}&format=${q}&tag=${q}` :
    '';
  const url = `${config.API_GATEWAY_ENDPOINT}/products${query}`;

  const res = await fetch(url);
  return {
    search: q,
    products: await res.json()
  };
};

export const getProductById = async id => {
  const url = `${config.API_GATEWAY_ENDPOINT}/products/${id}`;

  const res = await fetch(url);
  return {
    product: await res.json()
  };
};
