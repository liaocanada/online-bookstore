import React from 'react';
import Header from "./Header";

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'

};

const Layout = props => (
  <>
    <head>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin="anonymous"
      />
    </head>
    <Header />
    <div style={layoutStyle}>
      {props.children}
    </div>
  </>
);

export default Layout;