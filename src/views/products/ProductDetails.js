import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Image, Carousel, Row, Col, Badge
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft, faAngleRight, faCartPlus, faCheck, faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { selectUserData } from '../../redux/authenticationSlice';
import linkify from '../shared/helpers/linkify';
import capitalize from '../shared/helpers/capitalize';
import MyToast from '../shared/components/MyToast';
import Layout from '../shared/components/Layout';
import { addProductToCart as addToCartApi } from '../../api/checkoutApi';
import { selectIsLoggedIn } from '../../redux/authenticationSlice';
import config from '../../config';

const addToCart = async (username, productId) => {
  const res = await addToCartApi(username, productId);
  return res.status;
};

const getStockBadge = stock => {
  if (stock <= 0) return <Badge variant="danger" pill>Out of stock</Badge>;
  if (stock <= 250) {
    return (
      <Badge variant="warning" pill>
        Only {stock} remaining!
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

const respondToCartStatus = (status, productName, addMessage, setPurchasedTrue) => {
  if (status === 200 || status === 201) {
    setPurchasedTrue();

    addMessage({
      icon: <FontAwesomeIcon icon={faCartPlus} />,
      title: 'Product added successfully!',
      contents: `Your item ${productName} has been successfully added to your cart.`
    });
  } else {
    addMessage({
        icon: <FontAwesomeIcon icon={faExclamationTriangle} />,
        title: 'Uh oh!',
        contents: 'Something went wrong. Please try again later.'
    });
  }
}

const redirectToLogin = (addMessage) => {
  addMessage({
    icon: <FontAwesomeIcon icon={faExclamationTriangle} />,
    title: 'Uh oh!',
    contents: <><div className="mb-2">Please login to purchase items</div><Button href={config.LOGIN_URL} variant="secondary" size="sm">Login</Button></>
  });
}

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
  const addMessage = message => setMessages(messages.concat([message]));
  const [purchased, setPurchased] = useState(false);
  const setPurchasedTrue = () => setPurchased(true);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const history = useHistory();

  const stockBadge = getStockBadge(stock);

  const { username } = useSelector(selectUserData);

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
          {' ' /* TODO use padding */}Back
        </Button>
      </Row>

      <Row>
        <Col md={4}>
          <Carousel>
            {images.map(image => (
              <Carousel.Item key={image}>
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
          <h1>{name}{' '}{stockBadge}</h1>
          {authors && <p>By {authors}</p>}
          <strong className="red">CDN ${price.toFixed(2)}</strong>
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
              ) : (
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    if (isLoggedIn) {
                      const cart_res_status = addToCart(username, product_id);
                      respondToCartStatus(cart_res_status, name, addMessage, setPurchasedTrue);
                    } else {
                      redirectToLogin(addMessage);
                    }
                  }}
                >
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
