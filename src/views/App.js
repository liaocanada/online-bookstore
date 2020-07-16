import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// Pages
import Home from './home/Home';
import ProductsListLoader from './products/ProductsListLoader';
import ProductDetailsLoader from './products/ProductDetailsLoader';
import InsightsHome from './insights/InsightsHome';
import UserDetails from './user/UserDetails';
import Checkout from './checkout/Checkout';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route exact path="/products"><ProductsListLoader /></Route>
      <Route exact path="/products/:id"><ProductDetailsLoader /></Route>
      <Route exact path="/insights"><InsightsHome /></Route>
      <Route exact path="/user/:username"><UserDetails /></Route>
      <Route exact path="/cart/:username"><Checkout /></Route>
    </Switch>
  </Router>
);

export default App;
