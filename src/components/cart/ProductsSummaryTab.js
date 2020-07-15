import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
import ProductMedia from './ProductMedia';

class ProductsSummaryTab extends React.Component {
  // Define initial state
  constructor(props) {
    super(props);

    const subtotal = this.calculatePrice(props.products);
    const taxes = subtotal * config.TAX_RATIO;
    const total = subtotal + taxes;

    this.state = {
      products: props.products,
      subtotal,
      taxes,
      total,
      numItems: this.calculateNumItems(props.products)
    };
  }

  // Render
  render() {
    const { products, subtotal, taxes, total, numItems } = this.state;

    return (
      <Tab.Pane eventKey={this.props.eventKey}>
        {products.map((product, i) => <>
          <ProductMedia key={i} product={product} editable={true} />
          <hr />
        </>
        )}
        <h5 className='float-right'>CAD ${subtotal.toFixed(2)}</h5>
        <h5>Subtotal ({numItems} items)</h5>

        <h5 className='float-right'>CAD ${taxes.toFixed(2)}</h5>
        <h5>Taxes</h5>

        <hr />
        <h5 className='red float-right'>CAD ${total.toFixed(2)}</h5>
        <h5>Total (excl. shipping)</h5>

        {/* To take up space for the right-floating button */}
        <Button className='hidden'></Button>
        {numItems ?
          <Button variant='success float-right' onClick={() => this.props.next()}>
            Next: Shipping & Billing <FontAwesomeIcon icon={faAngleRight} />
          </Button>
          :
          <Link to='/products'>
            <Button variant='outline-primary float-right'>
              Browse Items
						</Button>
          </Link>
        }
      </Tab.Pane>
    );
  }

  calculatePrice(products) {
    return products
      .map(product => (parseFloat(product.price) * parseInt(product.quantity) || 0))
      .reduce(
        (accumulator, current) => accumulator += current,
        0
      );
  }

  calculateNumItems(products) {
    return products.reduce(
      (accumulator, current) => accumulator += parseInt(current.quantity),
      0
    );
  }
}

export default ProductsSummaryTab;
