import React from 'react';
import ProductsList from './ProductsList';
import { getAllProducts } from '../../api/productsApi';
import Loader from '../shared/components/Loader';
import useQuery from '../shared/helpers/useQuery';

const ProductsListLoader = () => {
  const query = useQuery();
  const search = query.get('q');

  return (
    <Loader
      component={ProductsList}
      action={() => getAllProducts(search)}
      extraProps={{ search }}
      triggers={[search]}
    />
  );
};

export default ProductsListLoader;
