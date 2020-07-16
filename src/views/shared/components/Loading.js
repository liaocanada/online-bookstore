import React from 'react';
import { Spinner, Alert } from 'react-bootstrap';

const Loading = () => (
  <Alert variant="info">
    <Alert.Heading>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      Loading...
    </Alert.Heading>
    <p>
      Note: to save costs we are using a serverless database, so actions which query
      the database may take ~30s for it to warm up after going idle for some amount of time.
    </p>
  </Alert>
);

export default Loading;
