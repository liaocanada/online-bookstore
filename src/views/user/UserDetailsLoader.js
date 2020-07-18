import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../shared/components/Loader';
import { getUser } from '../../api/usersApi';
import UserDetails from './UserDetails';

const UserDetailsLoader = () => {
  const { username } = useParams();

  return (
    <Loader
      component={UserDetails}
      action={() => getUser(username)}
      extraProps={{ username }}
    />
  );
};

export default UserDetailsLoader;
