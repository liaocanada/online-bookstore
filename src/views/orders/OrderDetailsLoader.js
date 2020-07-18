import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../shared/components/Loader';
import { getOrder } from '../../api/ordersApi';
import OrderDetails from './OrderDetails';

const OrderDetailsLoader = () => {
  const { orderNumber } = useParams();

  return (
    <Loader
      component={OrderDetails}
      action={() => getOrder(orderNumber)}
      extraProps={{ orderNumber }}
    />
  );
};

export default OrderDetailsLoader;
