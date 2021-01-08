import React from 'react';
import { CardColumns, Form, Row, Col } from 'react-bootstrap';
import Layout from '../shared/components/Layout';
import ProductCard from '../products/components/ProductCard';
import { calculatePrice } from '../shared/helpers/calculateProductsMetadata';

const OrderDetails = props => {
  // eslint-disable-next-line react/destructuring-assignment
  const { order_number, order_info, products } = props.data;
  const deliveryFee = parseFloat(order_info.delivery_fee);
  const price = calculatePrice(products) + deliveryFee;

  return (
    <Layout>
      <h1>Order #{order_number}</h1>

      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            <strong>Total</strong>
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={`$${price.toFixed(2)}`} />
          </Col>

          <Form.Label column sm="2">
            <strong>Delivery fee</strong>
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={`$${deliveryFee.toFixed(2)}`} />
          </Col>

          <Form.Label column sm="2">
            <strong>Ordered by</strong>
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={order_info.username} />
          </Col>

          <Form.Label column sm="2">
            <strong>Status</strong>
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={order_info.status} />
          </Col>

          <Form.Label column sm="2">
            <strong>Billed to</strong>
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={order_info.billed_to} />
          </Col>

          <Form.Label column sm="2">
            <strong>Shipped to</strong>
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={order_info.shipped_to} />
          </Col>

          <Form.Label column sm="2">
            <strong>Time placed</strong>
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={order_info.time_placed} />
          </Col>
        </Form.Group>
      </Form>

      <h2>Items Purchased</h2>
      <CardColumns>
        {products.map(product => <ProductCard key={product.product_id} product={product} />)}
      </CardColumns>
    </Layout>
  );
};

export default OrderDetails;
