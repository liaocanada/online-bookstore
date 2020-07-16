import React from 'react';
import Header from './Header';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

const Layout = props => (
  <>
    <Header />

    <div style={layoutStyle}>
      {props.children}
    </div>
  </>
);

export default Layout;
