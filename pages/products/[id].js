import config from "../../config/config";
import Layout from '../../components/Layout';
import MyToast from "../../components/MyToast";
import Router from 'next/router';
import { Button, Image, Carousel, Row, Col, Badge } from 'react-bootstrap';
import React from 'react';
import linkify from '../../helpers/linkify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faCartPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import fetch from 'isomorphic-unfetch';
import authenticationService from "../../services/authenticationService";

class Product extends React.Component {

	static async getInitialProps(context) {
		const id = context.query.id;
		const res = await fetch(config.API_GATEWAY_ENDPOINT + "/products/" + id);

		return {
			product: await res.json()
		};
	};

	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			purchased: false
		};
	}

	render() {
		let { product_id, name, price, description, isbn, authors, genres,
			quantity, images, series, stock, format, pages } = this.props.product;

		price = parseFloat(price);
		quantity = parseInt(quantity);
		pages = parseInt(pages);
		authors = linkify(authors, author => "/authors/" + author);
		genres = linkify(genres, genre => "/products?q=" + genre);
		images = images ? images.split(", ") : [];

		const stockBadge = this.getStockBadge(stock);
			
		return (
			<Layout>
				<Row>
					<Button id="back-button"
						variant="outline-secondary"
						size="sm"
						onClick={() => Router.back()}>
						<FontAwesomeIcon icon={faAngleLeft} /> Back
					</Button>
				</Row>

				<Row>
					<Col md={4}>
						<Carousel>
							{images.map((image, i) =>
								<Carousel.Item key={i}>
									<Image
										className="d-block w-100"
										src={image}
										rounded
									/>
								</Carousel.Item>
							)}
						</Carousel>
					</Col>

					<Col md={8}>
						<h1>{name} {stockBadge}</h1>
						{authors && <p>By {authors}</p>}
						<strong className="red">CDN ${price.toFixed(2)}</strong>
						<p>{description}</p>
						<p>{format && this.capitalize(format) + " format"}</p>

						{
							this.state.purchased ?
								<Button variant="success">
									Added! <FontAwesomeIcon icon={faCheck} />
								</Button>
								:
								<Button variant="outline-primary" onClick={() => this.addToCart()}>
									Add to Cart <FontAwesomeIcon icon={faAngleRight} />
								</Button>
						}

						<div className="subsection">
							<h3>Details</h3>
							{series && <p>Series: {series}</p>}
							{genres && genres != "None" && <p>Genre(s): {genres}</p>}
							{!!pages && <p>{pages} pages</p>}
							{isbn && <p>ISBN: {isbn}</p>}
							{<p>Bookstore product ID: {product_id}</p>}
						</div>
					</Col>
				</Row>

				{
					this.state.messages.map(message =>
						<MyToast
							headerIcon={message.icon}
							title={message.title}
							contents={message.contents}
						/>
					)
				}
			</Layout>
		);
	}

	async addToCart() {
		const requestBody = {
			product_id: this.props.product.product_id,
			quantity: 1,
		};
		const fetchOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(requestBody),
		};
		const username = authenticationService.getCurrentUser().username;
		const url = config.API_GATEWAY_ENDPOINT + "/cart/" + username;

		const res = await fetch(url, fetchOptions);

		const messages = this.state.messages;
		messages.push({
			icon: <FontAwesomeIcon icon={faCartPlus} />,
			title: "Product added successfully!",
			contents: `Your item ${this.props.product.name} has been successfully added to your cart.`
		});
		this.setState({ messages, purchased: true });
	}

	getStockBadge(stock) {
		if (stock <= 0)
			return <Badge variant="danger" pill>Out of stock</Badge>
		if (stock <= 250)
			return <Badge variant="warning" pill>Only {stock} remaining!</Badge>

		return <Badge variant="success" pill>In stock ({stock})</Badge>
	}

	capitalize(str) {
		if (!str) return "";
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}

export default Product;