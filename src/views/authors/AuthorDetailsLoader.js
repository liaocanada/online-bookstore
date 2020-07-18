import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../shared/components/Loader';
import { getAuthor } from '../../api/authorsApi';
import AuthorDetails from './AuthorDetails';

const AuthorDetailsLoader = () => {
  const { authorName } = useParams();

  return (
    <Loader
      component={AuthorDetails}
      action={() => getAuthor(authorName)}
      selector={res => res.author}
      extraProps={{ authorName }}
    />
  );
};

export default AuthorDetailsLoader;
