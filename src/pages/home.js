import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';
import Layout from '../components/Layout';

const Home = () => (
  <Layout>
    <Jumbotron>
      <h1>Welcome</h1>
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
