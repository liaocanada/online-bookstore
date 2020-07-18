import React from 'react';
import { CardColumns } from 'react-bootstrap';
import Layout from '../shared/components/Layout';
import ProductCard from './components/ProductCard';

const ProductsList = props => {
  // eslint-disable-next-line react/destructuring-assignment
  const { products, search } = props.data;

  return (
    <Layout>
      {search ?
        <h1>Results for {search}</h1> :
        <h1>Products</h1>}

      <CardColumns>
        {products.map(product => <ProductCard product={product} key={product.product_id} />)}
      </CardColumns>

      {products.length === 0 ?
        <p>No results found.</p> :
        <></>}
    </Layout>
  );
};

export default ProductsList;
