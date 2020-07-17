import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Loading from './Loading';

// Component which contains logic to call an API/other function
//     while displaying Loading/Error/Success component
const Loader = props => {
  const {
    action,     // A function to call which returns a Promise, such as a data fetching function.
                //     This component will render loading while the promise is not resolved.
    component,  // The component to render when loading is completed successfully.
    selector,   // A function that formats the data returned by the action function.
                //     The result of this function will be passed to the child component
                //     through a "data" prop.
    propsKey,   // The key of the prop to pass into the component. By default this is "data"
    extraProps, // Extra props to pass into the component, represented as an object.
  } = props;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    action().then(res => {
      setData(selector ? selector(res) : res);
      setLoading(false);
    }).catch(err => {
      setError(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <Layout><Loading /></Layout>;
  if (error) return <h1>Error: {error.toString()}</h1>;

  // If loaded and error-free, return component and pass data through props
  const propsKey2 = propsKey || 'data';  // TODO use proptypes to specify default
  const componentProps = { [propsKey2]: data };
  return React.createElement(component, { ...componentProps, ...extraProps });
};

export default Loader;
