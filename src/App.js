import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/home';
import Layout from "./components/Layout";
import Products from "./pages/products";
import { Jumbotron, Button } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/products"><Products /></Route>
      </Switch>
    </Router>
  );
}

export default App;
