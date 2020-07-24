import React from 'react';
import { Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectUserData } from '../shared/redux/authorization';
import Layout from '../shared/components/Layout';
import Order from '../orders/components/OrderCard';

const UserDetails = props => {
  const { username: targetUsername, data } = props;
  const { user, orders } = data;

  const { username: currentUsername } = useSelector(selectUserData);
  if (targetUsername !== currentUsername) {
    // TODO redirect to currentUsername
    // TODO handle this logic server-side
    console.log('Should redirect to', currentUsername);
  }

  return (
    <Layout>
      <Image id="profile-picture" src={user.picture} rounded />
      {user.first_name ?
        <h1>Hello, {user.first_name}</h1> :
        <h1>Hello, {user.username}</h1>
      }
      <h4>Full name: {`${user.first_name} ${user.last_name}`}</h4>
      <h4>Username: {user.username}</h4>  {/* user.username === targetUsername */}
      <h4>Email: {user.email}</h4>
      <h4>Address: {user.address}</h4>
      <h4>Time last logged in: {user.time_last_login}</h4>

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
