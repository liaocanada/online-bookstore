import React from 'react';
import { Button, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import AddressForm from './AddressForm';

const ShippingBillingTab = props => {
  const { shippingAddress, setShippingAddress,
    billingAddress, setBillingAddress, eventKey, next } = props;

  return (
    <Tab.Pane eventKey={eventKey}>
      <h4>Shipping Address</h4>
      <AddressForm
        initialAddress={shippingAddress}
        saveAddress={newAddress => setShippingAddress(newAddress)}
      />
      <h4>Billing Address</h4>
      <AddressForm
        initialAddress={billingAddress}
        saveAddress={newAddress => setBillingAddress(newAddress)}
      />

      {/* TODO previous button */}
      <Button variant="success" onClick={() => { }}>
        <FontAwesomeIcon icon={faAngleLeft} /> Prev: Product Summary
      </Button>
      <Button variant="success float-right" onClick={() => next()}>
        Next: Review Order <FontAwesomeIcon icon={faAngleRight} />
      </Button>
    </Tab.Pane>
  );
};

export default ShippingBillingTab;
