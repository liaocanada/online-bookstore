import React from 'react';
import { Alert } from 'react-bootstrap';
import Layout from '../shared/components/Layout';

const ErrNotFound = () => (
  <Layout>
    <h1 className="page-header">Uh oh...</h1>

    <Alert variant="warning">
      <h4>Page not found</h4>
      The page you are looking doesn&apos;t seem to exist.
      If you&apos;ve found a dead link, please let me know&nbsp;
      <a href="https://davidliao.ca/contact" className="alert-link">here</a>!
    </Alert>
  </Layout>
);

export default ErrNotFound;
