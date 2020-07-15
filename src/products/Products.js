import React from 'react';
import fetch from 'isomorphic-unfetch';
import { CardColumns } from 'react-bootstrap';
import config from '../shared/config';
import Layout from '../shared/Layout';
import ProductCard from './products/ProductCard';

const Products = () => {
  // Query API Gateway for products
  // static async getInitialProps(context) {
  //  const q = context.query.q;
  //  const query = q ?
  //    `?name=${q}&genre=${q}&isbn=${q}&author_name=${q}&series=${q}&format=${q}&tag=${q}` :
  //    "";

  //  const res = await fetch(config.API_GATEWAY_ENDPOINT + "/products" + query);
  //  return {
  //     search: q,
  //     products: await res.json()
  //  };
  // }

  // const { search, products } = this.props;
  const products = []; // TODO call API
  const search = '';

  return (
    <Layout>
      {search
        ? (
          <h1>
            Results for
            {search}
          </h1>
        )
        : <h1>Products</h1>}

      <CardColumns>
        {products.map((product, i) => <ProductCard product={product} key={i} />)}
      </CardColumns>

      {products.length === 0
        ? <p>No results found.</p>
        : <></>}
    </Layout>
  );
};

export default Products;
