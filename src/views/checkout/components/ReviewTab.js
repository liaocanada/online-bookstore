import React from 'react';
import { Button, Tab, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import ProductMedia from './ProductMedia';
import config from '../../../config';

class ReviewTab extends React.Component {
  // Define initial state
  constructor(props) {
    super(props);

    const subtotal = this.calculatePrice(props.products);
    const taxes = subtotal * config.TAX_RATIO;
    const total = subtotal + taxes;

    this.state = {
      products: props.products,
      subtotal,
      taxes,
      total,
      numItems: this.calculateNumItems(props.products)
    };
  }

  // Render
  render() {
    const { products, subtotal, taxes, total, numItems } = this.state;

    return (
      <Tab.Pane eventKey={this.props.eventKey}>
        <h2>Products</h2>
        {products.map((product, i) => <>
          <ProductMedia key={i} product={product} editable={false} />
          <hr />
        </>
        )}
        <h5 className="float-right">CAD ${subtotal.toFixed(2)}</h5>
        <h5>Subtotal ({numItems} items)</h5>

        <h5 className="float-right">CAD ${taxes.toFixed(2)}</h5>
        <h5>Taxes</h5>

        <hr />
        <h5 className="red float-right">CAD ${total.toFixed(2)}</h5>
        <h5>Total (excl. shipping)</h5>

        <h2>Shipping</h2>
        <Form.Group as={Row}>
          <Form.Label column sm="2">Address</Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={this.props.shippingAddress} />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">Estimated shipping time</Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue="3 to 5 business days" />
          </Col>
        </Form.Group>

        <h2>Billing</h2>
        <Form.Group as={Row}>
          <Form.Label column sm="2">Name</Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={this.props.firstName + " " + this.props.lastName} />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">Address</Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={this.props.billingAddress} />
          </Col>
        </Form.Group>

        {/* TODO previous button */}
        <Button variant="success" onClick={() => { }}>
          <FontAwesomeIcon icon={faAngleLeft} /> Prev: Shipping & Billing
                </Button>

        <Button variant="success float-right" onClick={() => this.props.next()}>
          Place Order <FontAwesomeIcon icon={faAngleDoubleRight} />
        </Button>

      </Tab.Pane>
    );
  }

  calculatePrice(products) {
    return products
      .map(product => (parseFloat(product.price) * parseInt(product.quantity) || 0))
      .reduce(
        (accumulator, current) => accumulator += current,
        0
      );
  }

  calculateNumItems(products) {
    return products.reduce(
      (accumulator, current) => accumulator += parseInt(current.quantity),
      0
    );
  }
}

export default ReviewTab;
