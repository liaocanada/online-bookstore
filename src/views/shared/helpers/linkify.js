import React from 'react';
import { Link } from 'react-router-dom';

const linkify = (csv, mapToUrl) => {
  if (!csv) return 'None';

  const links = csv.split(', ').map((element, i) => <Link to={mapToUrl(element)} key={i}>{element}</Link>);

  // joinArray([1, 2, 3], 0) ---> [1, 0, 2, 0, 3]
  const joinArray = (array, value) => (
    array.reduce((accumulator, element, index) => {
      accumulator.push(element);
      if (index < array.length - 1) accumulator.push(value);
      return accumulator;
    }, [])
  );

  const separator = <>, </>;  // JSX element
  return joinArray(links, separator);
};

export default linkify;
