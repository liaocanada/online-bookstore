import React from 'react';
import Loader from '../shared/components/Loader';
import { getIncomeInsights } from '../../api/insightsApi';
import IncomeInsights from './IncomeInsights';

const IncomeInsightsLoader = () => (
  <Loader
    component={IncomeInsights}
    action={getIncomeInsights}
  />
);

export default IncomeInsightsLoader;
