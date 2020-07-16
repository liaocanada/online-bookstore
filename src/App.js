import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// Pages
import Home from './home/Home';
import ProductsList from './products/ProductsList';
import InsightsHome from './insights/InsightsHome';
import UserDetails from './user/UserDetails';
import Checkout from './checkout/Checkout';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route path="/products"><ProductsList /></Route>
      <Route path="/insights"><InsightsHome /></Route>
      <Route path="/user/:username"><UserDetails /></Route>
      <Route path="/cart/:username"><Checkout /></Route>
    </Switch>
  </Router>
);

export default App;
