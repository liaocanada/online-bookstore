import React from 'react';
import MyPieChart from './components/MyPieChart';
import Layout from '../shared/components/Layout';
import config from '../../config';

class Sales extends React.Component {
  static async getInitialProps(context) {
    // TODO promise.all
    const byProductRes = await fetch(`${config.API_GATEWAY_ENDPOINT}/insights/sales/byProduct`);
    const byBookGenreRes = await fetch(`${config.API_GATEWAY_ENDPOINT}/insights/sales/byBookGenre`);
    const byBookAuthorRes = await fetch(`${config.API_GATEWAY_ENDPOINT}/insights/sales/byBookAuthor`);

    return {
      salesByProduct: await byProductRes.json(),
      salesByBookGenre: await byBookGenreRes.json(),
      salesByBookAuthor: await byBookAuthorRes.json()
    };
  }

  render() {
    const { salesByProduct, salesByBookGenre, salesByBookAuthor } = this.props;

    return (
      <Layout>
        <h1>Sales by product</h1>
        <MyPieChart data={salesByProduct} titleKey="name" valueKey="sales" />
        <h1>Sales by genre (books)</h1>
        <MyPieChart data={salesByBookGenre} titleKey="genre" valueKey="sales" />
        <h1>Sales by author (books)</h1>
        <MyPieChart data={salesByBookAuthor} titleKey="author_name" valueKey="sales" />
      </Layout>
    );
  }
}

export default Sales;
