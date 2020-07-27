import originalFetch from 'isomorphic-unfetch';
import fetchRetry from '@zeit/fetch-retry';

export default fetchRetry(originalFetch);
