import React from 'react';
import fetch from 'isomorphic-unfetch';
import config from '../shared/config';
import Layout from '../shared/components/Layout';
import ProductCard from '../products/components/ProductCard';

// /orders/[order_number]

class Order extends React.Component {
  // Query API Gateway for products
  static async getInitialProps(context) {
    const { order_number } = context.query;
    const res = await fetch(`${config.API_GATEWAY_ENDPOINT}/orders/${order_number}`);
    return res.json();
  }

  // Define initial state
  constructor(props) {
    super(props);

    // figure out total price using props.product
    let price = 0;
    // eslint-disable-next-line no-return-assign
    props.products.forEach(product => price += parseFloat(product.price));

    this.state = {
      order_number: props.order_number,
      order_info: props.order_info,
      products: props.products,
      price
    };
  }

  // Render
  render() {
    return (
      <Layout>
        <h1>
          Order #
          {this.state.order_number}
        </h1>
        <h4>
          Delivery fee: $
          {parseFloat(this.state.order_info.delivery_fee)}
        </h4>
        <h3>
          Total: $
          {(this.state.price + parseFloat(this.state.order_info.delivery_fee)).toString()}
        </h3>
        <h3>
          Ordered by:
          {this.state.order_info.username}
        </h3>
        <h3>
          Status:
          {this.state.order_info.status}
        </h3>
        <h3>
          Billed to:
          {this.state.order_info.billed_to}
        </h3>
        <h3>
          Shipped to:
          {this.state.order_info.shipped_to}
        </h3>
        <h3>
          Time placed:
          {this.state.order_info.time_placed}
        </h3>
        {this.state.products.map((product, i) => <ProductCard key={i} product={product} />)}
      </Layout>
    );
  }
}

export default Order;