import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route path="/products"><Products /></Route>
    </Switch>
  </Router>
);

export default App;
