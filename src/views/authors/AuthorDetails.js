import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Layout from '../shared/components/Layout';

const AuthorDetails = props => {
  const { name, picture, summary } = props.data;

  // Render
  return (
    <Layout>
      <h1>{name}&apos;s Books</h1>
      <Image src={picture} rounded />
      <br />
      <h3>Summary</h3>
      <p>{summary}</p>
      <Link href={`/products?q=${name}`}><a><u>Check out their books!</u></a></Link>
    </Layout>
  );
};

export default AuthorDetails;
