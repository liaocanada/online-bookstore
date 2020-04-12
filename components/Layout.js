import Header from "./Header";
import Head from "next/head";

const layoutStyle = {
  margin: 20,
  padding: 20,
  font: 'Roboto',
  border: '1px solid #DDD'
  
};

const Layout = props => (
  <>
  <Head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  </Head>
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
  </>
);

export default Layout;