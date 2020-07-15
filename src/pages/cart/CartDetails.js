import React from 'react';
import fetch from 'isomorphic-unfetch';
import {
  Tab, Row, Col, Nav
} from 'react-bootstrap';
import config from '../../config';
import Layout from '../../components/Layout';
import ProductsSummaryTab from '../../components/cart/ProductsSummaryTab';
import ShippingBillingTab from '../../components/cart/ShippingBillingTab';
import ReviewTab from '../../components/cart/ReviewTab';
import authenticationService from '../../services/authenticationService';

class Cart extends React.Component {
  // Query API Gateway for products
  static async getInitialProps(context) {
    const { username } = context.query;
    const res = await fetch(`${config.API_GATEWAY_ENDPOINT}/cart/${username}`);

    const { firstName, lastName } = authenticationService.getCurrentUser();

    return {
      username,
      firstName,
      lastName,
      products: await res.json() // TODO make sure 200
    };
  }

  // Define initial state
  constructor(props) {
    super(props);

    this.tabKeys = ['product-summary', 'shipping-billing', 'review'];

    const defaultAddress = authenticationService.getCurrentUser().address;
    const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

    this.state = {
      activeTab: this.tabKeys[0],
      shippingAddress: deepCopy(defaultAddress),
      billingAddress: deepCopy(defaultAddress),
      numItems: this.calculateNumItems(this.props.products)
    };
  }

  // Render
  render() {
    const activeTabIndex = this.tabKeys.indexOf(this.state.activeTab);

    return (
      <Layout>
        <h1>
          {this.props.firstName}
          's Cart
        </h1>
        <hr />
        <Tab.Container
          activeKey={this.state.activeTab}
          onSelect={(key) => this.setState({ activeTab: key })}
        >
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey={this.tabKeys[0]}>
                    1. Product Summary
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={this.tabKeys[1]} disabled={!this.state.numItems}>
                    2. Shipping & Billing
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={this.tabKeys[2]} disabled={!(activeTabIndex + 1 >= 2)}>
                    3. Review Order
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>

                <ProductsSummaryTab
                  eventKey={this.tabKeys[0]}
                  products={this.props.products}
                  next={() => this.advanceTab()}
                />

                <ShippingBillingTab
                  eventKey={this.tabKeys[1]}
                  shippingAddress={this.state.shippingAddress}
                  billingAddress={this.state.billingAddress}
                  setShippingAddress={(shippingAddress) => this.setState({ shippingAddress })}
                  setBillingAddress={(billingAddress) => this.setState({ billingAddress })}
                  next={() => this.advanceTab()}
                />

                <ReviewTab
                  eventKey={this.tabKeys[2]}
                  products={this.props.products}
                  shippingAddress={this.state.shippingAddress}
                  billingAddress={this.state.billingAddress}
                  firstName={this.props.firstName}
                  lastName={this.props.lastName}
                  next={() => this.advanceTab()}
                />

              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Layout>
    );
  }

  advanceTab() {
    const activeTabIndex = this.tabKeys.indexOf(this.state.activeTab);
    if (activeTabIndex >= this.tabKeys.length) throw new Error('Invalid tab index');

    if (activeTabIndex === this.tabKeys.length - 1) {
      this.submitOrder();
      return;
    }

    this.setState({
      activeTab: this.tabKeys[activeTabIndex + 1]
    });
  }

  async submitOrder() {
    const requestBody = {
      username: this.props.username,
      billed_to: this.state.billingAddress,
      shipped_to: this.state.shippingAddress,
    };
    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    const url = `${config.API_GATEWAY_ENDPOINT}/orders`;

    const res = await fetch(url, fetchOptions); // TODO error handling
    const orderNumber = (await res.json()).order_number;

    // Router.push(`/orders/${orderNumber}`);
  }

  // TODO move to helper
  calculateNumItems(products) {
    return products.reduce(
      (accumulator, current) => accumulator += parseInt(current.quantity),
      0
    );
  }
}

export default Cart;
