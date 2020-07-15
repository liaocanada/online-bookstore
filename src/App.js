import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// Pages
import Home from './home/Home';
import Products from './products/components';
import Insights from './pages/insights';
import UserDetails from './user/UserDetails';
import CartDetails from './pages/cart/CartDetails';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route path="/products"><Products /></Route>
      <Route path="/insights"><Insights /></Route>
      <Route path="/user/:username"><UserDetails /></Route>
      <Route path="/cart/:username"><CartDetails /></Route>
    </Switch>
  </Router>
);

export default App;
