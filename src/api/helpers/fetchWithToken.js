import fetch from './fetchWithRetry';

export default async (url, jwt, options) => {
  if (!options) options = {};
  if (!options.headers) options.headers = {};

  options.headers.Authorization = `Bearer ${jwt}`;

  return fetch(url, options);
};
