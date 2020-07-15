import React from 'react';
import PieChart from 'react-minimal-pie-chart';
import faker from 'faker';

const mapToTitleValueColor = (array, titleKey, valueKey) => {
  if (!titleKey) titleKey = 'title';
  if (!valueKey) valueKey = 'value';

  return array.map(element => ({
    title: element[titleKey],
    value: parseInt(element[valueKey]),
    color: faker.internet.color()
  }));
};

const MyPieChart = ({ data, titleKey, valueKey }) => (
  <PieChart
    className="pie-chart"
    animate
    animationDuration={500}
    animationEasing="ease-out"
    label
    labelPosition={50}
    labelStyle={{
      fill: '#121212',
      fontFamily: 'sans-serif',
      fontSize: '5px'
    }}
    data={mapToTitleValueColor(data, titleKey, valueKey)}
  />
);

export default MyPieChart;
