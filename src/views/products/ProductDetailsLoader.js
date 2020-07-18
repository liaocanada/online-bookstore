import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import { getProductById } from '../../api/productsApi';
import Loader from '../shared/components/Loader';

const ProductDetailsLoader = () => {
  const { id } = useParams();

  return (
    <Loader
      component={ProductDetails}
      action={() => getProductById(id)}
      selector={res => res.product}
      propsKey="product"
    />
  );
};

export default ProductDetailsLoader;
