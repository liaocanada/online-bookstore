import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Layout from '../shared/components/Layout';

const Home = () => (
  <Layout>
    <Jumbotron>
      <h1>{console.log(Cookies.get('cognito')) || 'Welcome'}</h1>
      <p>Welcome to the BookStore. Get started by browsing through the collection.</p>
      <p>
        <Link to="/products">
          <Button variant="primary">See all products</Button>
        </Link>
      </p>
    </Jumbotron>
  </Layout>
);

export default Home;
