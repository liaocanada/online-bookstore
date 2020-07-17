import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import calculateMetadata from '../../shared/helpers/calculateProductsMetadata';
import ProductMedia from './ProductMedia';

const ProductsSummaryTab = props => {
  const {
    products: initialProducts,  // A list of products in cart to display a summary of
    next,      // A callback for when user is done looking at the current tab
    eventKey,  // A unique key for this tab, used for uniquely identifying the tabs
               //     when rendering the parent component
  } = props;

  const [products, setProducts] = useState(initialProducts);
  const [productsMetadata, setProductsMetadata] = useState(calculateMetadata(products));
  const { subtotal, taxes, total, numItems } = productsMetadata;

  return (
    <Tab.Pane eventKey={eventKey}>
      {products.map(product => (
        <>
          <ProductMedia key={product.product_id} product={product} editable />
          <hr />
        </>
      ))}
      <h5 className="float-right">CAD ${subtotal.toFixed(2)}</h5>
      <h5>Subtotal ({numItems} items)</h5>

      <h5 className="float-right">CAD ${taxes.toFixed(2)}</h5>
      <h5>Taxes</h5>

      <hr />
      <h5 className="red float-right">CAD ${total.toFixed(2)}</h5>
      <h5>Total (excl. shipping)</h5>

      {/* To take up space for the right-floating button */}
      <Button className="hidden" />
      {numItems ? (
        <Button variant="success float-right" onClick={() => next()}>
          Next: Shipping & Billing <FontAwesomeIcon icon={faAngleRight} />
        </Button>
      ) : (
        <Link to="/products">
          <Button variant="outline-primary float-right">
            Browse Items
          </Button>
        </Link>
      )}
    </Tab.Pane>
  );
};

export default ProductsSummaryTab;
