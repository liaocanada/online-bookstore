import fetch from 'isomorphic-unfetch';
import config from '../config';

// eslint-disable-next-line import/prefer-default-export
export const getAuthor = async authorName => {
  const url = `${config.API_GATEWAY_ENDPOINT}/authors/${authorName}`;

  const res = await fetch(url);
  return res.json();
};
