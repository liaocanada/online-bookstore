import React from 'react';
import MyPieChart from './components/MyPieChart';
import Layout from '../shared/components/Layout';

const SalesInsights = props => {
  // eslint-disable-next-line react/destructuring-assignment
  const { salesByProduct, salesByBookGenre, salesByBookAuthor } = props.data;

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
};

export default SalesInsights;
