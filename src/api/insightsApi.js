import fetch from 'isomorphic-unfetch';
import config from '../config';

export const getIncomeInsights = async () => {
  // TODO promise.all for parallel requests
  const byProductRes = await fetch(`${config.API_GATEWAY_ENDPOINT}/insights/income/byProduct`);
  const byMonthRes = await fetch(`${config.API_GATEWAY_ENDPOINT}/insights/income/byMonth`);

  return {
    incomeByProduct: await byProductRes.json(),
    incomeByMonth: await byMonthRes.json(),
  };
};

export const getSalesInsights = async () => {
  // TODO promise.all for parallel requests
  const byProductRes = await fetch(`${config.API_GATEWAY_ENDPOINT}/insights/sales/byProduct`);
  const byBookGenreRes = await fetch(`${config.API_GATEWAY_ENDPOINT}/insights/sales/byBookGenre`);
  const byBookAuthorRes = await fetch(`${config.API_GATEWAY_ENDPOINT}/insights/sales/byBookAuthor`);

  return {
    salesByProduct: await byProductRes.json(),
    salesByBookGenre: await byBookGenreRes.json(),
    salesByBookAuthor: await byBookAuthorRes.json()
  };
};
