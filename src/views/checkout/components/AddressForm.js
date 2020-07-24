import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Col } from 'react-bootstrap';

const handleSave = (formFields, setFormSaved, setFormError, saveAddress) => {
  if (formFields.some(fieldValue => fieldValue === '')) {
    setFormError('Fields cannot be empty!');
  } else if (formFields.some(fieldValue => fieldValue.includes(','))) {
    setFormError('Fields cannot contain commas!');
  } else {
    const newAddress = formFields.join(', ');
    saveAddress(newAddress);
    setFormSaved(true);
  }

  setTimeout(() => this.setState({ saved: false, error: '' }), 1500);
};

const AddressForm = props => {
  const { initialAddress, saveAddress } = props;
  const initialAddressArray = initialAddress.split(', ');

  const [addressField, setAddressField] = useState(initialAddressArray[0] || '');
  const [cityField, setCityField] = useState(initialAddressArray[1] || '');
  const [provinceField, setProvinceField] = useState(initialAddressArray[2] || '');
  const [countryField, setCountryField] = useState(initialAddressArray[3] || '');
  const [formSaved, setFormSaved] = useState(false);
  const [formError, setFormError] = useState('');

  const formFields = [addressField, cityField, provinceField, countryField];

  return (
    <Form className="address-form">
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={addressField}
            onChange={event => setAddressField(event.target.value)}
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>City</Form.Label>
          <Form.Control
            value={cityField}
            onChange={event => setCityField(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Province</Form.Label>
          <Form.Control
            value={provinceField}
            onChange={event => setProvinceField(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Country</Form.Label>
          <Form.Control
            value={countryField}
            onChange={event => setCountryField(event.target.value)}
            required
          />
        </Form.Group>
      </Form.Row>
      {/* eslint-disable-next-line no-nested-ternary */}
      {formSaved ? (
        <Button variant="primary" onClick={() => { }}>
          Saved!
        </Button>
      ) : (
        formError ? (
          <Button variant="warning" onClick={() => { }}>
            {formError}
          </Button>
        ) : (
          <Button variant="outline-primary" onClick={() => handleSave(formFields, setFormSaved, setFormError, saveAddress)}>
            Save
          </Button>
        )
      )}
    </Form>
  );
};

AddressForm.propTypes = {
  initialAddress: PropTypes.string,
  saveAddress: PropTypes.func.isRequired
};

AddressForm.defaultProps = {
  initialAddress: ''
};

export default AddressForm;
