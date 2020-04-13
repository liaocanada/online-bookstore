import config from "../../config/config";
import Layout from '../../components/Layout';
import Router from 'next/router';
import { Button, Image, Carousel, Row, Col, Badge } from 'react-bootstrap';
import React from 'react';
import linkify from '../../helpers/linkify';

class Product extends React.Component {

	static async getInitialProps(context) {
		const id = context.query.id;
		const res = await fetch(config.API_GATEWAY_ENDPOINT + "/products/" + id);

		return {
			product: await res.json()
		};
	};

	render() {
		let { product_id, name, price, description, isbn, authors, genres, 
			quantity, images, series, stock, format } = this.props.product;

		price = parseFloat(price);
		quantity = parseInt(quantity);
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
						Back
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

						<h3>Details</h3>
						{series && <p>Series: {series}</p>}
						{genres && genres !== "None" && <p>Genre(s): {genres}</p>}
						{isbn && <p>ISBN: {isbn}</p>}
						{<p>Bookstore product ID: {product_id}</p>}
					</Col>
				</Row>
			</Layout>
		);
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