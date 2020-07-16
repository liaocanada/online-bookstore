import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import { getProductById } from '../../api/productsApi';

const ProductDetailsLoader = () => {
  const { id } = useParams();
  console.log('id received', id);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProductById(id).then(res => {
      console.log(res);
      setData(res.product);
      setLoading(false);
    }).catch(err => {
      setError(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error: {error.toString()}</h1>;
  return <ProductDetails product={data} />;
};

export default ProductDetailsLoader;
