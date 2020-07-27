import fetch from './helpers/fetchWithRetry';
import config from '../config';

// eslint-disable-next-line import/prefer-default-export
export const getOrder = async orderNumber => {
  const url = `${config.API_GATEWAY_ENDPOINT}/orders/${orderNumber}`;

  const res = await fetch(url);
  return res.json();
};
