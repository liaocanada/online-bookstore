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
import UserDetailsLoader from './user/UserDetailsLoader';
import CheckoutLoader from './checkout/CheckoutLoader';
import OrderDetailsLoader from './orders/OrderDetailsLoader';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route exact path="/products"><ProductsListLoader /></Route>
      <Route exact path="/products/:id"><ProductDetailsLoader /></Route>
      <Route exact path="/insights"><InsightsHome /></Route>
      <Route exact path="/user/:username"><UserDetailsLoader /></Route>
      <Route exact path="/cart/:username"><CheckoutLoader /></Route>
      <Route exact path="/orders/:orderNumber"><OrderDetailsLoader /></Route>
    </Switch>
  </Router>
);

export default App;
