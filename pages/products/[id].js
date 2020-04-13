import config from "../../config/config";
import Layout from '../../components/Layout';
import Router from 'next/router';
import { Button, Image, Carousel } from 'react-bootstrap';
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
		let { product_id, name, price, description, isbn, authors, genres, quantity, images, series } = this.props.product;

		price = parseFloat(price);
		quantity = parseInt(quantity);
		authors = linkify(authors, author => "/authors/" + author);
		genres = linkify(genres, genre => "/products?q=" + genre);
		images = images ? images.split(", ") : [];

		return (
			<Layout>
				<Button variant="light" size="sm" onClick={() => Router.back()}>Back</Button>

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

				<h1>{name}</h1>
				<p>{description}</p>
				<p><i>${price.toFixed(2)}</i></p>
				{isbn && <p>ISBN: {isbn}</p>}
				{authors && <p>Author(s): {authors}</p>}
				{genres && <p>Genre(s): {genres}</p>}
				{series && <p>Series: {series}</p>}
			</Layout>
		);
	}
}

export default Product;