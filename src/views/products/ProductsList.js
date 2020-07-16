import React, { useState, useEffect } from 'react';
import { CardColumns } from 'react-bootstrap';
import Layout from '../shared/components/Layout';
import ProductCard from './components/ProductCard';
import { getAllProducts } from '../../api/productsApi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    getAllProducts().then(res => {
      setProducts(res.products);
      setSearch(res.search);
    });
  }, []);

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
