import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../redux';

// Pages
import Home from './home/Home';
import ProductsListLoader from './products/ProductsListLoader';
import ProductDetailsLoader from './products/ProductDetailsLoader';
import InsightsHome from './insights/InsightsHome';
import SalesInsightsLoader from './insights/SalesInsightsLoader';
import IncomeInsightsLoader from './insights/IncomeInsightsLoader';
import UserDetailsLoader from './user/UserDetailsLoader';
import CheckoutLoader from './checkout/CheckoutLoader';
import OrderDetailsLoader from './orders/OrderDetailsLoader';
import AuthorDetailsLoader from './authors/AuthorDetailsLoader';
import LoginCallbackHandler from './callback/LoginCallbackHandler';
import LogoutCallbackHandler from './callback/LogoutCallbackHandler';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/products"><ProductsListLoader /></Route>
        <Route exact path="/products/:id"><ProductDetailsLoader /></Route>
        <Route exact path="/insights"><InsightsHome /></Route>
        <Route exact path="/insights/income"><IncomeInsightsLoader /></Route>
        <Route exact path="/insights/sales"><SalesInsightsLoader /></Route>
        <Route exact path="/user/:username"><UserDetailsLoader /></Route>
        <Route exact path="/cart/:username"><CheckoutLoader /></Route>
        <Route exact path="/orders/:orderNumber"><OrderDetailsLoader /></Route>
        <Route exact path="/authors"><h1>to do</h1></Route>
        <Route exact path="/authors/:authorName"><AuthorDetailsLoader /></Route>
        <Route exact path="/loginCallback"><LoginCallbackHandler /></Route>
        <Route exact path="/logoutCallback"><LogoutCallbackHandler /></Route>
      </Switch>
    </Router>
  </Provider>
);

export default App;
