import React from 'react';
import Loader from '../shared/components/Loader';
import { getSalesInsights } from '../../api/insightsApi';
import SalesInsights from './SalesInsights';

const SalesInsightsLoader = () => (
  <Loader
    component={SalesInsights}
    action={getSalesInsights}
  />
);

export default SalesInsightsLoader;
