import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Jumbotron, Button, Alert } from 'react-bootstrap';
import Layout from '../shared/components/Layout';
import { selectIsLoggedIn, selectUserData } from '../../redux/authenticationSlice';
import useQuery from '../shared/helpers/useQuery';

const LOGIN_SUCCESS_QUERY_VALUE = 'loginSuccess';
const LOGIN_FAIL_QUERY_VALUE = 'loginFailed';

const Home = () => {
  const query = useQuery();
  const messageToDisplay = query.get('message');
  const [isMessageShowing, setIsMessageShowing] = useState(true);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userData = useSelector(selectUserData);

  return (
    <Layout>
      {isMessageShowing && isLoggedIn && messageToDisplay === LOGIN_SUCCESS_QUERY_VALUE && (
        <Alert variant="success" onClose={() => setIsMessageShowing(false)} dismissible>
          <Alert.Heading>Logged In Successfully</Alert.Heading>
          <p>You have successfully logged in.</p>
        </Alert>
      )}
      {isMessageShowing && !isLoggedIn && messageToDisplay === LOGIN_FAIL_QUERY_VALUE && (
        <Alert variant="danger" onClose={() => setIsMessageShowing(false)} dismissible>
          <Alert.Heading>Log In Unsuccessful</Alert.Heading>
          <p>You were not logged in. Please try again or contact the site owner.</p>
        </Alert>
      )}

      <Jumbotron>
        {isLoggedIn && userData.firstName ?
          <h1>Welcome, {userData.firstName}</h1> :
          <h1>Welcome</h1>
        }
        <p>Welcome to the BookStore. Get started by browsing through the collection.</p>
        <p>
          <Link to="/products">
            <Button variant="primary">See all products</Button>
          </Link>
        </p>
      </Jumbotron>
    </Layout>
  )
};

export default Home;
