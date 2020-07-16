import React, { useState, useEffect } from 'react';
import { Spinner, Alert } from 'react-bootstrap';

const Loading = () => {
  const [displayMessage, setDisplayMessage] = useState(false);
  useEffect(() => { setTimeout(() => setDisplayMessage(true), 5000); });

  const message = displayMessage ? (
    <p>
      Note: to save costs we are using a serverless database, so actions which query
      the database may take ~30s for it to warm up after going idle for some amount of time.
    </p>
  ) : <></>;

  return (
    <Alert variant="info">
      <Alert.Heading>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        {'  ' /* TODO add padding instead */}Loading...
      </Alert.Heading>
      {message}
    </Alert>
  );
};

export default Loading;
