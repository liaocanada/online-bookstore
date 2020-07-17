import React, { useState } from 'react';
import {
  Tab, Row, Col, Nav
} from 'react-bootstrap';
import Layout from '../shared/components/Layout';
import ProductsSummaryTab from './components/ProductsSummaryTab';
import ShippingBillingTab from './components/ShippingBillingTab';
import ReviewTab from './components/ReviewTab';
import { getCurrentUser } from '../../api/authenticationApi';
import { calculateNumItems } from '../shared/helpers/calculateProductsMetadata';

// static async getInitialProps(context) {
//   const { username } = context.query;
//   const res = await fetch(`${config.API_GATEWAY_ENDPOINT}/cart/${username}`);

//   const { firstName, lastName } = getCurrentUser();

//   return {
//     username,
//     firstName,
//     lastName,
//     products: await res.json() // TODO make sure 200
//   };
// }
const tabKeys = ['product-summary', 'shipping-billing', 'review'];

const Cart = props => {
  const { products, username: urlUsername } = props.data;

  const initialAddress = getCurrentUser().address;
  const { firstName, lastName, username: currentUsername } = getCurrentUser();

  // State
  const [activeTab, setActiveTab] = useState(tabKeys[0]);
  const [shippingAddress, setShippingAddress] = useState(initialAddress);
  const [billingAddress, setBillingAddress] = useState(initialAddress);
  const [numItems, setNumItems] = useState(calculateNumItems(products));

  const getActiveTabIndex = () => tabKeys.indexOf(activeTab);

  if (urlUsername !== currentUsername) {
    // TODO redirect to currentUsername
  }

  return (
    <Layout>
      <h1>
        {firstName}&apos;s Cart
      </h1>
      <hr />
      <Tab.Container
        activeKey={activeTab}
        onSelect={key => setActiveTab(key)}
      >
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey={tabKeys[0]}>
                  1. Product Summary
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={tabKeys[1]} disabled={!numItems}>
                  2. Shipping & Billing
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={tabKeys[2]} disabled={!(getActiveTabIndex() + 1 >= 2)}>
                  3. Review Order
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>

              <ProductsSummaryTab
                eventKey={tabKeys[0]}
                products={products}
                next={() => advanceTab(0, setActiveTab)}
              />

              <ShippingBillingTab
                eventKey={tabKeys[1]}
                shippingAddress={shippingAddress}
                billingAddress={billingAddress}
                setShippingAddress={setShippingAddress}
                setBillingAddress={setBillingAddress}
                next={() => advanceTab(1, setActiveTab)}
              />

              <ReviewTab
                eventKey={tabKeys[2]}
                products={products}
                shippingAddress={shippingAddress}
                billingAddress={billingAddress}
                firstName={firstName}
                lastName={lastName}
                next={() => advanceTab(2)}
              />
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Layout>
  );
};

// const isTabEnabled = tabKey => {
//   if (tabKey === 0) {
//     return true;
//   } else if (tabKey === 1) {
//     return
//   } else if (tabKey === 2) {

//   } else throw new Error('Invalid tab key.');
// };

const advanceTab = (activeTabIndex, setActiveTab) => {
  if (activeTabIndex >= tabKeys.length) throw new Error('Invalid tab index');

  if (activeTabIndex === tabKeys.length - 1) {
    submitOrder();
    return;
  }

  setActiveTab(tabKeys[activeTabIndex + 1]);
};

const submitOrder = async () => {
  alert('submit order');
  // const requestBody = {
  //   username: this.props.username,
  //   billed_to: this.state.billingAddress,
  //   shipped_to: this.state.shippingAddress,
  // };
  // const fetchOptions = {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(requestBody),
  // };
  // const url = `${config.API_GATEWAY_ENDPOINT}/orders`;

  // const res = await fetch(url, fetchOptions); // TODO error handling
  // const orderNumber = (await res.json()).order_number;

  // Router.push(`/orders/${orderNumber}`);
};

export default Cart;
