import React from 'react';
import ProductsList from './ProductsList';
import { getAllProducts } from '../../api/productsApi';
import Loader from '../shared/components/Loader';

const ProductsListLoader = () => (
  <Loader
    component={ProductsList}
    action={() => getAllProducts()}
  />
);

export default ProductsListLoader;
