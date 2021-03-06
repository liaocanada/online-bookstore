import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Media, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { selectUserData } from '../../../redux/authenticationSlice';
import linkify from '../../shared/helpers/linkify';
import capitalize from '../../shared/helpers/capitalize';
import { editProductInCart } from '../../../api/checkoutApi';
import config from '../../../config';

const reloadPage = (history, location) => {
  // From Zach Taylor https://stackoverflow.com/a/58188231/
  history.push('/about');
  history.replace(location.pathname);
};

const updateQuantity = async (productId, newQuantity, username, setUpdated, history, location) => {
  await editProductInCart(productId, parseInt(newQuantity), username);
  setUpdated(true);
  reloadPage(history, location);
};

const deleteCurrentProduct = async (productId, username, history, location) => {
  await editProductInCart(productId, 0, username);
  reloadPage(history, location);
};

const ProductMedia = props => {
  const { product, editable } = props;

  let { product_id, name, price, authors, genres,
    quantity, images, format } = product;
  price = parseFloat(price);
  quantity = parseInt(quantity);
  authors = linkify(authors, author => `/authors/${author}`);
  genres = linkify(genres, genre => `/products?q=${genre}`);

  const [quantityField, setQuantityField] = useState(quantity);
  const [quantityUpdated, setQuantityUpdated] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const firstImage = images ?
    images.split(', ')[0] :
    config.BOOK_PLACEHOLDER_IMAGE;

  const { username } = useSelector(selectUserData);

  return (
    <Media>
      <img
        width={80}
        height={80}
        className="mr-3"
        src={firstImage}
        alt={`A product called ${name}`}
      />
      <Media.Body>
        <strong className="red float-right">${price.toFixed(2)} ea</strong>
        {editable ? (
          <Link to={`/products/${product_id}`}>
            <h5>{name}</h5>
          </Link>
        ) : (
          <h5>{name}</h5>
        )}

        <Form inline>
          <Form.Label>Quantity:</Form.Label>
          {/* TODO make sure input is a positive integer */}
          <Form.Control
            plaintext={!editable}
            readOnly={!editable}
            value={quantityField}
            onChange={event => setQuantityField(event.target.value)}
            size="sm"
          />

          {editable && (
            quantityUpdated ? (
              <Button variant="success" size="sm" onClick={() => { }}>
                Updated!
              </Button>
            ) : (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => updateQuantity(product_id, quantityField,
                  username, setQuantityUpdated, history, location)}
              >
                Update
              </Button>
            )
          )}
        </Form>

        {!!authors && <>By {authors}<br /></>}
        {!!format && <>{capitalize(format)} format<br /></>}
        {editable && (
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => deleteCurrentProduct(product_id, username, history, location)}
          >
            Delete
          </Button>
        )}
      </Media.Body>
    </Media>
  );
};

export default ProductMedia;
