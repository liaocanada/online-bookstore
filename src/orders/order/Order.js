import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const productStyle = {
  border: '1px solid #DDD',
  margin: 20,
  padding: 20,
  cursor: 'pointer'
};

const Order = props => {
  let { order_number, status, time_placed } = props;

  return (
    <Link to={`/orders/${order_number}`}>
      <Card style={productStyle}>
        <Card.Body>
          <Card.Title>Order #{order_number}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Status: {status}</Card.Subtitle>
          <Card.Text>Time placed: {time_placed}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Order;
