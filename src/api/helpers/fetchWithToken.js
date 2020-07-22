import fetch from 'isomorphic-unfetch';

export default async (url, jwt, options) => {
  if (!options) options = {};
  if (!options.headers) options.headers = {};

  options.headers.Authorization = `Bearer ${jwt}`;

  return fetch(url, options);
};
