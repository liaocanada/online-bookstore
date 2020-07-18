import React from 'react';
import Layout from '../shared/components/Layout';
import ProductCard from '../products/components/ProductCard';
import { calculatePrice } from '../shared/helpers/calculateProductsMetadata';

const OrderDetails = props => {
  // eslint-disable-next-line react/destructuring-assignment
  const { order_number, order_info, products } = props.data;
  const price = calculatePrice(products);

  return (
    <Layout>
      <h1>Order #{order_number}</h1>
      <h4>Delivery fee: ${parseFloat(order_info.delivery_fee)}</h4>
      <h4>Total: ${(price + parseFloat(order_info.delivery_fee)).toString()}</h4>
      <h4>Ordered by: {order_info.username}</h4>
      <h4>Status: {order_info.status}</h4>
      <h4>Billed to: {order_info.billed_to}</h4>
      <h4>Shipped to: {order_info.shipped_to}</h4>
      <h4>Time placed:{order_info.time_placed}</h4>

      {/* TODO fix image loading, might have to make extra api requests */}
      {products.map(product => <ProductCard key={product.product_id} product={product} />)}
    </Layout>
  );
};

export default OrderDetails;
