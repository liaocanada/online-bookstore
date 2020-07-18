import fetch from 'isomorphic-unfetch';
import config from '../config';

// eslint-disable-next-line import/prefer-default-export
export const getUser = async username => {
  const url = `${config.API_GATEWAY_ENDPOINT}/users/${username}`;

  const res = await fetch(url);
  return res.json();
};
