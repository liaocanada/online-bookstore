import React from 'react';
import { Link } from 'react-router-dom';
import { Media, Button, Form } from 'react-bootstrap';

import linkify from '../../shared/helpers/linkify';
import capitalize from '../../shared/helpers/capitalize';
import { getCurrentUser } from '../../shared/api/authenticationApi';
import config from '../../shared/config';

class Product extends React.Component {
  // Process props
  static async getInitialProps(context) {
    const { username } = context.query;
    const res = await fetch(`${config.API_GATEWAY_ENDPOINT}/cart/${username}`);
    return {
      username,
      products: await res.json()  // TODO make sure 200
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      newQuantity: parseInt(this.props.product.quantity),
      updated: false
    };
  }

  render() {
    let { product_id, name, price, description, isbn, authors, genres,
      quantity, images, format } = this.props.product;

    price = parseFloat(price);
    quantity = parseInt(quantity);
    authors = linkify(authors, author => '/authors/' + author);
    genres = linkify(genres, genre => '/products?q=' + genre);

    const firstImage = images ?
      images.split(', ')[0] :
      config.BOOK_PLACEHOLDER_IMAGE;

    const editable = this.props.editable;

    return (
      <Media>
        <img
          width={80}
          height={80}
          className='mr-3'
          src={firstImage}
        />
        <Media.Body>
          <strong className='red float-right'>${price.toFixed(2)} ea</strong>
          {editable ?
            <Link to={'/products/' + product_id}>
              <a><h5>{name}</h5></a>
            </Link>
            :
            <h5>{name}</h5>
          }

          <Form inline>
            <Form.Label>Quantity:</Form.Label>
            {/* TODO make sure input is a positive integer */}
            <Form.Control
              plaintext={!editable}
              readOnly={!editable}
              value={this.state.newQuantity}
              onChange={event => this.setState({ newQuantity: event.target.value })}
              size='sm'
            />

            {editable && (
              this.state.updated ?
                <Button variant='success' size='sm' onClick={() => { }}>
                  Updated!
							</Button>
                :
                <Button variant='outline-primary' size='sm' onClick={() => this.updateQuantity()}>
                  Update
							</Button>
            )}
          </Form>

          {!!authors && <>By {authors}<br /></>}
          {!!format && <>{capitalize(format)} format<br /></>}
          {editable && <a href='#' onClick={() => this.delete()}>Delete</a>}
        </Media.Body>
      </Media>
    );
  }

  async updateQuantity() {
    const requestBody = {
      quantity: this.state.newQuantity
    };
    const fetchOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    const username = getCurrentUser().username;
    const productId = this.props.product.product_id;
    const url = `${config.API_GATEWAY_ENDPOINT}/cart/${username}/${productId}`;

    const res = await fetch(url, fetchOptions);

    this.setState({ updated: true });
    // Router.reload();  TODO
  }

  async delete() {
    const requestBody = {
      quantity: 0
    };
    const fetchOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    const username = getCurrentUser().username;
    const productId = this.props.product.product_id;
    const url = config.API_GATEWAY_ENDPOINT + '/cart/' + username + '/' + productId;

    const res = await fetch(url, fetchOptions);

    // Router.reload();  TODO
  }
}

export default Product;
