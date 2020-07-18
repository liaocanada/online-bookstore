import React from 'react';
import Header from './Header';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

const Layout = ({ children }) => (
  <>
    <Header />

    <div style={layoutStyle}>
      {children}
    </div>
  </>
);

export default Layout;
