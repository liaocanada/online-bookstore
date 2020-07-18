import React from 'react';
import MyPieChart from './components/MyPieChart';
import Layout from '../shared/components/Layout';

const IncomeInsights = props => {
  // eslint-disable-next-line react/destructuring-assignment
  const { incomeByProduct, incomeByMonth } = props.data;

  // TODO do this for all month/year
  const julyData = incomeByMonth.find(element => element.month === 7 && element.year === 2020);
  const formattedJulyData = [
    { title: 'Profits', value: parseFloat(julyData.profit) },
    { title: 'Commission', value: parseFloat(julyData.commission) },
    { title: 'Delivery', value: parseFloat(julyData.delivery_fee) },
    { title: 'Taxes', value: parseFloat(julyData.taxes) },
  ];

  return (
    <Layout>
      <h1>Income by product</h1>
      <MyPieChart data={incomeByProduct} titleKey="name" valueKey="profit" />
      <h1>Income for July 2020</h1>
      <MyPieChart data={formattedJulyData} />
    </Layout>
  );
};

export default IncomeInsights;
