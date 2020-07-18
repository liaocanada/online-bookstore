import React from 'react';
import { Button, Form, Col } from 'react-bootstrap';

class AddressForm extends React.Component {
  // Define initial state
  constructor(props) {
    super(props);

    const initialAddress = props.initialAddress;
    const initialAddressArray = initialAddress.split(', ');

    this.state = {
      addressField: initialAddressArray[0] || '',
      cityField: initialAddressArray[1] || '',
      provinceField: initialAddressArray[2] || '',
      countryField: initialAddressArray[3] || '',
      saved: false,
      error: '',
    };
  }

  render() {
    return (
      <Form className="address-form">
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={this.state.addressField}
              onChange={event => this.setState({ addressField: event.target.value })}
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>City</Form.Label>
            <Form.Control
              value={this.state.cityField}
              onChange={event => this.setState({ cityField: event.target.value })}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Province</Form.Label>
            <Form.Control
              value={this.state.provinceField}
              onChange={event => this.setState({ provinceField: event.target.value })}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={this.state.countryField}
              onChange={event => this.setState({ countryField: event.target.value })}
              required
            />
          </Form.Group>
        </Form.Row>
        {
          this.state.saved ?
            <Button variant="primary" onClick={() => { }}>
              Saved!
                    </Button>
            :
            this.state.error ?
              <Button variant="warning" onClick={() => { }}>
                {this.state.error}
              </Button>
              :
              <Button variant="outline-primary" onClick={() => this.handleSave()}>
                Save
              </Button>
        }
      </Form>
    );
  }

  handleSave() {
    const { addressField, cityField, provinceField, countryField } = this.state;
    const fieldsArray = [addressField, cityField, provinceField, countryField];

    if (fieldsArray.some(fieldValue => fieldValue === '')) {
      this.setState({ error: 'Fields cannot be empty!' });
    }
    else if (fieldsArray.some(fieldValue => fieldValue.includes(','))) {
      this.setState({ error: 'Fields cannot contain commas!' });
    }
    else {
      const newAddress = fieldsArray.join(', ');
      this.props.saveAddress(newAddress);
      this.setState({ saved: true });
    }

    setTimeout(() => this.setState({ saved: false, error: '' }), 1500);
  }
}

export default AddressForm;
