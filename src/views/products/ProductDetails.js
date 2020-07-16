import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Image, Carousel, Row, Col, Badge
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft, faAngleRight, faCartPlus, faCheck
} from '@fortawesome/free-solid-svg-icons';
import fetch from 'isomorphic-unfetch';
import linkify from '../shared/helpers/linkify';
import MyToast from '../shared/components/MyToast';
import Layout from '../shared/components/Layout';
import config from '../../config';
import { getCurrentUser } from '../../api/authenticationApi';
import capitalize from '../shared/helpers/capitalize';

// /products/[id]

const addToCart = async (productId, productName, addMessage, setPurchasedTrue) => {  // TODO move to api
  const requestBody = {
    product_id: productId,
    quantity: 1,
  };
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };
  const { username } = getCurrentUser();
  const url = `${config.API_GATEWAY_ENDPOINT}/cart/${username}`;

  await fetch(url, fetchOptions);

  addMessage({
    icon: <FontAwesomeIcon icon={faCartPlus} />,
    title: 'Product added successfully!',
    contents: `Your item ${productName} has been successfully added to your cart.`
  });

  setPurchasedTrue();
};

const getStockBadge = stock => {
  if (stock <= 0) return <Badge variant="danger" pill>Out of stock</Badge>;
  if (stock <= 250) {
    return (
      <Badge variant="warning" pill>
        Only
        {stock}
        {' '}
        remaining!
      </Badge>
    );
  }

  return (
    <Badge variant="success" pill>
      In stock (
      {stock}
      )
    </Badge>
  );
};

const ProductDetails = props => {
  let {
    product_id, name, price, description, isbn, authors, genres,
    quantity, images, series, stock, format, pages
  } = props.product;

  price = parseFloat(price);
  quantity = parseInt(quantity);
  pages = parseInt(pages);
  authors = linkify(authors, author => `/authors/${author}`);
  genres = linkify(genres, genre => `/products?q=${genre}`);
  images = images ? images.split(', ') : [];

  const [messages, setMessages] = useState([]);
  const addMessage = message => setMessages(messages.concat([message]));  // Concat returns new array
  const [purchased, setPurchased] = useState(false);
  const setPurchasedTrue = () => setPurchased(true);

  const history = useHistory();

  const stockBadge = getStockBadge(stock);

  return (
    <Layout>
      <Row>
        <Button
          id="back-button"
          variant="outline-secondary"
          size="sm"
          onClick={() => history.goBack()}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
          {' '}Back
        </Button>
      </Row>

      <Row>
        <Col md={4}>
          <Carousel>
            {images.map((image, i) => (
              <Carousel.Item key={i}>
                <Image
                  className="d-block w-100"
                  src={image}
                  rounded
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>

        <Col md={8}>
          <h1>
            {name}{' '}{stockBadge}
          </h1>
          {authors && (
            <p>
              By
              {authors}
            </p>
          )}
          <strong className="red">
            CDN ${price.toFixed(2)}
          </strong>
          <p>{description}</p>
          <p>{format && `${capitalize(format)} format`}</p>

          {
            purchased ?
              (
                <Button variant="success">
                  Added!
                  {' '}
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
              )
              : (
                <Button variant="outline-primary" onClick={() => addToCart(product_id, name, addMessage, setPurchasedTrue)}>
                  Add to Cart <FontAwesomeIcon icon={faAngleRight} />
                </Button>
              )
          }

          <div className="subsection">
            <h3>Details</h3>
            {series && <p>Series: {series}</p>}
            {genres && genres !== 'None' && <p>Genre(s): {genres}</p>}
            {!!pages && <p>{pages} pages</p>}
            {isbn && <p>ISBN: {isbn}</p>}
            <p>Bookstore product ID: {product_id}</p>
          </div>
        </Col>
      </Row>

      {
        messages.map(message => (
          <MyToast
            headerIcon={message.icon}
            title={message.title}
            contents={message.contents}
          />
        ))
      }
    </Layout>
  );
};

export default ProductDetails;
