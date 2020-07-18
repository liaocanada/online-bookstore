import React from 'react';
import { Image } from 'react-bootstrap';
import Layout from '../shared/components/Layout';
import Order from '../orders/components/OrderCard';

const UserDetails = props => {
  const { username, data } = props;
  const { user, orders } = data;

  return (
    <Layout>
      <Image id="profile-picture" src={user.picture} rounded />
      <h1>Hello, {username}</h1>
      <h3>Real name: {`${user.first_name} ${user.last_name}`}</h3>
      <h3>Email:{user.email}</h3>
      <h3>Address:{user.address}</h3>
      <h3>Time last logged in:{user.time_last_login}</h3>

      {orders.map(({ order_number, status, time_placed }) => (
        <Order
          key={order_number}
          order_number={order_number}
          status={status}
          time_placed={time_placed}
        />
      ))}
    </Layout>
  );
};

export default UserDetails;
