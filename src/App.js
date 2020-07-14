import React from 'react';
import Layout from './components/Layout';
import { Jumbotron, Button } from "react-bootstrap";

function App() {
  return (
    <Layout>
        <Jumbotron>
            <h1>Welcome</h1>
            <p>Welcome to the BookStore. Get started by browsing through the collection.</p>
            <p>
                <Button variant="primary">See all products</Button>
            </p>
        </Jumbotron>
    </Layout>
  );
}

export default App;
