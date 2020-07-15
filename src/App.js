import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import Insights from './pages/insights';
import UserDetails from './pages/user/UserDetails';
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
